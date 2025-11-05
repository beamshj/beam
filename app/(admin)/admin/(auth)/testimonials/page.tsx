"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/Common/AdminItemContainer';
import { VideoUploader } from '@/components/ui/video-uploader';
import {toast} from "sonner";

interface TestimonialsFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        items:{
            title:string;
            designation:string;
            description:string;
        }[]
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            video: string;
            poster: string;
        }[];
    };
    thirdSection: {
        title: string;
        items: {
            video: string;
            poster: string;
            name:string;
            designation:string;
        }[];
    };
}

const TestimonialsPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<TestimonialsFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });


    const handleAddTestimonials = async (data: TestimonialsFormProps) => {
        try {
            const response = await fetch(`/api/admin/testimonials`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding testimonials", error);
        }
    }

    const fetchTestimonialsData = async () => {
        try {
            const response = await fetch(`/api/admin/testimonials`);
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
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching testimonials data", error);
        }
    }



    useEffect(() => {
        fetchTestimonialsData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddTestimonials)}>


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
                                <Textarea placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
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
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Designation</Label>
                                                    <Input type='text' placeholder='Designation' {...register(`firstSection.items.${index}.designation`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.firstSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.designation.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Controller name={`firstSection.items.${index}.description`} control={control} render={({ field }) => {
                                                        return <Textarea value={field.value} onChange={field.onChange} />
                                                    }} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => firstSectionAppend({ title: "", designation: "", description: "" })}>Add Item</Button>
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

                            <div className='flex flex-col gap-1'>
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
                                                    <Label className='font-bold'>Video</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.video`}
                                                        control={control}
                                                        rules={{ required: "Video is required" }}
                                                        render={({ field }) => (
                                                            <VideoUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.video && (
                                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.video.message}</p>
                                                    )}
                                                </div>


                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Poster</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.poster`}
                                                        control={control}
                                                        rules={{ required: "Poster is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.poster && (
                                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.poster.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ video: "", poster: "" })}>Add Item</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>


                                    {thirdSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Video</Label>
                                                        <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.video`, {
                                    required: "Video is required"
                                })} />
                                                        {errors.thirdSection?.items?.[index]?.video && (
                                                            <p className="text-red-500">{errors.thirdSection?.items?.[index]?.video.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-1'>
                                                        <Label className='font-bold'>Name</Label>
                                                        <Input type='text' placeholder='Name' {...register(`thirdSection.items.${index}.name`, {
                                                            required: "Name is required"
                                                        })} />
                                                        {errors.thirdSection?.items?.[index]?.name && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.name.message}</p>}
                                                    </div>

                                                </div>




                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Poster</Label>
                                                        <Controller
                                                            name={`thirdSection.items.${index}.poster`}
                                                            control={control}
                                                            rules={{ required: "Poster is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                        {errors.thirdSection?.items?.[index]?.poster && (
                                                            <p className="text-red-500">{errors.thirdSection?.items?.[index]?.poster.message}</p>
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <Label className='font-bold'>Designation</Label>
                                                        <Input type='text' placeholder='Designation' {...register(`thirdSection.items.${index}.designation`, {
                                                            required: "Designation is required"
                                                        })} />
                                                        {errors.thirdSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.designation.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => thirdSectionAppend({ name: "", designation: "", video: "", poster: "" })}>Add Item</Button>
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

export default TestimonialsPage