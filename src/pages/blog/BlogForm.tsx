import React, { useState, ChangeEvent, FormEvent } from 'react';

interface BlogFormProps {
  onSubmit: (blog: { title: string; content: string; image?: string }) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content, image });
    setTitle('');
    setContent('');
    setImage(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-2xl bg-secondary/50 shadow-card" aria-label="Create blog post">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70"
        maxLength={100}
        required
        aria-label="Blog title"
      />
      <textarea
        placeholder="Write your blog post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/70"
        maxLength={2000}
        required
        aria-label="Blog content"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} aria-label="Upload image" />
      {image && <img src={image} alt="Preview" className="max-h-40 mt-2 rounded-xl shadow-card" />}
      <button type="submit" className="button button-hover-effect w-full" aria-label="Post blog">Post Blog</button>
    </form>
  );
};

export default BlogForm;
