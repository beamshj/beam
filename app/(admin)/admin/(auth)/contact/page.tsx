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

interface ContactFormProps {
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
    mainTitle: string;
    mainTitle_ar: string;
    subTitle: string;
    subTitle_ar: string;
    description: string;
    description_ar: string;
    map: string;
    phone: string;
    phone_ar: string;
    email: string;
    address: string;
    address_ar: string;
  };
  secondSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
  }
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactFormProps>();

  const handleAddContact = async (data: ContactFormProps) => {
    try {
      const response = await fetch(`/api/admin/contact`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding contact", error);
    }
  };

  const fetchContactData = async () => {
    try {
      const response = await fetch(`/api/admin/contact`);
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
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching contact data", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleAddContact)}
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
              <div>
                <Label className="text-sm font-bold">Description</Label>
                <Controller
                  name="firstSection.description"
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
                <Label className="text-sm font-bold">Address</Label>
                <Controller
                  name="firstSection.address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Phone</Label>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...register("firstSection.phone", {
                    required: "Phone is required",
                  })}
                />
                {errors.firstSection?.phone && (
                  <p className="text-red-500">
                    {errors.firstSection?.phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Email</Label>
                <Input
                  type="text"
                  placeholder="Email"
                  {...register("firstSection.email", {
                    required: "Email is required",
                  })}
                />
                {errors.firstSection?.email && (
                  <p className="text-red-500">
                    {errors.firstSection?.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Map</Label>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...register("firstSection.map", {
                    required: "Map is required",
                  })}
                />
                {errors.firstSection?.map && (
                  <p className="text-red-500">
                    {errors.firstSection?.map.message}
                  </p>
                )}
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
              <div>
                <Label className="text-sm font-bold">Description</Label>
                <Controller
                  name="secondSection.description"
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
              <div>
                <Label className="text-sm font-bold">Description</Label>
                <Controller
                  name="firstSection.description_ar"
                  control={control}
                  //   rules={{ required: "Description is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Address</Label>
                <Controller
                  name="firstSection.address_ar"
                  control={control}
                  //   rules={{ required: "Address is required" }}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Phone</Label>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...register("firstSection.phone_ar")}
                />
                {errors.firstSection?.phone_ar && (
                  <p className="text-red-500">
                    {errors.firstSection?.phone_ar.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Email</Label>
                <Input
                  type="text"
                  placeholder="Email"
                  {...register("firstSection.email", {
                    required: "Email is required",
                  })}
                />
                {errors.firstSection?.email && (
                  <p className="text-red-500">
                    {errors.firstSection?.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Map</Label>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...register("firstSection.map", {
                    required: "Map is required",
                  })}
                />
                {errors.firstSection?.map && (
                  <p className="text-red-500">
                    {errors.firstSection?.map.message}
                  </p>
                )}
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
              </div>
              <div>
                <Label className="text-sm font-bold">Description</Label>
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

export default ContactPage;
