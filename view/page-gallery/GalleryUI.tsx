'use client';

import Gallery from '@/components/Gallery';
import { initialImages } from '@/config/data';
import { GalleryImage } from '@/model/GalleryPageDTO';
import { useState } from 'react';

type GalleryUIProps = {};

const GalleryUI = ({}: GalleryUIProps) => {
    // State to manage the images
    const [images, setImages] = useState<GalleryImage[]>(initialImages);

    // Function to delete an image by ID
    const onDelete = (id: string) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
    };

    // Function to reorder the images
    const onReorder = (newImages: GalleryImage[]) => {
        setImages(newImages);
    };

    return (
        <>
            <Gallery
                images={images}
                onDelete={onDelete}
                onReorder={onReorder}
            />
        </>
    );
};

export default GalleryUI;
