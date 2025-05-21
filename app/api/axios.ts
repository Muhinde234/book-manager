import { BookData } from "@/types/type"
import axios from "axios"


export const createBook= async()=>{
    const res= await axios.post("http://localhost:3001/api/books")
    return res.data
}

export const getBooks= async()=>{
    const res= await axios.get("http://localhost:3001/api/books")
    return res.data
}
export const getBookById= async(id:string)=>{
    const res= await axios.get(`http://localhost:3001/api/books/${id}`)
    return res.data
}

export const updateBook= async(id:string,book:BookData)=>{
    const res= await axios.put(`http://localhost:3001/api/books/${id}`,book)
    return res.data 
}
export const deleteBook= async(id:string)=>{
    const res= await axios.delete(`http://localhost:3001/api/books/${id}`)
    return res.data
}