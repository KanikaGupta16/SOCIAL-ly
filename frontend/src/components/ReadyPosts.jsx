import React, { useState, useEffect } from 'react';
import { FileText, Send, Linkedin, RefreshCw, Check, Loader2, Sparkles } from 'lucide-react';
import { api } from '../services/api';

const ReadyPosts = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [approving, setApproving] = useState(null);
  const [error, setError] = useState(null);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getQueue();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate new posts
  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      await api.generatePosts();
      await fetchPosts(); // Refresh the list
    } catch (err) {
      setError('Failed to generate posts');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  // Approve and publish a post
  const handleApprove = async (postId) => {
    try {
      setApproving(postId);
      await api.approvePost(postId);
      await fetchPosts(); // Refresh to remove approved post
    } catch (err) {
      setError('Failed to publish post');
      console.error(err);
    } finally {
      setApproving(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex-1 bg-brand-cream p-8 text-brand-black overflow-y-auto relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-serif-display font-black flex items-center">
            <span className="bg-tag-purple p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mr-4">
              <FileText className="text-black" size={32} />
            </span>
            Ready to Post
          </h2>

          <div className="flex gap-3">
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="bg-white px-4 py-2 rounded-lg font-bold text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Posts
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-gray-400" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-bold text-gray-500 mb-2">No posts in queue</p>
            <p className="text-gray-400 mb-6">Generate new posts to get started</p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-black text-white px-6 py-3 rounded-lg font-bold border-2 border-black hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              <Sparkles size={18} />
              Generate Posts
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#0077B5] text-white p-1.5 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <Linkedin size={16} />
                    </div>
                    <span className="font-bold text-sm bg-gray-100 px-2 py-1 rounded border border-black/10">
                      LinkedIn
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-bold ${
                      post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectPost && onSelectPost(post)}
                      className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-gray-200 transition-all flex items-center"
                    >
                      Preview <Send size={14} className="ml-2" />
                    </button>

                    <button
                      onClick={() => handleApprove(post.id)}
                      disabled={approving === post.id}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-green-600 transition-all flex items-center disabled:opacity-50"
                    >
                      {approving === post.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <Check size={14} className="mr-1" /> Publish
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300 mb-4 font-serif text-base leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {post.content}
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-black/5">
                  <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wide space-x-4">
                    <span>ID: {post.id.slice(0, 8)}...</span>
                    <span>•</span>
                    <span className="text-black bg-tag-green px-2 py-0.5 rounded border border-black">
                      {post.analysis_reference}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadyPosts;
