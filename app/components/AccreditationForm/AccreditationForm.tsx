"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import AdminItemContainer from '@/app/components/Common/AdminItemContainer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useParams, useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AccreditationFormProps {
title:string;
category:string;
description:string;
image:string;
imageAlt:string;
}

const AccreditationFormPage = ({editMode}: {editMode?: boolean}) => {

const {id} = useParams();
const router = useRouter();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AccreditationFormProps>();
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);


    const handleAddAccreditation = async (data: AccreditationFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/accreditations?id=${id}` : `/api/admin/accreditations`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push("/admin/accreditations");
            }
        } catch (error) {
            console.log("Error in adding accreditation", error);
        }
    }

    const fetchAccreditationData = async () => {
        try {
            const response = await fetch(`/api/admin/accreditations?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setValue("title", data.data.title);
                setValue("category", data.data.category);
                setValue("description", data.data.description);
                setValue("image", data.data.image);
                setValue("imageAlt", data.data.imageAlt);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching accreditation data", error);
        }
    }



    const handleFetchCategory = async() => {
        try {
            const response = await fetch("/api/admin/accreditations/category");
            if(response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }

    useEffect(() => {
        if (editMode) {
             handleFetchCategory().then(() => fetchAccreditationData());
        } else {
            handleFetchCategory();
        }
    }, []);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAccreditation)}>


                <AdminItemContainer>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("title", {
                                required: "Title is required"
                            })} />
                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        </div>
                        
                    </div>

                    <div className='flex flex-col gap-2'>
                    <Label className=''>Category</Label>
                    <Controller
                        name={`category`}
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                </div>


<div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Image</Label>
                            <Controller
                                name="image"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.image && (
                                <p className="text-red-500">{errors.image.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("imageAlt")} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Descripiton</Label>
                            <Textarea placeholder='Descripiton' {...register("description", {
                                required: "Descripiton is required"
                            })} />
                            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                        </div>

                        </div>

                </div>
                </AdminItemContainer>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default AccreditationFormPage