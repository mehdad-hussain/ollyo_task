'use client';

import { GalleryImage } from '@/model/GalleryPageDTO';
import Image from 'next/image';
import { useState } from 'react';

type GalleryProps = {
    images: GalleryImage[];
    onDelete: (id: string) => void;
    onReorder: (images: any[]) => void;
};

const Gallery = ({ images, onDelete, onReorder }: GalleryProps) => {
    const [draggedImage, setDraggedImage] = useState<GalleryImage | null>(null);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        // Set the dragged image when the drag starts
        setDraggedImage(images[index]);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (!draggedImage) return;

        // Reorder the images while dragging
        const newImages = [...images];
        newImages.splice(images.indexOf(draggedImage), 1);
        newImages.splice(index, 0, draggedImage);
        onReorder(newImages);
    };

    const onDrop = (index: number) => {
        // Reset the dragged image when dropping
        setDraggedImage(null);
    };

    const setFeatureImage = (imageId: string) => {
        // Mark an image as the featured image
        const updatedImages = images.map((image) => ({
            ...image,
            isFeatured: image.id === imageId,
        }));
        onReorder(updatedImages);
    };

    return (
        <>
            <div className="gallery">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`image ${
                            image.isFeatured ? 'featured' : ''
                        }`}
                        draggable
                        onDragStart={(e) => onDragStart(e, index)}
                        onDragOver={(e) => onDragOver(e, index)}
                        onDrop={() => onDrop(index)}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={300}
                            height={300}
                        />
                        <button onClick={() => onDelete(image.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;
