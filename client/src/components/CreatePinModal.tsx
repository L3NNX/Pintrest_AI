import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
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
      setUploadStatus('Acquiring Cloudflare R2 presigned token...');
      const { uploadUrl, publicUrl } = await api.getPresignedUrl(file.name, file.type);

      // Step 2: Directly upload binary to Cloudflare R2 bucket
      setUploadStatus('Streaming file directly to edge storage...');
      await api.uploadBinaryToR2(uploadUrl, file);

      // Step 3: Save post metadata to MongoDB
      setUploadStatus('Registering entry to visual catalogue...');
      const post = await api.createPost(publicUrl, caption);

      onPinCreated(post);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to publish entry');
    } finally {
      setUploading(false);
      setUploadStatus('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflowY: 'auto',
        background: 'rgba(26, 24, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
      className="fade-up"
    >
      <div
        style={{ position: 'fixed', inset: 0 }}
        onClick={uploading ? undefined : onClose}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--surface-card)',
          border: '1px solid var(--rule)',
          borderRadius: 20,
          boxShadow: '0 24px 48px -12px rgba(26, 24, 22, 0.25)',
          maxWidth: 600,
          width: '100%',
          padding: '28px 32px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderBottom: '1px solid var(--rule)',
          }}
        >
          <div>
            <h2
              className="serif"
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Publish Inspiration
            </h2>
            <p style={{ fontSize: 13, color: 'var(--ink-secondary)', margin: '4px 0 0' }}>
              Upload directly to Cloudflare R2 and share with the collection.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            style={{
              padding: 8,
              background: 'none',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--ink-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: '10px 14px',
              background: '#fff5f5',
              border: '1px solid #fed7d7',
              borderRadius: 10,
              color: 'var(--accent)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: preview ? '1px solid var(--rule)' : '2px dashed var(--rule)',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--surface-raised)',
              transition: `border-color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)`,
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {preview ? (
              <div style={{ position: 'relative', maxHeight: 260, display: 'flex', justifyContent: 'center' }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxHeight: 260,
                    borderRadius: 12,
                    objectFit: 'contain',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 12,
                    background: 'rgba(26,24,22,0.4)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                  className="hover:opacity-100"
                >
                  Click to replace photograph
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--rule)',
                    color: 'var(--ink-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <UploadCloud size={22} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
                  Drag & drop an image or click to select
                </p>
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 4, marginBottom: 0 }}>
                  PNG, JPG, WebP up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Caption */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ink-secondary)',
                marginBottom: 8,
              }}
            >
              Title & Context
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What makes this piece interesting?"
              style={{
                width: '100%',
                background: 'var(--surface-card)',
                border: '1px solid var(--rule)',
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 14,
                color: 'var(--ink)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                resize: 'none',
                lineHeight: 1.5,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
            />
          </div>

          {/* Status banner */}
          {uploading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: 'var(--surface-raised)',
                border: '1px solid var(--rule)',
                borderRadius: 10,
                fontSize: 12,
                color: 'var(--ink-secondary)',
              }}
            >
              <Loader2 size={16} className="animate-spin text-red-600" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              paddingTop: 16,
              borderTop: '1px solid var(--rule)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              style={{
                padding: '9px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ink-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '9px 24px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                letterSpacing: '0.01em',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            >
              {uploading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Publishing…</span>
                </>
              ) : (
                <span>Publish to Feed</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
