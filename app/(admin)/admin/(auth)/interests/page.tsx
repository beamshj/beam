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

const InterestsPage = () => {

    const [interestList, setInterestList] = useState<{ _id: string, fullName: string, email: string, phone: string, findUs: string, selectSchool: string, selectGrade: string }[]>([]);

    const handleFetchInterest = async () => {
        try {
            const response = await fetch("/api/admin/interest");
            if (response.ok) {
                const data = await response.json();
                setInterestList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching type", error);
        }

    }


    const handleDeleteInterest = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/interest`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchInterest();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in deleting enquiry", error);
        }
    }

    useEffect(() => {
        handleFetchInterest();
    }, [])


    return (


        <div className="relative overflow-x-auto rounded-2xl">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Refer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            School
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Grade
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {interestList.map((interest, index) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {interest.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    {interest.email}
                                </td>
                                <td className="px-6 py-4">
                                    {interest.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {interest.findUs}
                                </td>
                                <td className="px-6 py-4">
                                    {interest.selectSchool}
                                </td>
                                <td className="px-6 py-4">
                                    {interest.selectGrade}
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
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteInterest(interest._id)}>Yes</DialogClose>
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

export default InterestsPage