"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

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
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import PersonCard from "./PersonCard";

interface LeadershipTeamFormProps {
  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;
  pageTitle: string;
  pageTitle_ar: string;
  firstSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    items: {
      name: string;
      name_ar: string;
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      designation: string;
      designation_ar: string;
      description: string;
      description_ar: string;
    }[];
  };
  secondSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    items: {
      name: string;
      name_ar: string;
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      designation: string;
      designation_ar: string;
      description: string;
      description_ar: string;
    }[];
  };
}

const LeadershipTeamPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LeadershipTeamFormProps>();

  const [reorderMode, setReorderMode] = useState("");

  const {
    fields: firstSectionItems,
    append: firstSectionAppend,
    remove: firstSectionRemove,
    move: moveFirstSection,
  } = useFieldArray({
    control,
    name: "firstSection.items",
  });

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
    move: moveSecondSection,
  } = useFieldArray({
    control,
    name: "secondSection.items",
  });

  const handleAddLeadershipTeam = async (data: LeadershipTeamFormProps) => {
    try {
      const response = await fetch(`/api/admin/leadership-team`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding leadership team", error);
    }
  };

  const fetchLeadershipTeamData = async () => {
    try {
      const response = await fetch(`/api/admin/leadership-team`);
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
        setValue("firstSection.items", data.data.firstSection.items);
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching leadership team data", error);
    }
  };


  type ItemWithId = {
    id: string | number;
  };

  const createHandleDragEnd = <T extends ItemWithId>(
    items: T[],
    move: (from: number, to: number) => void
  ) => {
    const getItemPos = (id: string | number) =>
      items.findIndex((item) => item.id == id);

    return (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const originalPos = getItemPos(active.id);
      const newPos = getItemPos(over.id);

      if (originalPos !== -1 && newPos !== -1) {
        move(originalPos, newPos);
      }
    };
  };

  const handleFirstSectionDragEnd = createHandleDragEnd(
    firstSectionItems,
    moveFirstSection
  );

  const handleSecondSectionDragEnd = createHandleDragEnd(
    secondSectionItems,
    moveSecondSection
  );

  useEffect(() => {
    fetchLeadershipTeamData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleAddLeadershipTeam)}
      className="w-full grid grid-cols-2 gap-10"
    >
      {/* English Version */}
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
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("firstSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.firstSection?.title && (
                  <p className="text-red-500">
                    {errors.firstSection?.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Controller
                  name="firstSection.description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between my-2">
                  <Label className="font-bold">Items</Label>
                  <Button disabled={firstSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(reorderMode !== "" ? "" : "firstSection")}>{reorderMode ? "Done" : "Reorder"}</Button>
                </div>
                <div className="border p-2 rounded-md flex flex-col gap-5">

                  {reorderMode === "firstSection" &&

                    <DndContext collisionDetection={closestCorners} onDragEnd={handleFirstSectionDragEnd}>
                      <SortableContext items={firstSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                        {firstSectionItems?.map((item, index) => (
                          <PersonCard key={index} person={item} id={item.id} />
                        ))}
                      </SortableContext>
                    </DndContext>

                  }

                  {reorderMode == "" && firstSectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                    >
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => firstSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Image</Label>
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
                            <p className="text-red-500">
                              {
                                errors.firstSection?.items?.[index]?.image
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
                                `firstSection.items.${index}.imageAlt`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.firstSection?.items?.[index]?.imageAlt && (
                              <p className="text-red-500">
                                {
                                  errors.firstSection?.items?.[index]?.imageAlt
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
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(`firstSection.items.${index}.name`, {
                                required: "Name is required",
                              })}
                            />
                            {errors.firstSection?.items?.[index]?.name && (
                              <p className="text-red-500">
                                {
                                  errors.firstSection?.items?.[index]?.name
                                    .message
                                }
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Designation</Label>
                            <Input
                              type="text"
                              placeholder="Designation"
                              {...register(
                                `firstSection.items.${index}.designation`,
                                {
                                  required: "Designation is required",
                                }
                              )}
                            />
                            {errors.firstSection?.items?.[index]
                              ?.designation && (
                                <p className="text-red-500">
                                  {
                                    errors.firstSection?.items?.[index]
                                      ?.designation.message
                                  }
                                </p>
                              )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`firstSection.items.${index}.description`}
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
                    </div>
                  ))}
                </div>
                {reorderMode == "" && <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      firstSectionAppend({
                        name: "",
                        name_ar: "",
                        image: "",
                        imageAlt: "",
                        imageAlt_ar: "",
                        designation: "",
                        designation_ar: "",
                        description: "",
                        description_ar: "",
                      })
                    }
                  >
                    Add Item
                  </Button>
                </div>}
              </div>
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
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between my-2">
                  <Label className="font-bold">Items</Label>
                  <Button disabled={secondSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(reorderMode !== "" ? "" : "secondSection")}>{reorderMode ? "Done" : "Reorder"}</Button>
                </div>
                <div className="border p-2 rounded-md flex flex-col gap-5">

                  {reorderMode === "secondSection" &&

                    <DndContext collisionDetection={closestCorners} onDragEnd={handleSecondSectionDragEnd}>
                      <SortableContext items={secondSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                        {secondSectionItems?.map((item, index) => (
                          <PersonCard key={index} person={item} id={item.id} />
                        ))}
                      </SortableContext>
                    </DndContext>

                  }

                  {reorderMode == "" && secondSectionItems.map((field, index) => (
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
                          <Label className="font-bold">Image</Label>
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
                            <p className="text-red-500">
                              {
                                errors.secondSection?.items?.[index]?.image
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
                                `secondSection.items.${index}.imageAlt`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.secondSection?.items?.[index]?.imageAlt && (
                              <p className="text-red-500">
                                {
                                  errors.secondSection?.items?.[index]?.imageAlt
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
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(
                                `secondSection.items.${index}.name`,
                                {
                                  required: "Name is required",
                                }
                              )}
                            />
                            {errors.secondSection?.items?.[index]?.name && (
                              <p className="text-red-500">
                                {
                                  errors.secondSection?.items?.[index]?.name
                                    .message
                                }
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Designation</Label>
                            <Input
                              type="text"
                              placeholder="Designation"
                              {...register(
                                `secondSection.items.${index}.designation`,
                                {
                                  required: "Designation is required",
                                }
                              )}
                            />
                            {errors.secondSection?.items?.[index]
                              ?.designation && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
                                      ?.designation.message
                                  }
                                </p>
                              )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`secondSection.items.${index}.description`}
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
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      secondSectionAppend({
                        name: "",
                        name_ar: "",
                        image: "",
                        imageAlt: "",
                        imageAlt_ar: "",
                        designation: "",
                        designation_ar: "",
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

      {/* Arabic Version */}
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
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("firstSection.title_ar")}
                />
                {errors.firstSection?.title_ar && (
                  <p className="text-red-500">
                    {errors.firstSection?.title_ar.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Controller
                  name="firstSection.description_ar"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <Label className="font-bold">Items</Label>
                <div className="border p-2 rounded-md flex flex-col gap-5">
                  {firstSectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                    >
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => firstSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Image</Label>
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
                            <p className="text-red-500">
                              {
                                errors.firstSection?.items?.[index]?.image
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
                                `firstSection.items.${index}.imageAlt_ar`
                              )}
                            />
                            {errors.firstSection?.items?.[index]
                              ?.imageAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.firstSection?.items?.[index]
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
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(
                                `firstSection.items.${index}.name_ar`
                              )}
                            />
                            {errors.firstSection?.items?.[index]?.name_ar && (
                              <p className="text-red-500">
                                {
                                  errors.firstSection?.items?.[index]?.name_ar
                                    .message
                                }
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Designation</Label>
                            <Input
                              type="text"
                              placeholder="Designation"
                              {...register(
                                `firstSection.items.${index}.designation_ar`
                              )}
                            />
                            {errors.firstSection?.items?.[index]
                              ?.designation_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.firstSection?.items?.[index]
                                      ?.designation_ar.message
                                  }
                                </p>
                              )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`firstSection.items.${index}.description_ar`}
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
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      firstSectionAppend({
                        name: "",
                        name_ar: "",
                        image: "",
                        imageAlt: "",
                        imageAlt_ar: "",
                        designation: "",
                        designation_ar: "",
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
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
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
                          <Label className="font-bold">Image</Label>
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
                            <p className="text-red-500">
                              {
                                errors.secondSection?.items?.[index]?.image
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
                                `secondSection.items.${index}.imageAlt_ar`
                              )}
                            />
                            {errors.secondSection?.items?.[index]
                              ?.imageAlt_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
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
                            <Label className="font-bold">Name</Label>
                            <Input
                              type="text"
                              placeholder="Name"
                              {...register(
                                `secondSection.items.${index}.name_ar`
                              )}
                            />
                            {errors.secondSection?.items?.[index]?.name_ar && (
                              <p className="text-red-500">
                                {
                                  errors.secondSection?.items?.[index]?.name_ar
                                    .message
                                }
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Designation</Label>
                            <Input
                              type="text"
                              placeholder="Designation"
                              {...register(
                                `secondSection.items.${index}.designation_ar`
                              )}
                            />
                            {errors.secondSection?.items?.[index]
                              ?.designation_ar && (
                                <p className="text-red-500">
                                  {
                                    errors.secondSection?.items?.[index]
                                      ?.designation_ar.message
                                  }
                                </p>
                              )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label className="font-bold">Description</Label>
                            <Controller
                              name={`secondSection.items.${index}.description_ar`}
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
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      secondSectionAppend({
                        name: "",
                        name_ar: "",
                        image: "",
                        imageAlt: "",
                        imageAlt_ar: "",
                        designation: "",
                        designation_ar: "",
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

export default LeadershipTeamPage;
