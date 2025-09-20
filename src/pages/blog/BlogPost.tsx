import React, { useState } from 'react';
import { Blog } from './BlogList';

interface BlogPostProps {
  blog?: Blog; // made optional to avoid SSR crash when Next prerenders without props
  onAddComment?: (blogId: string, text: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog, onAddComment }) => {
  // If no blog provided (e.g., during Next.js automatic prerender of /blog/BlogPost), render a safe fallback.
  if (!blog) {
    return (
      <article className="p-6 border rounded-2xl bg-card/40 text-center" aria-label="Blog post unavailable">
        <h2 className="text-xl font-semibold mb-2">Blog Post Unavailable</h2>
        <p className="text-muted-foreground text-sm">This route is a legacy placeholder. Visit the main blog at <a href="/blog" className="underline text-primary">/blog</a>.</p>
      </article>
    );
  }

  const [comment, setComment] = useState('');

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddComment?.(blog.id, comment);
    setComment('');
  };

  return (
    <article className="bg-card dark:bg-card-dark-bg border border-border/60 rounded-2xl shadow-card p-6 transition-all duration-300 hover:shadow-lg group" tabIndex={0} aria-label={`Blog post: ${blog.title}`}>
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-full max-h-64 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105" />
      )}
      <header className="mb-2 flex flex-col gap-1">
        <h2 className="text-2xl font-display font-bold mb-1">{blog.title}</h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{blog.author || 'Anonymous'}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        </div>
      </header>
      <p className="mb-4 whitespace-pre-line text-base leading-relaxed">{blog.content}</p>
      <form onSubmit={handleComment} className="flex gap-2 mb-2" aria-label="Add comment">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/70"
          maxLength={300}
          aria-label="Comment"
        />
        <button type="submit" className="button button-hover-effect" aria-label="Submit comment">Comment</button>
      </form>
      <div className="space-y-1">
        {blog.comments.map((c) => (
          <div key={c.id} className="text-sm bg-secondary/40 rounded px-2 py-1">
            {c.text}
          </div>
        ))}
      </div>
    </article>
  );
};

export default BlogPost;
