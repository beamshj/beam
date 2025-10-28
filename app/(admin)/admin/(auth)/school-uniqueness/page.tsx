"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import AdminItemContainer from '@/app/components/Common/AdminItemContainer';

interface SchoolUniquenessFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const SchoolUniquenessPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<SchoolUniquenessFormProps>();


    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });


    const handleAddSchoolUniqueness = async (data: SchoolUniquenessFormProps) => {
        try {
            const response = await fetch(`/api/admin/school-uniqueness`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding school uniqueness", error);
        }
    }

    const fetchSchoolUniquenessData = async () => {
        try {
            const response = await fetch(`/api/admin/school-uniqueness`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching school uniqueness data", error);
        }
    }



    useEffect(() => {
        fetchSchoolUniquenessData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddSchoolUniqueness)}>


                    <AdminItemContainer>
                        <Label className="" main>Banner</Label>
                        <div className='p-5 rounded-md grid grid-cols-2 gap-5'>
                    <div>
                        <Controller
                            name="banner"
                            control={control}
                            rules={{ required: "Banner is required" }}
                            render={({ field }) => (
                                <ImageUploader
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.banner && (
                            <p className="text-red-500">{errors.banner.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <Label className='font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className='font-bold'>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                    </div>
                    </div>
                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>First Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                        </div>
                        
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="secondSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {firstSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`firstSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.firstSection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.firstSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.firstSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>

                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>}
                                </div>
                            </div>
                            </div>

                        </div>
                    ))}


                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => firstSectionAppend({ title: "", image: "", imageAlt: "" })}>Add Item</Button>
                    </div>
                </div>

                    </div>

                </div>
                </AdminItemContainer>



                <AdminItemContainer>
                <Label main>Second Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Description</Label>
                        <Controller name="secondSection.description" control={control} render={({ field }) => {
                            return <Textarea value={field.value} onChange={field.onChange} />
                        }} />
                    </div>
                        <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {secondSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`secondSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.secondSection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>

                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                </div>
                            </div>

                            <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name={`secondSection.items.${index}.description`} control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                        
                            </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
                    </div>
                </div>

                    </div>

                </div>
                </AdminItemContainer>


                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription")} />
                </div>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default SchoolUniquenessPage