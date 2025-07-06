import React, { useState } from 'react';
import { Blog } from './BlogList';

interface BlogPostProps {
  blog: Blog;
  onAddComment: (blogId: string, text: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddComment(blog.id, comment);
    setComment('');
  };

  return (
    <div className="border rounded-lg p-6 bg-white/80 shadow-sm">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-full max-h-64 object-cover rounded mb-4" />
      )}
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-muted-foreground text-sm mb-2">{new Date(blog.createdAt).toLocaleString()}</p>
      <p className="mb-4 whitespace-pre-line">{blog.content}</p>
      <form onSubmit={handleComment} className="flex gap-2 mb-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded p-2"
          maxLength={300}
        />
        <button type="submit" className="button button-hover-effect">Comment</button>
      </form>
      <div className="space-y-1">
        {blog.comments.map((c) => (
          <div key={c.id} className="text-sm bg-secondary/40 rounded px-2 py-1">
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
