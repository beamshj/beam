"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { LuMessageSquareShare } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const EnquiryPage = () => {

    const [enquiryList, setEnquiryList] = useState<{ _id: string, name: string, email: string, phone: string, message:string }[]>([]);

    const handleFetchEnquiry = async () => {
        try {
            const response = await fetch("/api/admin/contact/footer");
            if (response.ok) {
                const data = await response.json();
                setEnquiryList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }

    }


    const handleDeleteEnquiry = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/contact/footer`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchEnquiry();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting enquiry", error);
        }
    }

    useEffect(() => {
        handleFetchEnquiry();
    }, [])


    return (


        <div className="relative overflow-x-auto rounded-2xl">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Message
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {enquiryList.map((enquiry, index) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {enquiry.name}
                                </th>
                                <td className="px-6 py-4">
                                    {enquiry.email}
                                </td>
                                <td className="px-6 py-4">
                                    {enquiry.phone}
                                </td>

                                <td>
                                    <Dialog>
                                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md"><LuMessageSquareShare /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Message</DialogTitle>
                                                <DialogDescription>
                                                    <Textarea value={enquiry.message} readOnly />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                                        </DialogContent>

                                    </Dialog>

                                </td>

                                <td>

                                    <Dialog>
                                        <DialogTrigger className="bg-red-500 text-white px-2 py-1 rounded-md"><MdDelete /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteEnquiry(enquiry._id)}>Yes</DialogClose>
                                            </div>

                                        </DialogContent>

                                    </Dialog>

                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default EnquiryPage