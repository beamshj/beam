"use client"
import React, { useEffect, useState } from 'react'

const page = () => {

    const [enquiryList, setEnquiryList] = useState<{ _id: string, firstName: string, lastName: string, email: string, phone: string, purpose: string }[]>([]);

        const handleFetchEnquiry = async () => {
        try {
            const response = await fetch("/api/admin/contact/enquiry");
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

        useEffect(() => {
        handleFetchEnquiry();
    }, [])


  return (
    

<div className="relative overflow-x-auto rounded-2xl">
    <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    First Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Purpose
                </th>
            </tr>
        </thead>
        <tbody>
            {enquiryList.map((enquiry)=>{
                return(
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {enquiry.firstName}
                </th>
                <td className="px-6 py-4">
                    {enquiry.lastName}
                </td>
                <td className="px-6 py-4">
                    {enquiry.email}
                </td>
                <td className="px-6 py-4">
                    {enquiry.phone}
                </td>
                <td className="px-6 py-4">
                    {enquiry.purpose}
                </td>
            </tr>
            )
            })}
        </tbody>
    </table>
</div>

  )
}

export default page