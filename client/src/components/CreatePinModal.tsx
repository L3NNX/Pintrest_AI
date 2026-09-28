import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, Loader2, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import type { Post } from '../types';

interface CreatePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPinCreated: (newPin: Post) => void;
}

export const CreatePinModal: React.FC<CreatePinModalProps> = ({ isOpen, onClose, onPinCreated }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        setError('Please select an image file (PNG, JPG, WebP)');
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      if (!selected.type.startsWith('image/')) {
        setError('Please drop an image file (PNG, JPG, WebP)');
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image to upload');
      return;
    }
    if (!caption.trim()) {
      setError('Please add a title or caption for your pin');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Step 1: Request Cloudflare R2 Presigned Upload URL
      setUploadStatus('Generating direct-to-R2 upload link...');
      const { uploadUrl, publicUrl } = await api.getPresignedUrl(file.name, file.type);

      // Step 2: Directly upload binary to Cloudflare R2 bucket
      setUploadStatus('Streaming image directly to Cloudflare R2...');
      await api.uploadBinaryToR2(uploadUrl, file);

      // Step 3: Save post metadata to MongoDB
      setUploadStatus('Saving pin details...');
      const post = await api.createPost(publicUrl, caption);

      onPinCreated(post);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to upload pin');
    } finally {
      setUploading(false);
      setUploadStatus('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={uploading ? undefined : onClose} />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#e60023]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Create Pin</h2>
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            className="p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
              preview
                ? 'border-zinc-200 bg-zinc-50'
                : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {preview ? (
              <div className="relative group max-h-72 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-72 rounded-2xl object-contain shadow-md"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white font-semibold text-sm">
                  Click to replace image
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-zinc-400 mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="font-semibold text-zinc-800 text-sm">
                  Drag and drop an image or click to browse
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Uploads directly to Cloudflare R2 (PNG, JPG, WebP up to 10MB)
                </p>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Title or Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell everyone what your Pin is about..."
              className="w-full border border-zinc-200 focus:border-zinc-900 rounded-2xl p-4 text-sm focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Upload Status Banner */}
          {uploading && (
            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-600">
              <Loader2 className="w-4 h-4 animate-spin text-[#e60023]" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-5 py-2.5 rounded-full font-semibold text-sm text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 bg-[#e60023] hover:bg-[#b8001c] disabled:bg-zinc-300 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-all"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <span>Publish Pin</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
