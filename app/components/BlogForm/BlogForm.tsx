"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { RiAiGenerateText } from "react-icons/ri";
import TinyEditor from "@/app/components/TinyMce/TinyEditor";
import { toast } from "sonner";

interface BlogFormProps {
    title: string;
    title_ar: string;
    slug: string;
    category?: string;
    category_ar?: string;
    coverImage: string;
    coverImageAlt: string;
    coverImageAlt_ar: string;
    thumbnail: string;
    thumbnailAlt: string;
    thumbnailAlt_ar: string;
    date?: string;
    content: string;
    content_ar: string;
    metaTitle: string;
    metaTitle_ar: string;
    metaDescription: string;
    metaDescription_ar: string;
}

const BlogFormPage = ({ editMode }: { editMode?: boolean }) => {
    const { id } = useParams();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<BlogFormProps>();
    const watchedDate = watch("date");

    const [categoryList, setCategoryList] = useState<{ _id: string; name: string; name_ar: string }[]>([]);

    const handleAddBlog = async (data: BlogFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/blogs?id=${id}` : `/api/admin/blogs`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push("/admin/blogs");
            }
        } catch (error) {
            console.log("Error in adding blog", error);
        }
    };

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/admin/blogs?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setValue("title", data.data.title);
                setValue("title_ar", data.data.title_ar);
                setValue("slug", data.data.slug);
                setValue("category", data.data.category);
                setValue("category_ar", data.data.category_ar);
                setValue("coverImage", data.data.coverImage);
                setValue("coverImageAlt", data.data.coverImageAlt);
                setValue("coverImageAlt_ar", data.data.coverImageAlt_ar);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("thumbnailAlt_ar", data.data.thumbnailAlt_ar);
                const isoDate = new Date(data.data.date).toISOString().split("T")[0];
                setValue("date", isoDate);
                setValue("content", data.data.content);
                setValue("content_ar", data.data.content_ar);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaTitle_ar", data.data.metaTitle_ar);
                setValue("metaDescription", data.data.metaDescription);
                setValue("metaDescription_ar", data.data.metaDescription_ar);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    };

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/blogs/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    };

    useEffect(() => {
        if (editMode) {
            handleFetchCategory().then(() => fetchBlogData());
        } else {
            handleFetchCategory();
        }
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, "-");
        setValue("slug", slug);
    }, [watch("slug")]);

    const handleAutoGenerate = () => {
        const name = watch("title");
        if (!name) return;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
        setValue("slug", slug);
    };

    const selectedCategory = watch("category");

    useEffect(() => {
        if (selectedCategory) {
            const match = categoryList.find((item) => item.name === selectedCategory);

            if (match) {
                setValue("category_ar", match.name_ar || match.name);
            }
        }
    }, [selectedCategory, categoryList, setValue]);

    return (
        <div className="flex flex-col gap-5">
            <form className="grid grid-cols-2 gap-10" onSubmit={handleSubmit(handleAddBlog)}>
                {/*English Version */}
                <div className="flex flex-col gap-5">
                    <AdminItemContainer>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        {...register("title", {
                                            required: "Title is required",
                                        })}
                                    />
                                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                                </div>

                                <div>
                                    <Label className="flex gap-2 items-center mb-1">
                                        Slug
                                        <div
                                            className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                                            onClick={handleAutoGenerate}
                                        >
                                            <p>Auto Generate</p>
                                            <RiAiGenerateText />
                                        </div>
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Slug"
                                        {...register("slug", {
                                            required: "Slug is required",
                                            pattern: {
                                                value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                                                message:
                                                    "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                                            },
                                        })}
                                    />
                                    {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="">Category</Label>
                                <Controller
                                    name={`category`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
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

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Cover Image</Label>
                                    <Controller
                                        name="coverImage"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader value={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                    {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("coverImageAlt")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Thumbnail</Label>
                                    <Controller
                                        name="thumbnail"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader value={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                    {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("thumbnailAlt")} />
                                </div>
                            </div>

                            <div>
                                <Label className="">Date</Label>
                                <Input
                                    type="date"
                                    placeholder="Date"
                                    max={new Date().toISOString().split("T")[0]}
                                    {...register("date", { required: "Date is required" })}
                                />
                                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="">Content</Label>
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{ required: "Content is required" }}
                                    render={({ field }) => {
                                        return <TinyEditor setNewsContent={field.onChange} newsContent={field.value} />;
                                    }}
                                />
                                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="font-bold">Meta Title</Label>
                                <Input type="text" placeholder="Meta Title" {...register("metaTitle")} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold">Meta Description</Label>
                                <Input type="text" placeholder="Meta Description" {...register("metaDescription")} />
                            </div>
                        </div>
                    </AdminItemContainer>
                </div>

                {/*Arabic Version */}
                <div className="flex flex-col gap-5">
                    <AdminItemContainer>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Title</Label>
                                    <Input type="text" placeholder="Title" {...register("title_ar")} />
                                </div>

                                <div>
                                    <Label className="flex gap-2 items-center mb-1">
                                        Slug
                                        {/* <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                            <p>Auto Generate</p>
                                            <RiAiGenerateText />
                                        </div> */}
                                    </Label>
                                    <Input type="text" placeholder="Slug" {...register("slug")} disabled />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="">Category</Label>
                                <Controller
                                    name={`category_ar`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue="" disabled>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryList.map((item, index) => (
                                                    <SelectItem key={index} value={item.name_ar}>
                                                        {item.name_ar ? item.name_ar : item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Cover Image</Label>
                                    <Controller
                                        name="coverImage"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader value={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                    {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("coverImageAlt_ar")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Thumbnail</Label>
                                    <Controller
                                        name="thumbnail"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader value={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                    {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("thumbnailAlt_ar")} />
                                </div>
                            </div>

                            <Input type="text" value={watchedDate || ""} placeholder="Date" disabled />

                            <div className="flex flex-col gap-2">
                                <Label className="">Content</Label>
                                <Controller
                                    name="content_ar"
                                    control={control}
                                    render={({ field }) => {
                                        return <TinyEditor setNewsContent={field.onChange} newsContent={field.value} />;
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="font-bold">Meta Title</Label>
                                <Input type="text" placeholder="Meta Title" {...register("metaTitle_ar")} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold">Meta Description</Label>
                                <Input type="text" placeholder="Meta Description" {...register("metaDescription_ar")} />
                            </div>
                        </div>
                    </AdminItemContainer>
                </div>

                <div className="col-span-2">
                    <Button type="submit" className="cursor-pointer text-white text-[16px] w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BlogFormPage;
