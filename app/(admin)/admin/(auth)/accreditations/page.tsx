"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import AdminItemContainer from '@/app/components/Common/AdminItemContainer';
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AccreditationCard from "./SchoolCard";


interface AccreditationPageProps {
  metaTitle: string;
  metaDescription: string;
  metaTitle_ar: string;
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
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  },
}



export default function Accreditation() {

  const [category, setCategory] = useState<string>("");
  const [categoryArabic, setCategoryArabic] = useState<string>("");
  const [accreditationsList, setAccreditationsList] = useState<{ _id: string, title: string }[]>([]);
  const [categoryList, setCategoryList] = useState<{ _id: string, name: string, name_ar: string }[]>([]);

  const router = useRouter();
  const [reorderMode, setReorderMode] = useState(false);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AccreditationPageProps>();



  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/admin/accreditations/category", {
        method: "POST",
        body: JSON.stringify({ name: category, name_ar: categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        setCategory("");
        setCategoryArabic("");
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding category", error);
    }
  }


  const handleFetchCategory = async () => {
    try {
      const response = await fetch("/api/admin/accreditations/category");
      if (response.ok) {
        const data = await response.json();
        setCategoryList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching category", error);
    }
  }

  const handleEditCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/accreditations/category?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: category, name_ar: categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
        setCategory("");
        setCategoryArabic("");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing category", error);
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/accreditations/category?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting category", error);
    }
  }



  const handleDeleteAccreditation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/accreditations?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchAccreditations();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting blog", error);
    }
  }

  const onSubmit = async (data: AccreditationPageProps) => {
    try {
      const response = await fetch(`/api/admin/accreditations`, {
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
  }

  const handleFetchAccreditations = async () => {
    try {
      const response = await fetch("/api/admin/accreditations");
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("pageTitle", data.data.pageTitle);
        setValue("firstSection", data.data.firstSection)
        setAccreditationsList(data.data.categories.flatMap((category: { accreditations: { _id: string; }[]; }) => category.accreditations));
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching accreditation details", error);
    }
  }


  const getTaskPos = (id: number | string) => accreditationsList.findIndex((item: { _id: string }) => (item._id == id))
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setAccreditationsList((accreditationsList: { _id: string; title: string }[]) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(accreditationsList, originalPos, newPos);
    });
  };


  const confirmPosition = async () => {
    setReorderMode(!reorderMode);

    const updatedAccreditations = accreditationsList.map((accreditation) => ({
      ...accreditation,
    }));

    setAccreditationsList(updatedAccreditations);

    const formData = new FormData()
    formData.append('accreditations', JSON.stringify(updatedAccreditations))
    const response = await fetch(`/api/admin/accreditations/reorder`, {
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
    handleFetchAccreditations();
  }, [])


  return (
    <div className="flex flex-col gap-5">


      <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-10'>


        {/*English Version */}
        <div className="flex flex-col gap-5">
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
            <Label className="" main>First Section</Label>
            <div className='p-5 rounded-md grid grid-cols-1 gap-5'>
              <div>
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
                {errors?.firstSection?.image && (
                  <p className="text-red-500">{errors.firstSection.image.message}</p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Alt Tag</Label>
                  <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt")} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Title</Label>
                  <Input type='text' placeholder='Title' {...register("firstSection.title")} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Description</Label>
                  <Textarea placeholder='Description' {...register("firstSection.description")} />
                </div>
              </div>
            </div>
          </AdminItemContainer>


          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className='flex flex-col gap-2'>
                <Label className='font-bold'>Title</Label>
                <Input type='text' placeholder='' {...register("metaTitle")} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label className='font-bold'>Description</Label>
                <Input type='text' placeholder='' {...register("metaDescription")} />
              </div>
            </div>
          </AdminItemContainer>

          {/* <div className='flex justify-center mt-5'>
                                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                                </div> */}

        </div>


        {/*Arabic Version */}
        <div className="flex flex-col gap-5">
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
                  <Input type='text' placeholder='Alt Tag' {...register("bannerAlt_ar")} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Page Title</Label>
                  <Input type='text' placeholder='Page Title' {...register("pageTitle_ar")} />
                </div>
              </div>
            </div>
          </AdminItemContainer>


          <AdminItemContainer>
            <Label className="" main>First Section</Label>
            <div className='p-5 rounded-md grid grid-cols-1 gap-5'>
              <div>
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
                {errors?.firstSection?.image && (
                  <p className="text-red-500">{errors.firstSection.image.message}</p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Alt Tag</Label>
                  <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt_ar")} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Title</Label>
                  <Input type='text' placeholder='Title' {...register("firstSection.title_ar")} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='font-bold'>Description</Label>
                  <Textarea placeholder='Description' {...register("firstSection.description_ar")} />
                </div>
              </div>
            </div>
          </AdminItemContainer>


          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className='flex flex-col gap-2'>
                <Label className='font-bold'>Title</Label>
                <Input type='text' placeholder='' {...register("metaTitle_ar")} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label className='font-bold'>Description</Label>
                <Input type='text' placeholder='' {...register("metaDescription_ar")} />
              </div>
            </div>
          </AdminItemContainer>



        </div>

        <div className='w-full col-span-2'>
          <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
        </div>

      </form>


      <div className="h-screen grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-2 h-screen">

          <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Category</Label>
              <Dialog>
                <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => { setCategory(""); setCategoryArabic("") }}>Add Category</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                      <Label>Category Name(English)</Label>
                      <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

                      <Label>Category Name(Arabic)</Label>
                      <Input type="text" placeholder="Category" value={categoryArabic} onChange={(e) => setCategoryArabic(e.target.value)} />

                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {categoryList.map((item) => (
                <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                  <div className="text-[16px]">
                    {item.name}
                  </div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger onClick={() => { setCategory(item.name); setCategoryArabic(item.name_ar) }}><MdEdit /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            <Label>Category Name(English)</Label>
                            <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

                            <Label>Category Name(Arabic)</Label>
                            <Input type="text" placeholder="Category" value={categoryArabic} onChange={(e) => setCategoryArabic(e.target.value)} />

                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                      </DialogContent>

                    </Dialog>



                    <Dialog>
                      <DialogTrigger><MdDelete /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure? This will delete all the blogs in the category</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteCategory(item._id)}>Yes</DialogClose>
                        </div>

                      </DialogContent>

                    </Dialog>

                  </div>
                </div>
              ))}

            </div>
          </div>


        </div>

        <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Accreditations</Label>
            <div className="flex gap-2">
              <Button type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
              {!reorderMode && <Button onClick={() => router.push("/admin/accreditations/add")}>Add Accreditation</Button>}
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">

            {reorderMode &&

              <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={accreditationsList.map((item) => item._id)} strategy={verticalListSortingStrategy}>
                  {accreditationsList?.map((item, index) => (
                    <AccreditationCard key={index} accreditation={item} id={item._id} />
                  ))}
                </SortableContext>
              </DndContext>

            }

            {!reorderMode && accreditationsList !== null && accreditationsList?.length > 0 && accreditationsList?.map((item) => (
              <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                <div className="text-[16px]">
                  {item.title}
                </div>
                <div className="flex gap-5">
                  <MdEdit onClick={() => router.push(`/admin/accreditations/edit/${item._id}`)} />

                  <Dialog>
                    <DialogTrigger><MdDelete /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteAccreditation(item._id)}>Yes</DialogClose>
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
