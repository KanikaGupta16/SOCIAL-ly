import React, { useState } from 'react';
import { Video, Play, MonitorPlay, Copy, Check, ArrowLeft, Linkedin } from 'lucide-react';
import { api } from '../services/api';

const OutputPanel = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handleCopy = () => {
    if (post?.content) {
      navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePublish = async () => {
    if (!post?.id) return;
    try {
      setPublishing(true);
      await api.approvePost(post.id);
      setPublished(true);
    } catch (err) {
      console.error('Failed to publish:', err);
    } finally {
      setPublishing(false);
    }
  };

  if (!post) {
    return (
      <div className="h-full flex flex-col bg-gray-900 text-white p-6 items-center justify-center">
        <MonitorPlay size={64} className="text-gray-600 mb-4" />
        <p className="text-xl text-gray-500">Select a post to preview</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider">Production Studio</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
            published ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {published ? 'Published!' : 'Preview Mode'}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-2xl border-4 border-gray-800 relative overflow-hidden shadow-2xl">
        {/* Post Content */}
        <div className="absolute inset-0 flex flex-col p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#0077B5] p-2 rounded-lg">
              <Linkedin size={24} />
            </div>
            <span className="text-lg font-bold">LinkedIn Post Preview</span>
          </div>

          <div className="flex-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <p className="text-xl leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handleCopy}
          className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-colors font-bold flex items-center gap-2"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>

        {!published && (
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white transition-colors font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {publishing ? (
              <>Publishing...</>
            ) : (
              <>
                <Linkedin size={20} />
                Publish to LinkedIn
              </>
            )}
          </button>
        )}

        {published && (
          <div className="px-8 py-3 rounded-xl bg-green-800 text-green-200 font-bold flex items-center gap-2">
            <Check size={20} />
            Published Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
