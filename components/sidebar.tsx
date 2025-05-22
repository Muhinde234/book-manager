import { ClipboardPlus, Library } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";

const Sidebar = () => {

    
  return (
    <div className="w-64 min-h-screen bg-green-700 text-white  flex flex-col fixed">
      <div>
        <Logo />
      </div>
      <hr className="text-white mt-3" />
      <div className="mt-3 p-3">
      <Link
        href="/"
        className=" flex gap-4 p-4  hover:bg-gray-300 hover:rounded-lg"
      >
        <Library className="  text-green-500 " />

        <h1 className="">All Books</h1>
      </Link>

      <Link
        href="book"
        className=" flex gap-4 p-4 hover:bg-gray-300 hover:rounded-lg "
      >
        <ClipboardPlus className="  text-green-500 " />

        <h1 className="">Add new book</h1>
      </Link>
      </div>
     
    
      <div className="mt-auto mb-4 p-4">
        <p>&copy; <span id="year"></span> Dositha . All rights reserved.</p>

      </div>
    </div>
  );
};

export default Sidebar;
