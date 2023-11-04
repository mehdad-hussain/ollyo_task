'use client';

import { useState } from 'react';
import Gallery from '@/components/Gallery';
import { initialImages } from '@/config/data';
import { GalleryImage } from '@/model/GalleryPageDTO';

type GalleryUIProps = {};

const GalleryUI = ({ }: GalleryUIProps) => {
    const [images, setImages] = useState<GalleryImage[]>(initialImages);

    // Function to delete selected images
    const onDelete = (ids: string[]) => {
        const updatedImages = images.filter((image) => !ids.includes(image.id));
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
