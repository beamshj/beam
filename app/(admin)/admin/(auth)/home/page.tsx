"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";

interface HomeFormProps {
  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;

  bannerSection: {
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      highlightText: string;
      highlightText_ar: string;
    }[];
  };

  secondSection: {
    title: string;
    title_ar: string;
  };

  thirdSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    items: {
      logo: string;
      logoAlt: string;
      logoAlt_ar: string;
      title: string;
      title_ar: string;
    }[];
  };

  fourthSection: {
    title: string;
    title_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    videoLink: string;
  };

  fifthSection: {
    title: string;
    title_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    items: {
      logo: string;
      logoAlt: string;
      logoAlt_ar: string;
      number: string;
      number_ar: string;
      value: string;
      value_ar: string;
    }[];
  };

  sixthSection: {
    mainTitle: string;
    mainTitle_ar: string;
    subTitle: string;
    subTitle_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    name: string;
    name_ar: string;
    designation: string;
    designation_ar: string;
  };

  seventhSection: {
    title: string;
    title_ar: string;
    buttonText: string;
    buttonText_ar: string;
    link: string;
    link_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      name: string;
      name_ar: string;
      course: string;
      course_ar: string;
    }[];
  };

  eighthSection: {
    title: string;
    title_ar: string;
  };

  ninethSection: {
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
    }[];
  };

  tenthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    buttonText: string;
    buttonText_ar: string;
  };
}

const HomePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<HomeFormProps>();

  const {
    fields: bannerSectionItems,
    append: bannerSectionAppend,
    remove: bannerSectionRemove,
  } = useFieldArray({
    control,
    name: "bannerSection.items",
  });

  const {
    fields: thirdSectionItems,
    append: thirdSectionAppend,
    remove: thirdSectionRemove,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });

  const {
    fields: fifthSectionItems,
    append: fifthSectionAppend,
    remove: fifthSectionRemove,
  } = useFieldArray({
    control,
    name: "fifthSection.items",
  });

  const {
    fields: seventhSectionItems,
    append: seventhSectionAppend,
    remove: seventhSectionRemove,
  } = useFieldArray({
    control,
    name: "seventhSection.items",
  });

  const {
    fields: ninethSectionItems,
    append: ninethSectionAppend,
    remove: ninethSectionRemove,
  } = useFieldArray({
    control,
    name: "ninethSection.items",
  });

  const handleAddHome = async (data: HomeFormProps) => {
    try {
      const response = await fetch(`/api/admin/home`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding home", error);
    }
  };

  const fetchHomeData = async () => {
    try {
      const response = await fetch(`/api/admin/home`);
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("metaTitle_ar", data.data.metaTitle_ar);
        setValue("metaDescription_ar", data.data.metaDescription_ar);
        setValue("bannerSection.items", data.data.bannerSection.items);
        setValue("secondSection", data.data.secondSection);
        setValue("thirdSection", data.data.thirdSection);
        setValue("thirdSection.items", data.data.thirdSection.items);
        setValue("fourthSection", data.data.fourthSection);
        setValue("fifthSection", data.data.fifthSection);
        setValue("fifthSection.items", data.data.fifthSection.items);
        setValue("sixthSection", data.data.sixthSection);
        setValue("seventhSection", data.data.seventhSection);
        setValue("seventhSection.items", data.data.seventhSection.items);
        setValue("eighthSection", data.data.eighthSection);
        setValue("ninethSection", data.data.ninethSection);
        setValue("ninethSection.items", data.data.ninethSection.items);
        setValue("tenthSection", data.data.tenthSection);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching home data", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <form
      className="w-full grid grid-cols-2 gap-10"
      onSubmit={handleSubmit(handleAddHome)}
    >
      {/* English Version */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-5">
          <AdminItemContainer>
            <Label className="font-bold" main>
              Banner Section
            </Label>
            <div className="p-5 rounded-md flex flex-col gap-5">
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {bannerSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => bannerSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Image</Label>
                        <Controller
                          name={`bannerSection.items.${index}.image`}
                          control={control}
                          rules={{ required: "Image is required" }}
                          render={({ field }) => (
                            <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.bannerSection?.items?.[index]?.image && (
                          <p className="text-red-500">
                            {
                              errors.bannerSection?.items?.[index]?.image
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
                              `bannerSection.items.${index}.imageAlt`,
                              {
                                required: "Value is required",
                              }
                            )}
                          />
                          {errors.bannerSection?.items?.[index]?.imageAlt && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]?.imageAlt
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
                          <Label className="font-bold">Highlight Text</Label>
                          <Input
                            type="text"
                            placeholder="Highlight Text"
                            {...register(
                              `bannerSection.items.${index}.highlightText`,
                              {
                                required: "Value is required",
                              }
                            )}
                          />
                          {errors.bannerSection?.items?.[index]
                            ?.highlightText && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]
                                  ?.highlightText.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`bannerSection.items.${index}.title`, {
                              required: "Value is required",
                            })}
                          />
                          {errors.bannerSection?.items?.[index]?.title && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]?.title
                                  .message
                              }
                            </p>
                          )}
                        </div>
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
                    bannerSectionAppend({
                      title: "",
                      title_ar: "",
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      highlightText: "",
                      highlightText_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label className="font-bold" main>
              Second Section
            </Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`secondSection.title`, {
                    required: "Value is required",
                  })}
                />
                {errors.secondSection?.title && (
                  <p className="text-red-500">
                    {errors.secondSection?.title.message}
                  </p>
                )}
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Third Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("thirdSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.thirdSection?.title && (
                    <p className="text-red-500">
                      {errors.thirdSection?.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="thirdSection.description"
                    control={control}
                    rules={{ required: "Description is required" }}
                    render={({ field }) => {
                      return (
                        <Textarea
                          value={field.value}
                          onChange={field.onChange}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Image</Label>
                  <Controller
                    name="thirdSection.image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.thirdSection?.image && (
                    <p className="text-red-500">
                      {errors.thirdSection?.image.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("thirdSection.imageAlt", {
                      required: "Alt Tag is required",
                    })}
                  />
                  {errors.thirdSection?.imageAlt && (
                    <p className="text-red-500">
                      {errors.thirdSection?.imageAlt.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {thirdSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => thirdSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`thirdSection.items.${index}.logo`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                  isLogo
                                />
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.logo
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
                                  `thirdSection.items.${index}.logoAlt`,
                                  {
                                    required: "Value is required",
                                  }
                                )}
                              />
                              {errors.thirdSection?.items?.[index]?.logoAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.thirdSection?.items?.[index]?.logoAlt
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Title"
                              {...register(
                                `thirdSection.items.${index}.title`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.title && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.title
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
                        thirdSectionAppend({
                          title: "",
                          title_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
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
          {/* <AdminItemContainer>
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
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Logo</Label>
                                        <Controller
                                            name={`thirdSection.items.${index}.logo`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.thirdSection?.items?.[index]?.logo && (
                                            <p className="text-red-500">{errors.thirdSection?.items?.[index]?.logo.message}</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.logoAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.logoAlt.message}</p>}
                                    </div>
                                </div>
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
                                    <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                    </div>
                                </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2 col-span-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                    </div>
                                    <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name={`thirdSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.thirdSection?.items?.[index]?.description && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.description.message}</p>}
                            </div>
                                </div>
                            </div>
                        ))}
        
                    </div>
                    <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "", description: "",logo: "",logoAlt: "" })}>Add Item</Button>
                        </div>
                    </div>
                        </div>
                    </div>
                    </AdminItemContainer> */}
          <AdminItemContainer>
            <Label main>Fourth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("fourthSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.fourthSection?.title && (
                    <p className="text-red-500">
                      {errors.fourthSection?.title.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
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
                        <p className="text-red-500">
                          {errors.fourthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("fourthSection.imageAlt", {
                          required: "Alt Tag is required",
                        })}
                      />
                      {errors.fourthSection?.imageAlt && (
                        <p className="text-red-500">
                          {errors.fourthSection?.imageAlt.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Video Link</Label>
                    <Input
                      type="text"
                      placeholder="Video Link"
                      {...register("fourthSection.videoLink", {
                        required: "Video Link is required",
                      })}
                    />
                    {errors.fourthSection?.videoLink && (
                      <p className="text-red-500">
                        {errors.fourthSection?.videoLink.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Fifth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("fifthSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.fifthSection?.title && (
                    <p className="text-red-500">
                      {errors.fifthSection?.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Image</Label>
                    <Controller
                      name={`fifthSection.image`}
                      control={control}
                      rules={{ required: "Image is required" }}
                      render={({ field }) => (
                        <ImageUploader
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.fifthSection?.image && (
                      <p className="text-red-500">
                        {errors.fifthSection?.image.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Alt Tag</Label>
                    <Input
                      type="text"
                      placeholder="Alt Tag"
                      {...register("fifthSection.imageAlt", {
                        required: "Alt Tag is required",
                      })}
                    />
                    {errors.fifthSection?.imageAlt && (
                      <p className="text-red-500">
                        {errors.fifthSection?.imageAlt.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {fifthSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => fifthSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`fifthSection.items.${index}.logo`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                  isLogo
                                />
                              )}
                            />
                            {errors.fifthSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.fifthSection?.items?.[index]?.logo
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
                                  `fifthSection.items.${index}.logoAlt`,
                                  {
                                    required: "Value is required",
                                  }
                                )}
                              />
                              {errors.fifthSection?.items?.[index]?.logoAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.fifthSection?.items?.[index]?.logoAlt
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Number</Label>
                            <Input
                              type="text"
                              placeholder="Number"
                              {...register(
                                `fifthSection.items.${index}.number`,
                                {
                                  required: "Number is required",
                                }
                              )}
                            />
                            {errors.fifthSection?.items?.[index]?.number && (
                              <p className="text-red-500">
                                {
                                  errors.fifthSection?.items?.[index]?.number
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Value</Label>
                          <Input
                            type="text"
                            placeholder="Value"
                            {...register(`fifthSection.items.${index}.value`, {
                              required: "Value is required",
                            })}
                          />
                          {errors.fifthSection?.items?.[index]?.value && (
                            <p className="text-red-500">
                              {
                                errors.fifthSection?.items?.[index]?.value
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        fifthSectionAppend({
                          number: "",
                          number_ar: "",
                          value: "",
                          value_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
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
            <Label main>Sixth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Main Title</Label>
                  <Input
                    type="text"
                    placeholder="Main Title"
                    {...register("sixthSection.mainTitle", {
                      required: "Main Title is required",
                    })}
                  />
                  {errors.sixthSection?.mainTitle && (
                    <p className="text-red-500">
                      {errors.sixthSection?.mainTitle.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Sub Title</Label>
                  <Input
                    type="text"
                    placeholder="Sub Title"
                    {...register("sixthSection.subTitle", {
                      required: "Sub Title is required",
                    })}
                  />
                  {errors.sixthSection?.subTitle && (
                    <p className="text-red-500">
                      {errors.sixthSection?.subTitle.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("sixthSection.description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.sixthSection?.description && (
                    <p className="text-red-500">
                      {errors.sixthSection?.description.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`sixthSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.sixthSection?.image && (
                        <p className="text-red-500">
                          {errors.sixthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("sixthSection.imageAlt", {
                          required: "Alt Tag is required",
                        })}
                      />
                      {errors.sixthSection?.imageAlt && (
                        <p className="text-red-500">
                          {errors.sixthSection?.imageAlt.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Name</Label>
                      <Input
                        type="text"
                        placeholder="Name"
                        {...register("sixthSection.name", {
                          required: "Name is required",
                        })}
                      />
                      {errors.sixthSection?.name && (
                        <p className="text-red-500">
                          {errors.sixthSection?.name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Designation</Label>
                      <Textarea
                        placeholder="Designation"
                        {...register("sixthSection.designation", {
                          required: "Designation is required",
                        })}
                      />
                      {errors.sixthSection?.designation && (
                        <p className="text-red-500">
                          {errors.sixthSection?.designation.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Seventh Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Textarea
                    placeholder="Title"
                    {...register("seventhSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.seventhSection?.title && (
                    <p className="text-red-500">
                      {errors.seventhSection?.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Button Text</Label>
                  <Input
                    type="text"
                    placeholder="Button Text"
                    {...register("seventhSection.buttonText", {
                      required: "Button Text is required",
                    })}
                  />
                  {errors.seventhSection?.buttonText && (
                    <p className="text-red-500">
                      {errors.seventhSection?.buttonText.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Link</Label>
                  <Input
                    type="text"
                    placeholder="Link"
                    {...register("seventhSection.link", {
                      required: "Link is required",
                    })}
                  />
                  {errors.seventhSection?.link && (
                    <p className="text-red-500">
                      {errors.seventhSection?.link.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {seventhSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => seventhSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`seventhSection.items.${index}.image`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.seventhSection?.items?.[index]?.image && (
                              <p className="text-red-500">
                                {
                                  errors.seventhSection?.items?.[index]?.image
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
                                  `seventhSection.items.${index}.imageAlt`,
                                  {
                                    required: "Alt Tag is required",
                                  }
                                )}
                              />
                              {errors.seventhSection?.items?.[index]
                                ?.imageAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.seventhSection?.items?.[index]
                                      ?.imageAlt.message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(
                                `seventhSection.items.${index}.name`,
                                {
                                  required: "Name is required",
                                }
                              )}
                            />
                            {errors.seventhSection?.items?.[index]?.name && (
                              <p className="text-red-500">
                                {
                                  errors.seventhSection?.items?.[index]?.name
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Course</Label>
                          <Input
                            type="text"
                            placeholder="Course"
                            {...register(
                              `seventhSection.items.${index}.course`,
                              {
                                required: "Course is required",
                              }
                            )}
                          />
                          {errors.seventhSection?.items?.[index]?.course && (
                            <p className="text-red-500">
                              {
                                errors.seventhSection?.items?.[index]?.course
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        seventhSectionAppend({
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
                          name_ar: "",
                          name: "",
                          course: "",
                          course_ar: "",
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
            <Label className="font-bold" main>
              Eighth Section
            </Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`eighthSection.title`, {
                    required: "Title is required",
                  })}
                />
                {errors.eighthSection?.title && (
                  <p className="text-red-500">
                    {errors.eighthSection?.title.message}
                  </p>
                )}
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Nineth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {ninethSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => ninethSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`ninethSection.items.${index}.image`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.ninethSection?.items?.[index]?.image && (
                              <p className="text-red-500">
                                {
                                  errors.ninethSection?.items?.[index]?.image
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
                                  `ninethSection.items.${index}.imageAlt`,
                                  {
                                    required: "Alt Tag is required",
                                  }
                                )}
                              />
                              {errors.ninethSection?.items?.[index]
                                ?.imageAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.ninethSection?.items?.[index]
                                      ?.imageAlt.message
                                  }
                                </p>
                              )}
                            </div>
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
                        ninethSectionAppend({
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
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
            <Label main>Tenth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("tenthSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.tenthSection?.title && (
                    <p className="text-red-500">
                      {errors.tenthSection?.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("tenthSection.description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.tenthSection?.description && (
                    <p className="text-red-500">
                      {errors.tenthSection?.description.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`tenthSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.tenthSection?.image && (
                        <p className="text-red-500">
                          {errors.tenthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("tenthSection.imageAlt", {
                          required: "Alt Tag is required",
                        })}
                      />
                      {errors.tenthSection?.imageAlt && (
                        <p className="text-red-500">
                          {errors.tenthSection?.imageAlt.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Button Text</Label>
                    <Input
                      type="text"
                      placeholder="Button Text"
                      {...register("tenthSection.buttonText", {
                        required: "Button Text is required",
                      })}
                    />
                    {errors.tenthSection?.buttonText && (
                      <p className="text-red-500">
                        {errors.tenthSection?.buttonText.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Title</Label>
            <Input
              type="text"
              placeholder="Meta Title"
              {...register("metaTitle")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Description</Label>
            <Input
              type="text"
              placeholder="Meta Description"
              {...register("metaDescription")}
            />
          </div>
        </div>
      </div>

      {/* Arabic Version */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-5">
          <AdminItemContainer>
            <Label className="font-bold" main>
              Banner Section
            </Label>
            <div className="p-5 rounded-md flex flex-col gap-5">
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {bannerSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => bannerSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Image</Label>
                        <Controller
                          name={`bannerSection.items.${index}.image`}
                          control={control}
                          rules={{ required: "Image is required" }}
                          render={({ field }) => (
                            <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.bannerSection?.items?.[index]?.image && (
                          <p className="text-red-500">
                            {
                              errors.bannerSection?.items?.[index]?.image
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
                              `bannerSection.items.${index}.imageAlt_ar`
                            )}
                          />
                          {errors.bannerSection?.items?.[index]
                            ?.imageAlt_ar && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]
                                  ?.imageAlt_ar?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Highlight Text</Label>
                          <Input
                            type="text"
                            placeholder="Highlight Text"
                            {...register(
                              `bannerSection.items.${index}.highlightText_ar`
                            )}
                          />
                          {errors.bannerSection?.items?.[index]
                            ?.highlightText_ar && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]
                                  ?.highlightText_ar.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(
                              `bannerSection.items.${index}.title_ar`
                            )}
                          />
                          {errors.bannerSection?.items?.[index]?.title_ar && (
                            <p className="text-red-500">
                              {
                                errors.bannerSection?.items?.[index]?.title_ar
                                  .message
                              }
                            </p>
                          )}
                        </div>
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
                    bannerSectionAppend({
                      title: "",
                      title_ar: "",
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      highlightText: "",
                      highlightText_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label className="font-bold" main>
              Second Section
            </Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`secondSection.title_ar`)}
                />
                {errors.secondSection?.title_ar && (
                  <p className="text-red-500">
                    {errors.secondSection?.title_ar.message}
                  </p>
                )}
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Third Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("thirdSection.title_ar")}
                  />
                  {errors.thirdSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.thirdSection?.title_ar.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="thirdSection.description_ar"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Textarea
                          value={field.value}
                          onChange={field.onChange}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Image</Label>
                  <Controller
                    name="thirdSection.image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.thirdSection?.image && (
                    <p className="text-red-500">
                      {errors.thirdSection?.image.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("thirdSection.imageAlt_ar")}
                  />
                  {errors.thirdSection?.imageAlt_ar && (
                    <p className="text-red-500">
                      {errors.thirdSection?.imageAlt_ar.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {thirdSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => thirdSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`thirdSection.items.${index}.logo`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                  isLogo
                                />
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.logo
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
                                  `thirdSection.items.${index}.logoAlt_ar`
                                )}
                              />
                              {errors.thirdSection?.items?.[index]
                                ?.logoAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.thirdSection?.items?.[index]
                                      ?.logoAlt_ar.message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Title"
                              {...register(
                                `thirdSection.items.${index}.title_ar`
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.title_ar && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.title_ar
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
                        thirdSectionAppend({
                          title: "",
                          title_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
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
          {/* <AdminItemContainer>
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
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Logo</Label>
                                        <Controller
                                            name={`thirdSection.items.${index}.logo`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.thirdSection?.items?.[index]?.logo && (
                                            <p className="text-red-500">{errors.thirdSection?.items?.[index]?.logo.message}</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.logoAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.logoAlt.message}</p>}
                                    </div>
                                </div>
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
                                    <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                    </div>
                                </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2 col-span-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                    </div>
                                    <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name={`thirdSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.thirdSection?.items?.[index]?.description && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.description.message}</p>}
                            </div>
                                </div>
                            </div>
                        ))}
        
                    </div>
                    <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "", description: "",logo: "",logoAlt: "" })}>Add Item</Button>
                        </div>
                    </div>
                        </div>
                    </div>
                    </AdminItemContainer> */}
          <AdminItemContainer>
            <Label main>Fourth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("fourthSection.title_ar")}
                  />
                  {errors.fourthSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.fourthSection?.title_ar.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
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
                        <p className="text-red-500">
                          {errors.fourthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("fourthSection.imageAlt_ar")}
                      />
                      {errors.fourthSection?.imageAlt_ar && (
                        <p className="text-red-500">
                          {errors.fourthSection?.imageAlt_ar.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Video Link</Label>
                    <Input
                      type="text"
                      placeholder="Video Link"
                      {...register("fourthSection.videoLink")}
                    />
                    {errors.fourthSection?.videoLink && (
                      <p className="text-red-500">
                        {errors.fourthSection?.videoLink.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Fifth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("fifthSection.title_ar")}
                  />
                  {errors.fifthSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.fifthSection?.title_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Image</Label>
                    <Controller
                      name={`fifthSection.image`}
                      control={control}
                      rules={{ required: "Image is required" }}
                      render={({ field }) => (
                        <ImageUploader
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.fifthSection?.image && (
                      <p className="text-red-500">
                        {errors.fifthSection?.image.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Alt Tag</Label>
                    <Input
                      type="text"
                      placeholder="Alt Tag"
                      {...register("fifthSection.imageAlt_ar")}
                    />
                    {errors.fifthSection?.imageAlt_ar && (
                      <p className="text-red-500">
                        {errors.fifthSection?.imageAlt_ar.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {fifthSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => fifthSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`fifthSection.items.${index}.logo`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                  isLogo
                                />
                              )}
                            />
                            {errors.fifthSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.fifthSection?.items?.[index]?.logo
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
                                  `fifthSection.items.${index}.logoAlt_ar`
                                )}
                              />
                              {errors.fifthSection?.items?.[index]
                                ?.logoAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.fifthSection?.items?.[index]
                                      ?.logoAlt_ar.message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Number</Label>
                            <Input
                              type="text"
                              placeholder="Number"
                              {...register(
                                `fifthSection.items.${index}.number_ar`
                              )}
                            />
                            {errors.fifthSection?.items?.[index]?.number_ar && (
                              <p className="text-red-500">
                                {
                                  errors.fifthSection?.items?.[index]?.number_ar
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Value</Label>
                          <Input
                            type="text"
                            placeholder="Value"
                            {...register(
                              `fifthSection.items.${index}.value_ar`
                            )}
                          />
                          {errors.fifthSection?.items?.[index]?.value_ar && (
                            <p className="text-red-500">
                              {
                                errors.fifthSection?.items?.[index]?.value_ar
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        fifthSectionAppend({
                          number: "",
                          number_ar: "",
                          value: "",
                          value_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
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
            <Label main>Sixth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Main Title</Label>
                  <Input
                    type="text"
                    placeholder="Main Title"
                    {...register("sixthSection.mainTitle_ar")}
                  />
                  {errors.sixthSection?.mainTitle_ar && (
                    <p className="text-red-500">
                      {errors.sixthSection?.mainTitle_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Sub Title</Label>
                  <Input
                    type="text"
                    placeholder="Sub Title"
                    {...register("sixthSection.subTitle_ar")}
                  />
                  {errors.sixthSection?.subTitle_ar && (
                    <p className="text-red-500">
                      {errors.sixthSection?.subTitle_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("sixthSection.description_ar")}
                  />
                  {errors.sixthSection?.description_ar && (
                    <p className="text-red-500">
                      {errors.sixthSection?.description_ar.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`sixthSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.sixthSection?.image && (
                        <p className="text-red-500">
                          {errors.sixthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("sixthSection.imageAlt_ar")}
                      />
                      {errors.sixthSection?.imageAlt_ar && (
                        <p className="text-red-500">
                          {errors.sixthSection?.imageAlt_ar.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Name</Label>
                      <Input
                        type="text"
                        placeholder="Name"
                        {...register("sixthSection.name_ar")}
                      />
                      {errors.sixthSection?.name_ar && (
                        <p className="text-red-500">
                          {errors.sixthSection?.name_ar.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Designation</Label>
                      <Textarea
                        placeholder="Designation"
                        {...register("sixthSection.designation_ar")}
                      />
                      {errors.sixthSection?.designation_ar && (
                        <p className="text-red-500">
                          {errors.sixthSection?.designation_ar.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Seventh Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Textarea
                    placeholder="Title"
                    {...register("seventhSection.title_ar")}
                  />
                  {errors.seventhSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.seventhSection?.title_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Button Text</Label>
                  <Input
                    type="text"
                    placeholder="Button Text"
                    {...register("seventhSection.buttonText_ar")}
                  />
                  {errors.seventhSection?.buttonText_ar && (
                    <p className="text-red-500">
                      {errors.seventhSection?.buttonText_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Link</Label>
                  <Input
                    type="text"
                    placeholder="Link"
                    {...register("seventhSection.link_ar")}
                  />
                  {errors.seventhSection?.link_ar && (
                    <p className="text-red-500">
                      {errors.seventhSection?.link_ar.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {seventhSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => seventhSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`seventhSection.items.${index}.image`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.seventhSection?.items?.[index]?.image && (
                              <p className="text-red-500">
                                {
                                  errors.seventhSection?.items?.[index]?.image
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
                                  `seventhSection.items.${index}.imageAlt_ar`
                                )}
                              />
                              {errors.seventhSection?.items?.[index]
                                ?.imageAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.seventhSection?.items?.[index]
                                      ?.imageAlt_ar.message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 col-span-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(
                                `seventhSection.items.${index}.name_ar`
                              )}
                            />
                            {errors.seventhSection?.items?.[index]?.name_ar && (
                              <p className="text-red-500">
                                {
                                  errors.seventhSection?.items?.[index]?.name_ar
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Course</Label>
                          <Input
                            type="text"
                            placeholder="Course"
                            {...register(
                              `seventhSection.items.${index}.course_ar`
                            )}
                          />
                          {errors.seventhSection?.items?.[index]?.course_ar && (
                            <p className="text-red-500">
                              {
                                errors.seventhSection?.items?.[index]?.course_ar
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        seventhSectionAppend({
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
                          name: "",
                          name_ar: "",
                          course: "",
                          course_ar: "",
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
            <Label className="font-bold" main>
              Eighth Section
            </Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`eighthSection.title_ar`)}
                />
                {errors.eighthSection?.title_ar && (
                  <p className="text-red-500">
                    {errors.eighthSection?.title_ar.message}
                  </p>
                )}
              </div>
            </div>
          </AdminItemContainer>
          <AdminItemContainer>
            <Label main>Nineth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md grid grid-cols-2 gap-5">
                    {ninethSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => ninethSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`ninethSection.items.${index}.image`}
                              control={control}
                              rules={{ required: "Image is required" }}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.ninethSection?.items?.[index]?.image && (
                              <p className="text-red-500">
                                {
                                  errors.ninethSection?.items?.[index]?.image
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
                                  `ninethSection.items.${index}.imageAlt_ar`
                                )}
                              />
                              {errors.ninethSection?.items?.[index]
                                ?.imageAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.ninethSection?.items?.[index]
                                      ?.imageAlt_ar.message
                                  }
                                </p>
                              )}
                            </div>
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
                        ninethSectionAppend({
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
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
            <Label main>Tenth Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("tenthSection.title_ar")}
                  />
                  {errors.tenthSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.tenthSection?.title_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("tenthSection.description_ar")}
                  />
                  {errors.tenthSection?.description_ar && (
                    <p className="text-red-500">
                      {errors.tenthSection?.description_ar.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`tenthSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.tenthSection?.image && (
                        <p className="text-red-500">
                          {errors.tenthSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("tenthSection.imageAlt_ar")}
                      />
                      {errors.tenthSection?.imageAlt_ar && (
                        <p className="text-red-500">
                          {errors.tenthSection?.imageAlt_ar.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="font-bold">Button Text</Label>
                    <Input
                      type="text"
                      placeholder="Button Text"
                      {...register("tenthSection.buttonText_ar")}
                    />
                    {errors.tenthSection?.buttonText_ar && (
                      <p className="text-red-500">
                        {errors.tenthSection?.buttonText_ar.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Title</Label>
            <Input
              type="text"
              placeholder="Meta Title"
              {...register("metaTitle_ar")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Description</Label>
            <Input
              type="text"
              placeholder="Meta Description"
              {...register("metaDescription_ar")}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Button
          type="submit"
          className="cursor-pointer text-white text-[16px] w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default HomePage;
