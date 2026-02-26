"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImageUploader } from "@/components/ui/image-uploader";

export interface FooterProps {
  _id?: string;

  footerTitle?: string;
  footerTitle_ar?: string;

  addressSection?: {
    lineOne?: string;
    lineOne_ar?: string;
    email?: string;
    lineThree?: string;
    lineThree_ar?: string;
    lineFour?: string;
    lineFour_ar?: string;
  };

  quickLinksSection?: {
    title?: string;
    title_ar?: string;
    quickLinks?: {
      name?: string;
      name_ar?: string;
      link?: string;
    }[];
  };

  socialLinks?: {
    links?: {
      icon?: string;
      iconAlt?: string;
      link?: string;
    }[];
  };
}

const FooterPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FooterProps>();

  const emailValue = watch("addressSection.email");

  const {
    fields: quickLinksItems,
    append: quickLinksAppend,
    remove: quickLinksRemove,
  } = useFieldArray({
    control,
    name: "quickLinksSection.quickLinks",
  });

  const {
    fields: socialLinksItems,
    append: socialLinksAppend,
    remove: socialLinksRemove,
  } = useFieldArray({
    control,
    name: "socialLinks.links",
  });

  const handleAddFooter = async (data: FooterProps) => {
    try {
      const response = await fetch(`/api/admin/footer`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error in adding footer", error);
    }
  };

  const fetchFooterData = async () => {
    try {
      const response = await fetch(`/api/admin/footer`);
      if (response.ok) {
        const data = await response.json();
        setValue("footerTitle", data.data.footerTitle);
        setValue("footerTitle_ar", data.data.footerTitle_ar);
        setValue("addressSection", data.data.addressSection);
        setValue("quickLinksSection", data.data.quickLinksSection);
        setValue(
          "quickLinksSection.quickLinks",
          data.data.quickLinksSection.quickLinks,
        );
        setValue("socialLinks.links", data.data.socialLinks.links);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching footer data", error);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleAddFooter)}
      className="w-full grid grid-cols-2 gap-10"
    >
      {/* English Version */}
      <div className="flex flex-col gap-5">
        <AdminItemContainer>
          <Label main>Footer Title</Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Footer Title"
                {...register("footerTitle")}
              />
            </div>
          </div>
        </AdminItemContainer>
        <AdminItemContainer>
          <Label main>Address Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Line One</Label>
                <Input
                  type="text"
                  placeholder="Line One"
                  {...register("addressSection.lineOne")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("addressSection.email")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Line Three</Label>
                <Input
                  type="text"
                  placeholder="Line Three"
                  {...register("addressSection.lineThree")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Line Four</Label>
                <Input
                  type="text"
                  placeholder="Line Four"
                  {...register("addressSection.lineFour")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>
      </div>

      {/* Arabic Version */}
      <div className="flex flex-col gap-5">
        <AdminItemContainer>
          <Label main>Footer Title</Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Footer Title"
                {...register("footerTitle_ar")}
              />
            </div>
          </div>
        </AdminItemContainer>
        <AdminItemContainer>
          <Label main>Address Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Line One</Label>
                <Input
                  type="text"
                  placeholder="Line One"
                  {...register("addressSection.lineOne_ar")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Email</Label>
                <Input
                  type="email"
                  disabled
                  placeholder="Email"
                  value={emailValue || ""}
                  readOnly
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Line Three</Label>
                <Input
                  type="text"
                  placeholder="Line Three"
                  {...register("addressSection.lineThree_ar")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Line Four</Label>
                <Input
                  type="text"
                  placeholder="Line Four"
                  {...register("addressSection.lineFour_ar")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>
      </div>

      <div className="col-span-2">
        <AdminItemContainer>
          <Label main>Social Links Section</Label>

          {/* Items */}
          <div className="px-5 pb-5 flex flex-col gap-5">
            <Label className="font-bold">Items</Label>

            <div className="border p-5 rounded-md flex flex-col gap-6">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {socialLinksItems.map((field, index) => (
    <div
      key={field.id}
      className="relative border rounded-md p-5 flex flex-col gap-4"
    >
      {/* Delete */}
      <div className="absolute top-2 right-2">
        <RiDeleteBinLine
          onClick={() => socialLinksRemove(index)}
          className="cursor-pointer text-red-600"
        />
      </div>

      {/* Image */}
      <div className="flex flex-col gap-2">
        <Label className="font-bold">Image</Label>
        <Controller
          name={`socialLinks.links.${index}.icon`}
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Alt */}
      <div className="flex flex-col gap-2">
        <Label className="font-bold">Alt</Label>
        <Input
          {...register(`socialLinks.links.${index}.iconAlt`)}
        />
      </div>

      {/* Link */}
      <div className="flex flex-col gap-2">
        <Label className="font-bold">Link</Label>
        <Input
          {...register(`socialLinks.links.${index}.link`)}
        />
      </div>
    </div>
  ))}
</div>


            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() =>
                  socialLinksAppend({
                    icon: "",
                    iconAlt: "",
                    link: "",
                  })
                }
              >
                Add Item
              </Button>
            </div>
          </div>
        </AdminItemContainer>
      </div>
      <div className="col-span-2">
        <AdminItemContainer>
          <Label main>Quick Links Section</Label>

          {/* Section Titles */}
          <div className="p-5 grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title (English)</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("quickLinksSection.title")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title (Arabic)</Label>
              <Input
                type="text"
                placeholder="Title Arabic"
                {...register("quickLinksSection.title_ar")}
              />
            </div>
          </div>

          {/* Items */}
          <div className="px-5 pb-5 flex flex-col gap-5">
            <Label className="font-bold">Items</Label>

            <div className="border p-5 rounded-md flex flex-col gap-6">
              {quickLinksItems.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-3 gap-5 relative border-b pb-6 last:border-b-0"
                >
                  {/* Delete */}
                  <div className="absolute top-2 right-2">
                    <RiDeleteBinLine
                      onClick={() => quickLinksRemove(index)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>

                  {/* English */}
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Name (EN)</Label>
                    <Input
                      {...register(
                        `quickLinksSection.quickLinks.${index}.name`,
                      )}
                    />
                  </div>

                  {/* Arabic */}
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Name (AR)</Label>
                    <Input
                      {...register(
                        `quickLinksSection.quickLinks.${index}.name_ar`,
                      )}
                    />
                  </div>

                  {/* Link */}
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Link</Label>
                    <Input
                      {...register(
                        `quickLinksSection.quickLinks.${index}.link`,
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                addItem
                onClick={() =>
                  quickLinksAppend({
                    name: "",
                    name_ar: "",
                    link: "",
                  })
                }
              >
                Add Item
              </Button>
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

export default FooterPage;
