import type { Post, User, PresignedResponse } from '../types';

export const api = {
  // Check login status
  async getAuthStatus(): Promise<{ isAuthenticated: boolean; username?: string }> {
    const res = await fetch('/api/auth/status', { credentials: 'include' });
    if (!res.ok) return { isAuthenticated: false };
    return res.json();
  },

  // Fetch current user details
  async getMe(): Promise<{ user: User }> {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  // Fetch feed pins
  async getFeed(): Promise<Post[]> {
    const res = await fetch('/api/feed');
    if (!res.ok) throw new Error('Failed to load feed');
    const data = await res.json();
    return data.posts || [];
  },

  // Get Cloudflare R2 presigned upload URL
  async getPresignedUrl(filename: string, fileType: string): Promise<PresignedResponse> {
    const res = await fetch('/api/upload/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ filename, fileType }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload presign failed' }));
      throw new Error(err.error || 'Failed to get upload URL');
    }
    return res.json();
  },

  // Direct binary upload to Cloudflare R2
  async uploadBinaryToR2(uploadUrl: string, file: File): Promise<void> {
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
    if (!res.ok) {
      throw new Error('Direct upload to Cloudflare R2 failed');
    }
  },

  // Create post record after upload
  async createPost(image: string, imageText: string): Promise<Post> {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ image, imageText }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Post creation failed' }));
      throw new Error(err.error || 'Failed to create post');
    }
    const data = await res.json();
    return data.post;
  },

  // Toggle like
  async toggleLike(postId: string): Promise<{ likesCount: number; isLiked: boolean }> {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to toggle like');
    return res.json();
  },
};
