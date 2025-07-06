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
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg bg-secondary/50">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        maxLength={100}
        required
      />
      <textarea
        placeholder="Write your blog post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded min-h-[100px]"
        maxLength={2000}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" className="max-h-40 mt-2 rounded" />}
      <button type="submit" className="button button-hover-effect">Post Blog</button>
    </form>
  );
};

export default BlogForm;
