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

interface ScholarshipProgramsFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        image: string;
        imageAlt: string;
        description: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            title: string;
        }[];
    };
    thirdSection: {
        mainTitle: string;
        firstDescription: string;
        subTitle: string;
        secondDescription: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };
    fourthSection: {
        title: string;
        image: string;
        imageAlt: string;
        description: string;
        email: string;
        buttonText: string;
    };
}

const ScholarshipProgramsPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ScholarshipProgramsFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const handleAddScholarshipPrograms = async (data: ScholarshipProgramsFormProps) => {
        try {
            const response = await fetch(`/api/admin/scholarship-programs`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding scholarship programs", error);
        }
    }

    const fetchScholarshipProgramsData = async () => {
        try {
            const response = await fetch(`/api/admin/scholarship-programs`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching scholarship programs data", error);
        }
    }



    useEffect(() => {
        fetchScholarshipProgramsData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddScholarshipPrograms)}>


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
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image</Label>
                                        <Controller
                                            name={`firstSection.image`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.firstSection?.image && (
                                            <p className="text-red-500">{errors.firstSection?.image.message}</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt", {
                                            required: "Alt Tag is required"
                                        })} />
                                        {errors.firstSection?.imageAlt && <p className='text-red-500'>{errors.firstSection?.imageAlt.message}</p>}
                                    </div>

                                </div>

                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register("firstSection.description", {
                                        required: "Description is required"
                                    })} />
                                    {errors.firstSection?.description && <p className='text-red-500'>{errors.firstSection?.description.message}</p>}
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
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("secondSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
                            </div>
                            <div>
                                <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md grid grid-cols-2 gap-5'>


                                    {secondSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
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

                                            </div>

                                        </div>
                                    ))}

                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ title: "" })}>Add Item</Button>
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
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register("thirdSection.mainTitle", {
                                    required: "Main Title is required"
                                })} />
                                {errors.thirdSection?.mainTitle && <p className='text-red-500'>{errors.thirdSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>First Description</Label>
                                <Textarea placeholder='First Description' {...register("thirdSection.firstDescription", {
                                    required: "First Description is required"
                                })} />
                                {errors.thirdSection?.firstDescription && <p className='text-red-500'>{errors.thirdSection?.firstDescription.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("thirdSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Second Description</Label>
                                <Textarea placeholder='Second Description' {...register("thirdSection.secondDescription", {
                                    required: "Second Description is required"
                                })} />
                                {errors.thirdSection?.secondDescription && <p className='text-red-500'>{errors.thirdSection?.secondDescription.message}</p>}
                            </div>
                            <div>
                                <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md grid grid-cols-2 gap-5'>


                                    {thirdSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Description</Label>
                                                        <Textarea placeholder='Description' {...register(`thirdSection.items.${index}.description`, {
                                                            required: "Description is required"
                                                        })} />
                                                        {errors.thirdSection?.items?.[index]?.description && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.description.message}</p>}
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Image</Label>
                                                            <Controller
                                                                name={`thirdSection.items.${index}.image`}
                                                                control={control}
                                                                rules={{ required: "Image is required" }}
                                                                render={({ field }) => (
                                                                    <ImageUploader
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.thirdSection?.items?.[index]?.image && (
                                                                <p className="text-red-500">{errors.thirdSection?.items?.[index]?.image.message}</p>
                                                            )}
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                                                required: "Alt Tag is required"
                                                            })} />
                                                            {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image</Label>
                                        <Controller
                                            name={`fourthSection.image`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.fourthSection?.image && (
                                            <p className="text-red-500">{errors.fourthSection?.image.message}</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register("fourthSection.imageAlt", {
                                            required: "Alt Tag is required"
                                        })} />
                                        {errors.fourthSection?.imageAlt && <p className='text-red-500'>{errors.fourthSection?.imageAlt.message}</p>}
                                    </div>

                                </div>

                                <div>
                                    <div className='flex flex-col gap-1'>
                                        <Label className='font-bold'>Description</Label>
                                        <Textarea placeholder='Description' {...register("fourthSection.description", {
                                            required: "Description is required"
                                        })} />
                                        {errors.fourthSection?.description && <p className='text-red-500'>{errors.fourthSection?.description.message}</p>}
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='font-bold'>Email</Label>
                                        <Input type='text' placeholder='Email' {...register("fourthSection.email", {
                                            required: "Alt Tag is required"
                                        })} />
                                        {errors.fourthSection?.email && <p className='text-red-500'>{errors.fourthSection?.email.message}</p>}
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <Label className='font-bold'>Button Text</Label>
                                        <Input type='text' placeholder='Button Text' {...register("fourthSection.buttonText", {
                                            required: "Alt Tag is required"
                                        })} />
                                        {errors.fourthSection?.buttonText && <p className='text-red-500'>{errors.fourthSection?.buttonText.message}</p>}
                                    </div>

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

export default ScholarshipProgramsPage