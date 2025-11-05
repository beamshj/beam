"use client"

import { ImageUploader } from '@/components/ui/image-uploader'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ImageCard from '@/app/components/AdminGallery/ImageCard'
import Image from 'next/image';
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { toast } from 'sonner';



interface GalleryForm {
    images: string[];
}

const IndiGallery = () => {
    const router = useRouter();
    const { categoryId } = useParams();
    const { id } = useParams();
    const [reorderMode, setReorderMode] = useState(false);
    const { setValue } = useForm<GalleryForm>();



    const fetchGalleryData = async () => {
        try {
            const response = await fetch(`/api/admin/gallery/inside?galleryId=${id}&categoryId=${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setValue("images", data.data.images);
                setImageUrls(data.data.images);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching gallery data", error);
        }
    }

        const [imageUrls, setImageUrls] = useState<string[]>([]);
        const handleImageUpload = async (uploadedUrl: string) => {
            setImageUrls((prev) => [...prev, uploadedUrl]);
            setValue("images", [...imageUrls, uploadedUrl]);
        };
    
        const handleRemoveImage = (indexToRemove: number) => {
            setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
            setValue(
                "images",
                imageUrls.filter((_, index) => index !== indexToRemove)
            );
        };
    
    
        const getTaskPos = (id: string) => imageUrls.findIndex((item: string) => (item == id))
        const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;
    
            if (!over || active.id === over.id) return;
    
            const oldIndex = getTaskPos(active.id as string);
            const newIndex = getTaskPos(over.id as string);
    
            const newPosition = arrayMove(imageUrls, oldIndex, newIndex);
            setImageUrls(newPosition);
            setValue("images", newPosition);
        };



    const handleAddGallery = async () => {
        try {
            const response = await fetch(`/api/admin/gallery/inside?galleryId=${id}&categoryId=${categoryId}`, {
                method: "POST",
                body: JSON.stringify({images: imageUrls}),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push(`/admin/gallery/${id}`);
            }
        } catch (error) {
            console.log("Error in adding gallery", error);
        }
    }



    useEffect(() => {
        fetchGalleryData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2 p-5 rounded-md bg-white shadow-md'>
<div>
    <div className='flex justify-between items-center'>
        <Label className="block text-sm">Images</Label>
        <div className='flex gap-5'>
        <Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>
        </div>
    </div>
    <div className="mt-2">
        <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} multiple={true} />
    </div>




    {reorderMode && <div className="mt-4 grid grid-cols-3 gap-4">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={imageUrls} strategy={verticalListSortingStrategy}>
                {imageUrls.map((url, index) => (
                    <ImageCard key={url} url={url} index={index} handleRemoveImage={handleRemoveImage} id={url} />
                ))}
            </SortableContext>
        </DndContext>
    </div>}


    {!reorderMode && <div className="mt-4 grid grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
            <div key={index} className="relative h-40">
                <Image
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                    width={100}
                    height={100}
                />
                <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    ×
                </button>
            </div>
        ))}
    </div>}


    <Button type="button" disabled={imageUrls.length === 0 || reorderMode} onClick={() => handleAddGallery()} className='w-full text-white mt-5'>Save</Button>
</div>

</div>

        </div>
    )
}

export default IndiGallery