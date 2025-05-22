"use client"
import { useState } from 'react';
import axios from 'axios';
import { BookData } from '@/types/type';
import { Input } from './input';
import { Button } from './button';



export const AddBookForm = () => {
  const [bookData, setBookData] = useState<BookData>({
    _id:"",
    title: '',
    author: '',
    isbn: '',
    publishedYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res=await axios.post('http://localhost:3001/api/v1/books', bookData);

      
      setBookData({
        _id:'',
        title: '',
        author: '',
        isbn: '',
        publishedYear: "",
      });
      console.log(res.data);

      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert(axios.isAxiosError(error) 
        ? error.response?.data?.message || error.message 
        : 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setBookData({
      _id:"",
      title: '',
      author: '',
      isbn: '',
      publishedYear: '',
    });
  };

  return (
    <div className="w-xl mx-auto p-6 bg-gray-200 mt-30 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h1>
      
      <form onSubmit={handleSubmit}>
       
        <Input
          name="title"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          label="Title"
          required
        />

        <Input
          name="author"
          value={bookData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          label="Author"
          required
        />

        <Input
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN number"
          label="ISBN"
          required
        />

        <Input
          name="publishedYear"
          value={bookData.publishedYear}
          onChange={handleChange}
          placeholder="E.g., 2023"
          label="Published Year"
          required
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={resetForm}
            variant="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          
          >
            {isSubmitting ? 'Adding...' : 'Add Book'}
          </Button>
        </div>
      </form>
    </div>
  );
};