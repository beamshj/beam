"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";
import TinyEditor from "@/app/components/TinyMce/TinyEditor";

interface AlumniFormProps {
    metaTitle: string;
    metaDescription: string;
    metaTitle_ar: string;
    metaDescription_ar: string;
    banner: string;
    bannerAlt: string;
    bannerAlt_ar: string;
    pageTitle: string;
    pageTitle_ar: string;
    mainSection: {
        title: string;
        title_ar: string;
        description: string;
        description_ar: string;
        image: string;
        imageAlt: string;
        imageAlt_ar: string;
    };
    countryCardSection: {
        items: {
            name: string;
            name_ar: string;
            flag: string;
            flagAlt: string;
            flagAlt_ar: string;
            universities: string;
            universities_ar: string;
        }[];
    };
    testimonialsSection: {
        headingOne: string;
        headingOne_ar: string;
        headingTwo: string;
        headingTwo_ar: string;
        items: {
            name: string;
            name_ar: string;
            content: string;
            content_ar: string;
            profileImage: string;
            profileImageAlt: string;
            profileImageAlt_ar: string;
        }[];
    };
}

const AlumniPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<AlumniFormProps>();

    const {
        fields: countryCardSectionItems,
        append: countryCardSectionAppend,
        remove: countryCardSectionRemove,
    } = useFieldArray({
        control,
        name: "countryCardSection.items",
    });

    const {
        fields: testimonialsSectionItems,
        append: testimonialsSectionAppend,
        remove: testimonialsSectionRemove,
    } = useFieldArray({
        control,
        name: "testimonialsSection.items",
    });

    const handleAddAlumni = async (data: AlumniFormProps) => {
        try {
            const response = await fetch(`/api/admin/alumni`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
            }
        } catch (error) {
            console.log("Error in adding Alumni data", error);
        }
    };

    const fetchAlumniData = async () => {
        try {
            const response = await fetch(`/api/admin/alumni`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("bannerAlt_ar", data.data.bannerAlt_ar);
                setValue("pageTitle", data.data.pageTitle);
                setValue("pageTitle_ar", data.data.pageTitle_ar);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaTitle_ar", data.data.metaTitle_ar);
                setValue("metaDescription", data.data.metaDescription);
                setValue("metaDescription_ar", data.data.metaDescription_ar);
                setValue("mainSection", data.data.mainSection);
                setValue("countryCardSection", data.data.countryCardSection);
                setValue("countryCardSection.items", data.data.countryCardSection.items);
                setValue("testimonialsSection", data.data.testimonialsSection);
                setValue("testimonialsSection.items", data.data.testimonialsSection.items);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching Alumni data", error);
        }
    };

    useEffect(() => {
        fetchAlumniData();
    }, []);

    return (
        <form className="grid grid-cols-2 w-full gap-10" onSubmit={handleSubmit(handleAddAlumni)}>
            {/*English version*/}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <AdminItemContainer>
                        <Label className="" main>
                            Banner
                        </Label>
                        <div className="p-5 rounded-md grid grid-cols-2 gap-5">
                            <div>
                                <Controller
                                    name="banner"
                                    control={control}
                                    rules={{ required: "Banner is required" }}
                                    render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} />}
                                />
                                {errors.banner && <p className="text-red-500">{errors.banner.message}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("bannerAlt")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Page Title</Label>
                                    <Input type="text" placeholder="Page Title" {...register("pageTitle")} />
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>First Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        {...register("mainSection.title", {
                                            required: "Title is required",
                                        })}
                                    />
                                    {errors.mainSection?.title && (
                                        <p className="text-red-500">{errors.mainSection?.title.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Description</Label>
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        {...register("mainSection.description", {
                                            required: "Description is required",
                                        })}
                                    />
                                    {errors.mainSection?.description && (
                                        <p className="text-red-500">{errors.mainSection?.description.message}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="font-bold">Image</Label>
                                            <Controller
                                                name={`mainSection.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader value={field.value} onChange={field.onChange} />
                                                )}
                                            />
                                            {errors.mainSection?.image && (
                                                <p className="text-red-500">{errors.mainSection?.image.message}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Label className="font-bold">Alt Tag</Label>
                                            <Input
                                                type="text"
                                                placeholder="Alt Tag"
                                                {...register("mainSection.imageAlt", {
                                                    required: "Alt Tag is required",
                                                })}
                                            />
                                            {errors.mainSection?.imageAlt && (
                                                <p className="text-red-500">{errors.mainSection?.imageAlt.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>Second Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border p-2 rounded-md flex flex-col gap-5">
                                        {countryCardSectionItems.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                            >
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => countryCardSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Flag</Label>
                                                        <Controller
                                                            name={`countryCardSection.items.${index}.flag`}
                                                            control={control}
                                                            rules={{ required: "Flag is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                        {errors.countryCardSection?.items?.[index]?.flag && (
                                                            <p className="text-red-500">
                                                                {errors.countryCardSection?.items?.[index]?.flag.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(`countryCardSection.items.${index}.flagAlt`, {
                                                                    required: "Value is required",
                                                                })}
                                                            />
                                                            {errors.countryCardSection?.items?.[index]?.flagAlt && (
                                                                <p className="text-red-500">
                                                                    {
                                                                        errors.countryCardSection?.items?.[index]?.flagAlt
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Title</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Title"
                                                                {...register(`countryCardSection.items.${index}.name`, {
                                                                    required: "Value is required",
                                                                })}
                                                            />
                                                            {errors.countryCardSection?.items?.[index]?.name && (
                                                                <p className="text-red-500">
                                                                    {
                                                                        errors.countryCardSection?.items?.[index]?.name
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Label className="font-bold">Description</Label>
                                                        <Controller
                                                            name={`countryCardSection.items.${index}.universities`}
                                                            control={control}
                                                            rules={{ required: "Universities is required" }}
                                                            render={({ field }) => {
                                                                return (
                                                                    <TinyEditor
                                                                        setNewsContent={field.onChange}
                                                                        newsContent={field.value}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                        {errors.countryCardSection?.items?.[index]?.universities && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.countryCardSection?.items?.[index]?.universities
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            type="button"
                                            addItem
                                            onClick={() =>
                                                countryCardSectionAppend({
                                                    name: "",
                                                    name_ar: "",
                                                    flag: "",
                                                    flagAlt: "",
                                                    flagAlt_ar: "",
                                                    universities: "",
                                                    universities_ar: "",
                                                })
                                            }
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>Third Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-bold">Heading One</Label>
                                    <Input
                                        type="text"
                                        placeholder="Heading One"
                                        {...register("testimonialsSection.headingOne")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-bold">Heading Two</Label>
                                    <Input
                                        type="text"
                                        placeholder="Heading Two"
                                        {...register("testimonialsSection.headingTwo")}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border p-2 rounded-md flex flex-col gap-5">
                                        {testimonialsSectionItems.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                            >
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => countryCardSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Profile Image</Label>
                                                        <Controller
                                                            name={`testimonialsSection.items.${index}.profileImage`}
                                                            control={control}
                                                            rules={{ required: "Flag is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                        {errors.testimonialsSection?.items?.[index]?.profileImage && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.testimonialsSection?.items?.[index]?.profileImage
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(
                                                                    `testimonialsSection.items.${index}.profileImageAlt`,
                                                                    {
                                                                        required: "Value is required",
                                                                    },
                                                                )}
                                                            />
                                                            {errors.testimonialsSection?.items?.[index]
                                                                ?.profileImageAlt && (
                                                                <p className="text-red-500">
                                                                    {
                                                                        errors.testimonialsSection?.items?.[index]
                                                                            ?.profileImageAlt.message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Name</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Name"
                                                                {...register(`testimonialsSection.items.${index}.name`, {
                                                                    required: "Value is required",
                                                                })}
                                                            />
                                                            {errors.testimonialsSection?.items?.[index]?.name && (
                                                                <p className="text-red-500">
                                                                    {
                                                                        errors.testimonialsSection?.items?.[index]?.name
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Label className="font-bold">Testimonial</Label>
                                                        <Controller
                                                            name={`testimonialsSection.items.${index}.content`}
                                                            control={control}
                                                            rules={{ required: "Testimonial is required" }}
                                                            render={({ field }) => {
                                                                return (
                                                                    <TinyEditor
                                                                        setNewsContent={field.onChange}
                                                                        newsContent={field.value}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                        {errors.testimonialsSection?.items?.[index]?.content && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.testimonialsSection?.items?.[index]?.content
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            type="button"
                                            addItem
                                            onClick={() =>
                                                testimonialsSectionAppend({
                                                    name: "",
                                                    name_ar: "",
                                                    content: "",
                                                    content_ar: "",
                                                    profileImage: "",
                                                    profileImageAlt: "",
                                                    profileImageAlt_ar: "",
                                                })
                                            }
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Meta Title</Label>
                        <Input type="text" placeholder="Meta Title" {...register("metaTitle")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Meta Description</Label>
                        <Input type="text" placeholder="Meta Description" {...register("metaDescription")} />
                    </div>
                </div>
            </div>

            {/*Arabic version*/}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <AdminItemContainer>
                        <Label className="" main>
                            Banner
                        </Label>
                        <div className="p-5 rounded-md grid grid-cols-2 gap-5">
                            <div>
                                <Controller
                                    name="banner"
                                    control={control}
                                    rules={{ required: "Banner is required" }}
                                    render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} />}
                                />
                                {errors.banner && <p className="text-red-500">{errors.banner.message}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Alt Tag</Label>
                                    <Input type="text" placeholder="Alt Tag" {...register("bannerAlt_ar")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Page Title</Label>
                                    <Input type="text" placeholder="Page Title" {...register("pageTitle_ar")} />
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>First Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Title</Label>
                                    <Input type="text" placeholder="Title" {...register("mainSection.title_ar")} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Description</Label>
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        {...register("mainSection.description_ar")}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="font-bold">Image</Label>
                                            <Controller
                                                name={`mainSection.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader value={field.value} onChange={field.onChange} />
                                                )}
                                            />
                                            {errors.mainSection?.image && (
                                                <p className="text-red-500">{errors.mainSection?.image.message}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Label className="font-bold">Alt Tag</Label>
                                            <Input
                                                type="text"
                                                placeholder="Alt Tag"
                                                {...register("mainSection.imageAlt_ar")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>Second Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border p-2 rounded-md flex flex-col gap-5">
                                        {countryCardSectionItems.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                            >
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => countryCardSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Flag</Label>
                                                        <Controller
                                                            name={`countryCardSection.items.${index}.flag`}
                                                            control={control}
                                                            rules={{ required: "Flag is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                        {errors.countryCardSection?.items?.[index]?.flag && (
                                                            <p className="text-red-500">
                                                                {errors.countryCardSection?.items?.[index]?.flag.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(
                                                                    `countryCardSection.items.${index}.flagAlt_ar`,
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Country Name</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Country Name"
                                                                {...register(`countryCardSection.items.${index}.name_ar`)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Label className="font-bold">Universities</Label>
                                                        <Controller
                                                            name={`countryCardSection.items.${index}.universities_ar`}
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (
                                                                    <TinyEditor
                                                                        setNewsContent={field.onChange}
                                                                        newsContent={field.value}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            type="button"
                                            addItem
                                            onClick={() =>
                                                countryCardSectionAppend({
                                                    name: "",
                                                    name_ar: "",
                                                    flag: "",
                                                    flagAlt: "",
                                                    flagAlt_ar: "",
                                                    universities: "",
                                                    universities_ar: "",
                                                })
                                            }
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <AdminItemContainer>
                        <Label main>Third Section</Label>
                        <div className="p-5 rounded-md flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-bold">Heading One</Label>
                                    <Input
                                        type="text"
                                        placeholder="Heading One"
                                        {...register("testimonialsSection.headingOne_ar")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-bold">Heading Two</Label>
                                    <Input
                                        type="text"
                                        placeholder="Heading Two"
                                        {...register("testimonialsSection.headingTwo_ar")}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border p-2 rounded-md flex flex-col gap-5">
                                        {testimonialsSectionItems.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                            >
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => countryCardSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Profile Image</Label>
                                                        <Controller
                                                            name={`testimonialsSection.items.${index}.profileImage`}
                                                            control={control}
                                                            rules={{ required: "Flag is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                        {errors.testimonialsSection?.items?.[index]?.profileImage && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.testimonialsSection?.items?.[index]?.profileImage
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(
                                                                    `testimonialsSection.items.${index}.profileImageAlt_ar`,
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Name</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Name"
                                                                {...register(`testimonialsSection.items.${index}.name_ar`)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <Label className="font-bold">Testimonial Content</Label>
                                                        <Controller
                                                            name={`testimonialsSection.items.${index}.content_ar`}
                                                            control={control}
                                                            render={({ field }) => {
                                                                return (
                                                                    <TinyEditor
                                                                        setNewsContent={field.onChange}
                                                                        newsContent={field.value}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            type="button"
                                            addItem
                                            onClick={() =>
                                                testimonialsSectionAppend({
                                                    name: "",
                                                    name_ar: "",
                                                    content: "",
                                                    content_ar: "",
                                                    profileImage: "",
                                                    profileImageAlt: "",
                                                    profileImageAlt_ar: "",
                                                })
                                            }
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AdminItemContainer>

                    <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Meta Title</Label>
                        <Input type="text" placeholder="Meta Title" {...register("metaTitle_ar")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Meta Description</Label>
                        <Input type="text" placeholder="Meta Description" {...register("metaDescription_ar")} />
                    </div>
                </div>
            </div>

            <div className="flex col-span-2">
                <Button type="submit" className="cursor-pointer text-white text-[16px] w-full">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AlumniPage;
