"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";

interface AboutFormProps {
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;

  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;

  pageTitle: string;
  pageTitle_ar: string;

  firstSection: {
    mainTitle: string;
    mainTitle_ar: string;
    subTitle: string;
    subTitle_ar: string;
    highlight: string;
    highlight_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  };

  secondSection: {
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
      description: string;
      description_ar: string;
    }[];
  };

  thirdSection: {
    title: string;
    title_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      description: string;
      description_ar: string;
    }[];
  };

  historySection: {
    title: string;
    title_ar: string;
    items: {
      year: string;
      year_ar: string;
      title: string;
      title_ar: string;
      description: string;
      description_ar: string;
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
    }[];
  };

  fifthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  };

  sixthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
    }[];
  };

  seventhSection: {
    title: string;
    title_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      link: string;
      link_ar: string;
    }[];
  };
}

const AboutPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AboutFormProps>();

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
  } = useFieldArray({
    control,
    name: "secondSection.items",
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
    fields: historySectionItems,
    append: historySectionAppend,
    remove: historySectionRemove,
  } = useFieldArray({
    control,
    name: "historySection.items",
  });

  const {
    fields: sixthSectionItems,
    append: sixthSectionAppend,
    remove: sixthSectionRemove,
  } = useFieldArray({
    control,
    name: "sixthSection.items",
  });

  const {
    fields: seventhSectionItems,
    append: seventhSectionAppend,
    remove: seventhSectionRemove,
  } = useFieldArray({
    control,
    name: "seventhSection.items",
  });

  const handleAddAbout = async (data: AboutFormProps) => {
    try {
      const response = await fetch(`/api/admin/about`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding about", error);
    }
  };

  const fetchAboutData = async () => {
    try {
      const response = await fetch(`/api/admin/about`);
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
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
        setValue("thirdSection", data.data.thirdSection);
        setValue("thirdSection.items", data.data.thirdSection.items);
        setValue("fifthSection", data.data.fifthSection);
        setValue("sixthSection", data.data.sixthSection);
        setValue("sixthSection.items", data.data.sixthSection.items);
        setValue("historySection", data.data.historySection);
        setValue("historySection.items", data.data.historySection.items);
        setValue("seventhSection", data.data.seventhSection);
        setValue("seventhSection.items", data.data.seventhSection.items);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching about data", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <form
      className="w-full grid grid-cols-2 gap-10"
      onSubmit={handleSubmit(handleAddAbout)}
    >
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
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("bannerAlt")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Page Title</Label>
                  <Input
                    type="text"
                    placeholder="Page Title"
                    {...register("pageTitle")}
                  />
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>First Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Main Title</Label>
                  <Input
                    type="text"
                    placeholder="Main Title"
                    {...register("firstSection.mainTitle", {
                      required: "Main Title is required",
                    })}
                  />
                  {errors.firstSection?.mainTitle && (
                    <p className="text-red-500">
                      {errors.firstSection?.mainTitle.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Sub Title</Label>
                  <Input
                    type="text"
                    placeholder="Sub Title"
                    {...register("firstSection.subTitle", {
                      required: "Sub Title is required",
                    })}
                  />
                  {errors.firstSection?.subTitle && (
                    <p className="text-red-500">
                      {errors.firstSection?.subTitle.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Highlight</Label>
                  <Input
                    type="text"
                    placeholder="Highlight"
                    {...register("firstSection.highlight", {
                      required: "Highlight is required",
                    })}
                  />
                  {errors.firstSection?.highlight && (
                    <p className="text-red-500">
                      {errors.firstSection?.highlight.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="firstSection.description"
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

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="firstSection.image"
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
                  <p className="text-red-500">
                    {errors.firstSection?.image.message}
                  </p>
                )}
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("firstSection.imageAlt")}
                />
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Second Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("secondSection.title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.secondSection?.title && (
                    <p className="text-red-500">
                      {errors.secondSection?.title.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Controller
                    name="secondSection.description"
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

                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Image</Label>
                  <Controller
                    name="secondSection.image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.secondSection?.image && (
                    <p className="text-red-500">
                      {errors.secondSection?.image.message}
                    </p>
                  )}
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("secondSection.imageAlt")}
                  />
                </div>

                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md flex flex-col gap-5">
                    {secondSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => secondSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`secondSection.items.${index}.logo`}
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
                            {errors.secondSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.secondSection?.items?.[index]?.logo
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
                                  `secondSection.items.${index}.logoAlt`,
                                  {
                                    required: "Value is required",
                                  }
                                )}
                              />
                              {errors.secondSection?.items?.[index]
                                ?.logoAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
                                      ?.logoAlt.message
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
                                {...register(
                                  `secondSection.items.${index}.title`,
                                  {
                                    required: "Value is required",
                                  }
                                )}
                              />
                              {errors.secondSection?.items?.[index]?.title && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]?.title
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Controller
                                name={`secondSection.items.${index}.description`}
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        secondSectionAppend({
                          title: "",
                          title_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
                          description: "",
                          description_ar: "",
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
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md flex flex-col gap-5">
                    {thirdSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => thirdSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
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
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.image
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
                                  `thirdSection.items.${index}.imageAlt`,
                                  {
                                    required: "Value is required",
                                  }
                                )}
                              />
                              {errors.thirdSection?.items?.[index]
                                ?.imageAlt && (
                                <p className="text-red-500">
                                  {
                                    errors.thirdSection?.items?.[index]
                                      ?.imageAlt.message
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

                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`thirdSection.items.${index}.description`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="custom-quill"
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
                        thirdSectionAppend({
                          title: "",
                          title_ar: "",
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
                          description: "",
                          description_ar: "",
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
            <Label main>History Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`historySection.title`, {
                    required: "Value is required",
                  })}
                />
                {errors?.historySection?.title && (
                  <p className="text-red-500">
                    {errors.historySection.title.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-bold">Items</Label>
                <div className="border p-2 rounded-md flex flex-col gap-5">
                  {historySectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                    >
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => historySectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Image</Label>
                          <Controller
                            name={`historySection.items.${index}.image`}
                            control={control}
                            rules={{ required: "Image is required" }}
                            render={({ field }) => (
                              <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.historySection?.items?.[index]?.image && (
                            <p className="text-red-500">
                              {
                                errors.historySection?.items?.[index]?.image
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
                                `historySection.items.${index}.imageAlt`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.historySection?.items?.[index]
                              ?.imageAlt && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]
                                    ?.imageAlt.message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Year</Label>
                            <Input
                              type="text"
                              placeholder="Year"
                              {...register(
                                `historySection.items.${index}.year`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.historySection?.items?.[index]?.year && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]?.year
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Title"
                              {...register(
                                `historySection.items.${index}.title`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.historySection?.items?.[index]?.title && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]?.title
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Textarea
                              placeholder="Description"
                              {...register(
                                `historySection.items.${index}.description`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.historySection?.items?.[index]
                              ?.description && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]
                                    ?.description.message
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
                      historySectionAppend({
                        year: "",
                        year_ar: "",
                        title: "",
                        title_ar: "",
                        description: "",
                        description_ar: "",
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
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="fifthSection.description"
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

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="fifthSection.image"
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
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("fifthSection.imageAlt")}
                />
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Sixth Section</Label>

            <div className="p-5 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register(`sixthSection.title`, {
                      required: "Value is required",
                    })}
                  />
                  {errors.sixthSection?.title && (
                    <p className="text-red-500">
                      {errors.sixthSection?.title.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register(`sixthSection.description`, {
                      required: "Value is required",
                    })}
                  />
                  {errors.sixthSection?.description && (
                    <p className="text-red-500">
                      {errors.sixthSection?.description.message}
                    </p>
                  )}
                </div>
              </div>

              <Label>Items</Label>
              <div className="border p-2 rounded-md">
                {sixthSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => sixthSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Image</Label>
                        <Controller
                          name={`sixthSection.items.${index}.image`}
                          control={control}
                          rules={{ required: "Image is required" }}
                          render={({ field }) => (
                            <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.sixthSection?.items?.[index]?.image && (
                          <p className="text-red-500">
                            {errors.sixthSection?.items?.[index]?.image.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Alt Tag</Label>
                        <Input
                          type="text"
                          placeholder="Alt Tag"
                          {...register(`sixthSection.items.${index}.imageAlt`)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`sixthSection.items.${index}.title`)}
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
                    sixthSectionAppend({
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      title: "",
                      title_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Seventh Section</Label>

            <div className="p-5 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register(`seventhSection.title`, {
                      required: "Value is required",
                    })}
                  />
                  {errors.seventhSection?.title && (
                    <p className="text-red-500">
                      {errors.seventhSection?.title.message}
                    </p>
                  )}
                </div>
              </div>

              <Label>Items</Label>
              <div className="border p-2 rounded-md">
                {seventhSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
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
                        <Label className="font-bold">Alt Tag</Label>
                        <Input
                          type="text"
                          placeholder="Alt Tag"
                          {...register(
                            `seventhSection.items.${index}.imageAlt`
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`seventhSection.items.${index}.title`)}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Link</Label>
                        <Input
                          type="text"
                          placeholder="Link"
                          {...register(`seventhSection.items.${index}.link`)}
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
                    seventhSectionAppend({
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      title: "",
                      title_ar: "",
                      link: "",
                      link_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
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
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("bannerAlt_ar")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Page Title</Label>
                  <Input
                    type="text"
                    placeholder="Page Title"
                    {...register("pageTitle_ar")}
                  />
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>First Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Main Title</Label>
                  <Input
                    type="text"
                    placeholder="Main Title"
                    {...register("firstSection.mainTitle_ar")}
                  />
                  {errors.firstSection?.mainTitle_ar && (
                    <p className="text-red-500">
                      {errors.firstSection?.mainTitle_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Sub Title</Label>
                  <Input
                    type="text"
                    placeholder="Sub Title"
                    {...register("firstSection.subTitle_ar")}
                  />
                  {errors.firstSection?.subTitle_ar && (
                    <p className="text-red-500">
                      {errors.firstSection?.subTitle_ar.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Highlight</Label>
                  <Input
                    type="text"
                    placeholder="Highlight"
                    {...register("firstSection.highlight_ar")}
                  />
                  {errors.firstSection?.highlight_ar && (
                    <p className="text-red-500">
                      {errors.firstSection?.highlight_ar.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="firstSection.description_ar"
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

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="firstSection.image"
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
                  <p className="text-red-500">
                    {errors.firstSection?.image.message}
                  </p>
                )}
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("firstSection.imageAlt_ar")}
                />
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Second Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("secondSection.title_ar")}
                  />
                  {errors.secondSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.secondSection?.title_ar.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Description</Label>
                  <Controller
                    name="secondSection.description_ar"
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

                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Image</Label>
                  <Controller
                    name="secondSection.image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.secondSection?.image && (
                    <p className="text-red-500">
                      {errors.secondSection?.image.message}
                    </p>
                  )}
                  <Label className="font-bold">Alt Tag</Label>
                  <Input
                    type="text"
                    placeholder="Alt Tag"
                    {...register("secondSection.imageAlt_ar")}
                  />
                </div>

                <div>
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md flex flex-col gap-5">
                    {secondSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => secondSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Logo</Label>
                            <Controller
                              name={`secondSection.items.${index}.logo`}
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
                            {errors.secondSection?.items?.[index]?.logo && (
                              <p className="text-red-500">
                                {
                                  errors.secondSection?.items?.[index]?.logo
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
                                  `secondSection.items.${index}.logoAlt_ar`
                                )}
                              />
                              {errors.secondSection?.items?.[index]
                                ?.logoAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
                                      ?.logoAlt_ar.message
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
                                {...register(
                                  `secondSection.items.${index}.title_ar`
                                )}
                              />
                              {errors.secondSection?.items?.[index]
                                ?.title_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
                                      ?.title_ar.message
                                  }
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label className="font-bold">Description</Label>
                              <Controller
                                name={`secondSection.items.${index}.description_ar`}
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      addItem
                      onClick={() =>
                        secondSectionAppend({
                          title: "",
                          title_ar: "",
                          logo: "",
                          logoAlt: "",
                          logoAlt_ar: "",
                          description: "",
                          description_ar: "",
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
                  <Label className="font-bold">Items</Label>
                  <div className="border p-2 rounded-md flex flex-col gap-5">
                    {thirdSectionItems.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                      >
                        <div className="absolute top-2 right-2">
                          <RiDeleteBinLine
                            onClick={() => thirdSectionRemove(index)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
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
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.image
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
                                  `thirdSection.items.${index}.imageAlt_ar`
                                )}
                              />
                              {errors.thirdSection?.items?.[index]
                                ?.imageAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.thirdSection?.items?.[index]
                                      ?.imageAlt_ar.message
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
                                {...register(
                                  `thirdSection.items.${index}.title_ar`
                                )}
                              />
                              {errors.thirdSection?.items?.[index]
                                ?.title_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.thirdSection?.items?.[index]
                                      ?.title_ar.message
                                  }
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`thirdSection.items.${index}.description_ar`}
                              control={control}
                              render={({ field }) => (
                                <ReactQuill
                                  theme="snow"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="custom-quill"
                                />
                              )}
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
                        thirdSectionAppend({
                          title: "",
                          title_ar: "",
                          image: "",
                          imageAlt: "",
                          imageAlt_ar: "",
                          description: "",
                          description_ar: "",
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
            <Label main>History Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`historySection.title_ar`)}
                />
                {errors?.historySection?.title_ar && (
                  <p className="text-red-500">
                    {errors.historySection.title_ar.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-bold">Items</Label>
                <div className="border p-2 rounded-md flex flex-col gap-5">
                  {historySectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                    >
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => historySectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Image</Label>
                          <Controller
                            name={`historySection.items.${index}.image`}
                            control={control}
                            rules={{ required: "Image is required" }}
                            render={({ field }) => (
                              <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.historySection?.items?.[index]?.image && (
                            <p className="text-red-500">
                              {
                                errors.historySection?.items?.[index]?.image
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
                                `historySection.items.${index}.imageAlt_ar`
                              )}
                            />
                            {errors.historySection?.items?.[index]
                              ?.imageAlt_ar && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]
                                    ?.imageAlt_ar.message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Year</Label>
                            <Input
                              type="text"
                              placeholder="Year"
                              {...register(
                                `historySection.items.${index}.year_ar`
                              )}
                            />
                            {errors.historySection?.items?.[index]?.year_ar && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]?.year_ar
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Title"
                              {...register(
                                `historySection.items.${index}.title_ar`
                              )}
                            />
                            {errors.historySection?.items?.[index]
                              ?.title_ar && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]
                                    ?.title_ar.message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Textarea
                              placeholder="Description"
                              {...register(
                                `historySection.items.${index}.description_ar`
                              )}
                            />
                            {errors.historySection?.items?.[index]
                              ?.description_ar && (
                              <p className="text-red-500">
                                {
                                  errors.historySection?.items?.[index]
                                    ?.description_ar.message
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
                      historySectionAppend({
                        year: "",
                        year_ar: "",
                        title: "",
                        title_ar: "",
                        description: "",
                        description_ar: "",
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
                <div>
                  <Label className="text-sm font-bold">Description</Label>
                  <Controller
                    name="fifthSection.description_ar"
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

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name="fifthSection.image"
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
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("fifthSection.imageAlt_ar")}
                />
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Sixth Section</Label>

            <div className="p-5 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register(`sixthSection.title_ar`)}
                  />
                  {errors.sixthSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.sixthSection?.title_ar.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register(`sixthSection.description_ar`)}
                  />
                  {errors.sixthSection?.description_ar && (
                    <p className="text-red-500">
                      {errors.sixthSection?.description_ar.message}
                    </p>
                  )}
                </div>
              </div>

              <Label>Items</Label>
              <div className="border p-2 rounded-md">
                {sixthSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => sixthSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Image</Label>
                        <Controller
                          name={`sixthSection.items.${index}.image`}
                          control={control}
                          rules={{ required: "Image is required" }}
                          render={({ field }) => (
                            <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.sixthSection?.items?.[index]?.image && (
                          <p className="text-red-500">
                            {errors.sixthSection?.items?.[index]?.image.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Alt Tag</Label>
                        <Input
                          type="text"
                          placeholder="Alt Tag"
                          {...register(
                            `sixthSection.items.${index}.imageAlt_ar`
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <Label className="pl-3 font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`sixthSection.items.${index}.title_ar`)}
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
                    sixthSectionAppend({
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      title: "",
                      title_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>Seventh Section</Label>

            <div className="p-5 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register(`seventhSection.title_ar`)}
                  />
                  {errors.seventhSection?.title_ar && (
                    <p className="text-red-500">
                      {errors.seventhSection?.title_ar.message}
                    </p>
                  )}
                </div>
              </div>

              <Label>Items</Label>
              <div className="border p-2 rounded-md">
                {seventhSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
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
                        <Label className="font-bold">Alt Tag</Label>
                        <Input
                          type="text"
                          placeholder="Alt Tag"
                          {...register(
                            `seventhSection.items.${index}.imageAlt_ar`
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(
                            `seventhSection.items.${index}.title_ar`
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Link</Label>
                        <Input
                          type="text"
                          placeholder="Link"
                          {...register(`seventhSection.items.${index}.link_ar`)}
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
                    seventhSectionAppend({
                      image: "",
                      imageAlt: "",
                      imageAlt_ar: "",
                      title: "",
                      title_ar: "",
                      link: "",
                      link_ar: "",
                    })
                  }
                >
                  Add Item
                </Button>
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

export default AboutPage;
