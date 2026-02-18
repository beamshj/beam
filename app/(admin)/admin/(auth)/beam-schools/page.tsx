"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SchoolCard from "./SchoolCard";

interface CurrentOpeningsPageProps {
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
  };
}

export default function CurrentOpenings() {
  const [location, setLocation] = useState<string>("");
  const [location_ar, setLocation_ar] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [category_ar, setCategory_ar] = useState("");
  const [schoolList, setSchoolList] = useState<
    { _id: string; title: string; title_ar: string }[]
  >([]);
  const [locationList, setLocationList] = useState<
    { _id: string; name: string; name_ar: string }[]
  >([]);
  const [categoryList, setCategoryList] = useState<
    { _id: string; name: string; name_ar: string }[]
  >([]);

  const router = useRouter();
  const [reorderMode, setReorderMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CurrentOpeningsPageProps>();

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/admin/beam-schools/category", {
        method: "POST",
        body: JSON.stringify({ name: category, name_ar: category_ar }),
      });
      if (response.ok) {
        const data = await response.json();
        setCategory("");
        setCategory_ar("");
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding project type", error);
    }
  };

  const handleFetchCategory = async () => {
    try {
      const response = await fetch("/api/admin/beam-schools/category");
      if (response.ok) {
        const data = await response.json();
        setCategoryList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  };

  const handleEditCategory = async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/beam-schools/category?id=${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name: category, name_ar: category_ar }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
        setCategory("");
        setCategory_ar("");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing sector", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/beam-schools/category?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting sector", error);
    }
  };

  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/beam-schools/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/admin/beam-schools/location", {
        method: "POST",
        body: JSON.stringify({ name: location, name_ar: location_ar }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocation("");
        setLocation_ar("");
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  };

  const handleEditLocation = async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/beam-schools/location?id=${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name: location, name_ar: location_ar }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/beam-schools/location?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  };

  const handleDeleteSchool = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/beam-schools?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchSchools();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  };

  const onSubmit = async (data: CurrentOpeningsPageProps) => {
    try {
      const response = await fetch(`/api/admin/beam-schools`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in submitting details", error);
    }
  };

  const handleFetchSchools = async () => {
    try {
      const response = await fetch("/api/admin/beam-schools");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaTitle_ar", data.data.metaTitle_ar);
        setValue("metaDescription", data.data.metaDescription);
        setValue("metaDescription_ar", data.data.metaDescription_ar);
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("bannerAlt_ar", data.data.bannerAlt_ar);
        setValue("pageTitle", data.data.pageTitle);
        setValue("pageTitle_ar", data.data.pageTitle_ar);
        setValue("firstSection", data.data.firstSection);
        setSchoolList(data.data.schools);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching school details", error);
    }
  };

  const getTaskPos = (id: number | string) => schoolList.findIndex((item: { _id: string }) => (item._id == id))
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSchoolList((schoolList: { _id: string; title: string; title_ar: string }[]) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(schoolList, originalPos, newPos);
    });
  };


  const confirmPosition = async () => {
    setReorderMode(!reorderMode);

    const updatedSchools = schoolList.map((school) => ({
      ...school,
    }));

    setSchoolList(updatedSchools);

    const formData = new FormData()
    formData.append('schools', JSON.stringify(updatedSchools))
    const response = await fetch(`/api/admin/beam-schools/reorder`, {
      method: "POST",
      body: formData
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        alert(data.message)
      }
    }
  };

  useEffect(() => {
    handleFetchCategory();
    handleFetchLocation();
    handleFetchSchools();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* English Version */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-10"
      >
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
            <Label className="" main>
              First Section
            </Label>
            <div className="p-5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className=" font-bold">Title</Label>
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
                  <Label className=" font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("firstSection.description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.firstSection?.description && (
                    <p className="text-red-500">
                      {errors.firstSection?.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaTitle")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Description</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaDescription")}
                />
              </div>
            </div>
          </AdminItemContainer>
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
            <Label className="" main>
              First Section
            </Label>
            <div className="p-5 flex flex-col gap-2">
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
                  <Label className=" font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register("firstSection.description_ar")}
                  />
                  {errors.firstSection?.description_ar && (
                    <p className="text-red-500">
                      {errors.firstSection?.description_ar.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaTitle_ar")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Description</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaDescription_ar")}
                />
              </div>
            </div>
          </AdminItemContainer>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-5">
          <Button
            type="submit"
            className="cursor-pointer text-white text-[16px] w-full"
          >
            Submit
          </Button>
        </div>
      </form>

      <div className="h-screen grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 h-screen">
          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Category</Label>
              <Dialog>
                <DialogTrigger
                  className="bg-primary text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setCategory("");
                    setCategory_ar("");
                  }}
                >
                  Add Category
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                      <Input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Category (Arabic)"
                        value={category_ar}
                        onChange={(e) => setCategory_ar(e.target.value)}
                        className="mt-2"
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose
                    className="bg-black text-white px-2 py-1 rounded-md"
                    onClick={handleAddCategory}
                  >
                    Save
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {categoryList.map((item) => (
                <div
                  className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  key={item._id}
                >
                  <div className="flex flex-col gap-2">
                    <span>{item.name}</span>
                    <span>{item.name_ar || "—"}</span>
                  </div>

                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => {
                          setCategory(item.name);
                          setCategory_ar(item.name_ar);
                        }}
                      >
                        <MdEdit />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            <Input
                              type="text"
                              placeholder="Category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            />

                            <Input
                              type="text"
                              placeholder="Category (Arabic)"
                              value={category_ar}
                              onChange={(e) => setCategory_ar(e.target.value)}
                              className="mt-2"
                            />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose
                          className="bg-black text-white px-2 py-1 rounded-md"
                          onClick={() => handleEditCategory(item._id)}
                        >
                          Save
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <MdDelete />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                            No
                          </DialogClose>
                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={() => handleDeleteCategory(item._id)}
                          >
                            Yes
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Location</Label>
              <Dialog>
                <DialogTrigger
                  className="bg-primary text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setLocation("");
                    setLocation_ar("");
                  }}
                >
                  Add Location
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                      <Input
                        type="text"
                        placeholder="Location Name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />

                      <Input
                        type="text"
                        placeholder="Location Name (Arabic)"
                        value={location_ar}
                        onChange={(e) => setLocation_ar(e.target.value)}
                        className="mt-2"
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose
                    className="bg-black text-white px-2 py-1 rounded-md"
                    onClick={handleAddLocation}
                  >
                    Save
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <div className="h-full">
              <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
                {locationList.map((item) => (
                  <div
                    className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    key={item._id}
                  >
                    <div className="flex flex-col gap-2">
                      <span>{item.name}</span>
                      <span>{item.name_ar || "—"}</span>
                    </div>
                    <div className="flex gap-5">
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            setLocation(item.name);
                            setLocation_ar(item.name_ar);
                          }}
                        >
                          <MdEdit />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Location</DialogTitle>
                            <DialogDescription>
                              <Input
                                type="text"
                                placeholder="Location Name"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                              <Input
                                type="text"
                                placeholder="Location Name (Arabic)"
                                value={location_ar}
                                onChange={(e) => setLocation_ar(e.target.value)}
                                className="mt-2"
                              />
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={() => handleEditLocation(item._id)}
                          >
                            Save
                          </DialogClose>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger>
                          <MdDelete />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                              No
                            </DialogClose>
                            <DialogClose
                              className="bg-black text-white px-2 py-1 rounded-md"
                              onClick={() => handleDeleteLocation(item._id)}
                            >
                              Yes
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Schools</Label>
            <div className="flex gap-2">
              <Button type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
              {!reorderMode && <Button onClick={() => router.push("/admin/beam-schools/add")}>
                Add School
              </Button>}
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">

            {reorderMode &&

              <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={schoolList.map((school) => school._id)} strategy={verticalListSortingStrategy}>
                  {schoolList?.map((school, index) => (
                    <SchoolCard key={index} school={school} id={school._id} />
                  ))}
                </SortableContext>
              </DndContext>

            }

            {!reorderMode && schoolList.map((item) => (
              <div
                className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                key={item._id}
              >
                <div className="flex flex-col gap-2">
                  <span>{item.title}</span>
                  <span>{item.title_ar || "—"}</span>
                </div>
                <div className="flex gap-5">
                  <MdEdit
                    onClick={() =>
                      router.push(`/admin/beam-schools/edit/${item._id}`)
                    }
                  />

                  <Dialog>
                    <DialogTrigger>
                      <MdDelete />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                          No
                        </DialogClose>
                        <DialogClose
                          className="bg-black text-white px-2 py-1 rounded-md"
                          onClick={() => handleDeleteSchool(item._id)}
                        >
                          Yes
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
