"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";

interface ManagersMessageFormProps {
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
    firstDescription: string;
    firstDescription_ar: string;
    secondDescription: string;
    secondDescription_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    name: string;
    name_ar: string;
    designation: string;
    designation_ar: string;
  };
}

const ManagersMessagePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ManagersMessageFormProps>();

  const handleAddManagersMessage = async (data: ManagersMessageFormProps) => {
    try {
      const response = await fetch(`/api/admin/managers-message`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding managers message", error);
    }
  };

  const fetchManagersMessageData = async () => {
    try {
      const response = await fetch(`/api/admin/managers-message`);
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
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching managers message data", error);
    }
  };

  useEffect(() => {
    fetchManagersMessageData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleAddManagersMessage)}
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
          <Label main>First Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Textarea
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
              <div>
                <Label className="text-sm font-bold">First Description</Label>
                <Controller
                  name="firstSection.firstDescription"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Second Description</Label>
                <Controller
                  name="firstSection.secondDescription"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
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
            <div className="flex flex-col gap-1">
              <Label className="font-bold">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                {...register("firstSection.name", {
                  required: "Name is required",
                })}
              />
              {errors.firstSection?.name && (
                <p className="text-red-500">
                  {errors.firstSection?.name.message}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm font-bold">Designation</Label>
              <Controller
                name="firstSection.designation"
                control={control}
                rules={{ required: "Designation is required" }}
                render={({ field }) => {
                  return (
                    <Textarea value={field.value} onChange={field.onChange} />
                  );
                }}
              />
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
                <Textarea
                  placeholder="Title"
                  {...register("firstSection.title_ar")}
                />
                {errors.firstSection?.title_ar && (
                  <p className="text-red-500">
                    {errors.firstSection?.title_ar.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-bold">First Description</Label>
                <Controller
                  name="firstSection.firstDescription_ar"
                  control={control}
                  // rules={{ required: "Description is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Second Description</Label>
                <Controller
                  name="firstSection.secondDescription_ar"
                  control={control}
                  // rules={{ required: "Description is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
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
            <div className="flex flex-col gap-1">
              <Label className="font-bold">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                {...register("firstSection.name_ar")}
              />
              {errors.firstSection?.name_ar && (
                <p className="text-red-500">
                  {errors.firstSection?.name_ar.message}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm font-bold">Designation</Label>
              <Controller
                name="firstSection.designation_ar"
                control={control}
                // rules={{ required: "Designation is required" }}
                render={({ field }) => {
                  return (
                    <Textarea value={field.value} onChange={field.onChange} />
                  );
                }}
              />
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

export default ManagersMessagePage;
