import React, { useState } from 'react';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';

export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  comments: { id: string; text: string }[];
  createdAt: string;
}

const initialBlogs: Blog[] = [];

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = (blog: Omit<Blog, 'id' | 'comments' | 'createdAt'> & { image?: string }) => {
    setBlogs([
      {
        ...blog,
        id: Date.now().toString(),
        comments: [],
        createdAt: new Date().toISOString(),
      },
      ...blogs,
    ]);
  };

  const addComment = (blogId: string, text: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === blogId
          ? { ...blog, comments: [...blog.comments, { id: Date.now().toString(), text }] }
          : blog
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>
      <BlogForm onSubmit={addBlog} />
      <div className="space-y-8 mt-8">
        {blogs.map((blog) => (
          <BlogPost key={blog.id} blog={blog} onAddComment={addComment} />
        ))}
        {blogs.length === 0 && <p className="text-center text-muted-foreground">No blogs yet. Start posting!</p>}
      </div>
    </div>
  );
};

export default BlogList;
