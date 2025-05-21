'use client';

import { Button } from "@/components/button";
import axios from "axios";
import { Loader, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface BookData {

  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
}

export default function Home() {
  const [books, setBooks] = useState<BookData[] | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/books');

      setBooks(response.data);
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      {books === null ? (
        <div className="flex flex-col  justify-center items-center h-50 ">
           <Loader  size={30} className="animate-spin text-green-600"/>
        </div>
      
      ) : books.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center h-50 ">
          <h1 className="text-2xl mt-20">
            Welcome to
            <span className="text-green-600 font-bold ml-3">Book Manager</span>
          </h1>
          <h1 className="font-bold text-red-600 text-xl">Ooops no book found!</h1>
          <p className="text-gray-400">
            Get started by adding your first book to the collection
          </p>
          <Button className="flex gap-3">
            <Plus />
            Add Book
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-[900px] ml-72 mt-30 border border-gray-300">
            <thead className="bg-green-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Published Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.isbn} className="border-t border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.publishedDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
