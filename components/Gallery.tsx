'use client';
import { GalleryImage } from '@/model/GalleryPageDTO';
import Image from 'next/image';
import { useState } from 'react';

type GalleryProps = {
    images: GalleryImage[];
    onDelete: (ids: string[]) => void; // Update the onDelete function to accept an array of IDs
    onReorder: (images: GalleryImage[]) => void;
};

const Gallery = ({ images, onDelete, onReorder }: GalleryProps) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // State to store selected image IDs

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

    const toggleImageSelection = (id: string) => {
        // Toggle the selection of an image
        if (selectedImages.includes(id)) {
            setSelectedImages(
                selectedImages.filter((imageId) => imageId !== id)
            );
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const clearSelection = () => {
        // Clear the selection of all images
        setSelectedImages([]);
    };

    const setFeatureImage = (imageId: string) => {
        // Mark an image as the featured image
        const updatedImages = images.map((image) => ({
            ...image,
            isFeatured: image.id === imageId,
        }));
        onReorder(updatedImages);
    };

    const handleDeleteSelected = () => {
        // Handle deleting selected images
        onDelete(selectedImages);
        clearSelection(); // Clear the selection after deleting
    };
    const [hoveredIndex, setHoveredIndex] = useState<any>(null);

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex justify-between px-6 py-3 border-b border-gray-300 shadow-inner">
                    {<p className=" font-bold text-lg text-black">Gallery</p>}
                    {selectedImages.length > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="text-red-600 text-sm font-semibold"
                        >
                            Delete files
                        </button>
                    )}
                </div>
                <hr />

                <div className="gallery-grid m-8 pb-8">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={(e) => onDragOver(e, index)}
                            onDrop={() => onDrop(index)}
                            className={
                                (index === 0 ? 'featured-item' : 'grid-item') +
                                ' relative'
                            }
                            onMouseEnter={() => setHoveredIndex(index)} // Track hover index
                            onMouseLeave={() => setHoveredIndex(null)} // Clear hover index
                            onClick={() => toggleImageSelection(image.id)} // Toggle image selection on click
                        >
                            {index === hoveredIndex ? ( // Show the delete button only when hovering
                                <input
                                    type="checkbox"
                                    className="absolute top-4 left-4 w-4 h-4 z-20"
                                    checked={selectedImages.includes(image.id)}
                                    onChange={() =>
                                        toggleImageSelection(image.id)
                                    }
                                />
                            ) : null}

                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={300}
                                className="object-contain w-full h-full hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer bg-white"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gallery;

