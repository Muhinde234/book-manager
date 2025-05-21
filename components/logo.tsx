import { Book} from "lucide-react"
import Link from "next/link"


const Logo = () => {
  return (
    <div>
        <Link href="/" className=" flex gap-4 p-4">
         <Book className="inline   bg-white p-1 text-green-600 rounded-sm"/>
        
        <h1 className="font-bold">Book manager</h1>
        </Link>
    </div>
  )
}

export default Logo