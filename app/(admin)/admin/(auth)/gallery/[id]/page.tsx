"use client"


import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { MdDelete } from "react-icons/md";



const IndiGallery = () => {
    const { id } = useParams();
    const [category, setCategory] = useState<string>("")
    const [categoryList, setCategoryList] = useState<{_id: string, title: string}[]>([])


    const fetchGalleryData = async () => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setCategoryList(data.data.categories);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching gallery data", error);
        }
    }




        const handleAddCategory = async() => {
            try {
                const response = await fetch(`/api/admin/gallery/inside/category?id=${id}`,{
                    method: "POST",
                    body: JSON.stringify({ name: category }),
                });
                if(response.ok) {
                    const data = await response.json();
                    setCategory("");
                    alert(data.message);
                    fetchGalleryData();
                }else{
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.log("Error adding category", error);
            }
        }


            const handleEditCategory = async(categoryId: string) => {
                try {
                    const response = await fetch(`/api/admin/gallery/inside/category?id=${categoryId}`,{
                        method: "PATCH",
                        body: JSON.stringify({ name: category, galleryId: id }),
                    });
                    if(response.ok) {
                        const data = await response.json();
                        alert(data.message);
                        fetchGalleryData();
                    }else{
                        const data = await response.json();
                        alert(data.message);
                    }
                } catch (error) {
                    console.log("Error editing category", error);
                }
            }
        
            const handleDeleteCategory = async(categoryId: string) => {
                try {
                    const response = await fetch(`/api/admin/gallery/inside/category?id=${categoryId}`,{
                        method: "DELETE",
                        body: JSON.stringify({ galleryId: id }),
                    });
                    if(response.ok) {
                        const data = await response.json();
                        alert(data.message);
                        fetchGalleryData();
                    }else{
                        const data = await response.json();
                        alert(data.message);
                    }
                } catch (error) {
                    console.log("Error deleting category", error);
                }
            }



    useEffect(() => {
        fetchGalleryData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>

            <div className="flex flex-col gap-2 p-5 rounded-md bg-white shadow-md">
                <div className='flex justify-between items-center'>
            <Label className="block text-sm">Categories</Label>
            <Dialog>
                        <DialogTrigger className='bg-primary text-white px-3 py-1 rounded-md font-semibold' onClick={()=>setCategory("")}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <DialogDescription>
                                    <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                    </div>
            <div className='flex flex-col gap-4 py-3'>
                {categoryList?.map((item)=>(
                    <div className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all' key={item._id}>
                    <div>
                        <p>{item.title}</p>
                    </div>
                    <div className='flex gap-8 items-center'>
                        <Dialog>
                            <DialogTrigger onClick={()=>setCategory(item.title)}><FaEdit className='text-lg cursor-pointer' /></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Item</DialogTitle>
                                    <DialogDescription>
                                        <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditCategory(item._id)}>Save</DialogClose>
                            </DialogContent>
    
                        </Dialog>
    
                        <Link href={`/admin/gallery/${id}/${item._id}`}><IoIosImages className='text-lg cursor-pointer' /></Link>
    
                        <Dialog>
                                      <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Are you sure?</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex gap-2">
                                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteCategory(item._id)}>Yes</DialogClose>
                                        </div>
                        
                                      </DialogContent>
                        
                                    </Dialog>
    
    
                        
                    </div>
                </div>
                ))}
                </div>

            </div>

        </div>
    )
}

export default IndiGallery