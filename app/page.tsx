'use client';
import { Button } from "@/components/button";
import axios from "axios";
import { Loader, Plus, Trash2, Pencil, X, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { BookData } from "@/types/type";
import Link from "next/link";



export default function Home() {
  const [books, setBooks] = useState<BookData[] | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookData | null>(null);
  const [editFormData, setEditFormData] = useState<BookData>({
    _id: '',
    title: '',
    author: '',
    publishedYear: '',
    isbn: ''
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  };

  const fetchBookDetails = async (_id: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/books/${_id}`);
      setCurrentBook(response.data);
      setIsViewing(true);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      setIsDeleting(_id);
      await axios.delete(`http://localhost:3001/api/v1/books/${_id}`);
      await fetchBooks(); 
    } catch (error) {
      console.error('Failed to delete book:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditClick = (book: BookData) => {
    setCurrentBook(book);
    setEditFormData(book);
    setIsEditing(true);
  };

  const handleViewClick = (book: BookData) => {
    fetchBookDetails(book._id);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/api/v1/books/${currentBook?._id}`, editFormData);
      await fetchBooks(); 
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="relative">
      {books === null ? (
        <div className="flex flex-col justify-center items-center h-50">
          <Loader size={30} className="animate-spin text-green-600"/>
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center h-50">
          <h1 className="text-2xl mt-20">
            Welcome to
            <span className="text-green-600 font-bold ml-3">Book Manager</span>
          </h1>
          <h1 className="font-bold text-red-600 text-xl">Ooops no book found!</h1>
          <p className="text-gray-400">
            Get started by adding your first book to the collection
          </p>
          <Link href="add-book">
           <Button className="flex gap-3">
            <Plus />
            Add Book
          </Button>
          </Link>
          
         
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-[900px] ml-72 mt-30 border border-gray-300">
            <thead className="bg-green-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Published Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{book._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.publishedYear}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      <button 
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        onClick={() => handleViewClick(book)}
                        aria-label="View book"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                        onClick={() => handleEditClick(book)}
                        aria-label="Edit book"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        onClick={() => handleDelete(book._id)}
                        disabled={isDeleting === book._id}
                        aria-label="Delete book"
                      >
                        {isDeleting === book._id ? (
                          <Loader size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-opacity-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Book</h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                  ID
                </label>
                <input
                  type="text"
                  id="_id"
                  name="id"
                  value={editFormData._id}
                  required
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishedDate">
                  Published Date
                </label>
                <input
                  type="date"
                  id="publishedYear"
                  name="publishedYear"
                  value={editFormData.publishedYear}
                  onChange={handleEditFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={editFormData.isbn}
                  onChange={handleEditFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewing && currentBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-opacity-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book Details</h2>
              <button 
                onClick={() => setIsViewing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID</h3>
                <p className="text-lg">{currentBook._id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="text-lg">{currentBook.title}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Author</h3>
                <p className="text-lg">{currentBook.author}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Published Date</h3>
                <p className="text-lg">{currentBook.publishedYear}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                <p className="text-lg">{currentBook.isbn}</p>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setIsViewing(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}