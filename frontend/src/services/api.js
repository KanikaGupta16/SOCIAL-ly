const API_BASE = 'http://localhost:8000';

export const api = {
  // Generate new posts
  async generatePosts() {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to generate posts');
    return response.json();
  },

  // Get pending posts queue
  async getQueue() {
    const response = await fetch(`${API_BASE}/queue`);
    if (!response.ok) throw new Error('Failed to fetch queue');
    return response.json();
  },

  // Approve and publish a post
  async approvePost(postId) {
    const response = await fetch(`${API_BASE}/approve/${postId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to approve post');
    return response.json();
  },

  // Get approved posts
  async getApproved() {
    const response = await fetch(`${API_BASE}/approved`);
    if (!response.ok) throw new Error('Failed to fetch approved posts');
    return response.json();
  },

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE}/`);
    return response.json();
  }
};
