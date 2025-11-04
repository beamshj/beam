"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SchoolFormProps {
    
title:string;
location:string;
address:string;
category:string;
image:string;
imageAlt:string;
logo:string;
logoAlt:string;
link:string;
specifications:{
    number:string;
    value:string;
}[];
}

const SchoolFormPage = ({editMode}: {editMode?: boolean}) => {

const {id} = useParams();
const router = useRouter();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<SchoolFormProps>();
    const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);

        const { fields: specifications, append: specificationsAppend, remove: specificationsRemove } = useFieldArray({
            control,
            name: "specifications"
        });

    const handleAddSchool = async (data: SchoolFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/beam-schools?id=${id}` : `/api/admin/beam-schools`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push("/admin/beam-schools");
            }
        } catch (error) {
            console.log("Error in adding school", error);
        }
    }

    const fetchSchoolData = async () => {
        try {
            const response = await fetch(`/api/admin/beam-schools?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setValue("title", data.data.title);
                setValue("location", data.data.location._id);
                setValue("address", data.data.address);
                setValue("category", data.data.category._id);
                setValue("image", data.data.image);
                setValue("imageAlt", data.data.imageAlt);
                setValue("logo", data.data.logo);
                setValue("logoAlt", data.data.logoAlt);
                setValue("link", data.data.link);
                setValue("specifications", data.data.specifications);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching school data", error);
        }
    }


        const handleFetchLocation = async() => {
        try {
            const response = await fetch("/api/admin/beam-schools/location");
            if(response.ok) {
                const data = await response.json();
                setLocationList(data.data);
            }
        } catch (error) {
            console.log("Error fetching location", error);
        }
    }

    const handleFetchCategory = async() => {
        try {
            const response = await fetch("/api/admin/beam-schools/category");
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
            handleFetchLocation().then(() => handleFetchCategory()).then(() => fetchSchoolData());
        } else {
            handleFetchLocation().then(() => handleFetchCategory());
        }
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddSchool)}>


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
                        <div className='flex flex-col gap-2'>
                    <Label className=''>Location</Label>
                    <Controller
                        name={`location`}
                        control={control}
                        rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationList.map((item, index) => (
                                        <SelectItem key={index} value={item._id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}

                </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Address</Label>
                            <Input type='text' placeholder='Address' {...register("address", {
                                required: "Address is required"
                            })} />
                            {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
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
                                        <SelectItem key={index} value={item._id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                </div>


<div className="grid grid-cols-2 gap-2">
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
                            <Label className='font-bold'>Logo</Label>
                            <Controller
                                name="logo"
                                control={control}
                                rules={{ required: "Logo is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        isLogo
                                    />
                                )}
                            />
                            {errors.logo && (
                                <p className="text-red-500">{errors.logo.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("logoAlt")} />
                        </div>

                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Link</Label>
                            <Input type='text' placeholder='Link' {...register("link", {
                                required: "Link is required"
                            })} />
                            {errors.link && <p className='text-red-500'>{errors.link.message}</p>}
                        </div>

<div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md gap-5 grid grid-cols-3'>


                                {specifications.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0'>
                                        <div className='absolute top-0 right-2'>
                                            <RiDeleteBinLine onClick={() => specificationsRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>


                                        <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Number</Label>
                                                    <Input type='text' placeholder='Title' {...register(`specifications.${index}.number`, {
                                                        required: "Number is required"
                                                    })} />
                                                    {errors.specifications?.[index]?.number && <p className='text-red-500'>{errors.specifications?.[index]?.number.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Value</Label>
                                                    <Input type='text' placeholder='Value' {...register(`specifications.${index}.value`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.specifications?.[index]?.value && <p className='text-red-500'>{errors.specifications?.[index]?.value.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => specificationsAppend({ number: "", value: "" })}>Add Item</Button>
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

export default SchoolFormPage