'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/books/${id}`);
        setBook(res.data);
        setFormData({
          title: res.data.title,
          author: res.data.author,
          isbn: res.data.isbn,
          publishedYear: String(res.data.publishedYear),
        });
      } catch (err) {
        console.error(err);
        alert('Could not load book.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        publishedYear: Number(formData.publishedYear),
      };
      const res = await axios.put(`http://localhost:3001/api/v1/books/${id}`, payload);
      if (res.status === 200) {
        alert('Book updated successfully!');
        router.back();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during update.');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (!book) return <div className="p-6 text-center text-red-500">Book not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
      <button
        onClick={() => router.back()}
        className="text-green-600 hover:underline mb-6 inline-block font-semibold"
      >
        &larr; Back to Books
      </button>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
        
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400"
          placeholder="Title"
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400"
          placeholder="Author"
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400"
          placeholder="ISBN"
        />
        <input
          name="publishedYear"
          type="number"
          value={formData.publishedYear}
          onChange={handleChange}
          className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400"
          placeholder="Published Year"
        />
        
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Save
          </button>
          <button
            onClick={() => router.back()}
            className="border border-green-500 text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-green-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
