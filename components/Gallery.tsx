'use client';
import { GalleryImage } from '@/model/GalleryPageDTO';
import ImageSVG from '@/public/icons/Image';
import Image from 'next/image';
import { useState } from 'react';

type GalleryProps = {
    images: GalleryImage[];
    onDelete: (ids: string[]) => void;
    onReorder: (images: GalleryImage[]) => void;
};

const Gallery = ({ images, onDelete, onReorder }: GalleryProps) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [draggedImage, setDraggedImage] = useState<GalleryImage | null>(null);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
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
        setDraggedImage(null);
    };

    const toggleImageSelection = (id: string) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(
                selectedImages.filter((imageId) => imageId !== id)
            );
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const clearSelection = () => {
        setSelectedImages([]);
    };

    const handleDeleteSelected = () => {
        // Handle deleting selected images
        onDelete(selectedImages);
        clearSelection(); // Clear the selection after deleting
    };


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
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => toggleImageSelection(image.id)}
                        >


                            <input
                                type="checkbox"
                                className={`absolute top-4 left-4 w-4 h-4 z-20 ${index === hoveredIndex || selectedImages.includes(image.id) ? 'block' : 'hidden'}`}
                                checked={selectedImages.includes(image.id)}
                                onChange={() =>
                                    toggleImageSelection(image.id)
                                }
                            />

                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={300}
                                className="object-contain w-full h-full hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer bg-white"
                            />
                        </div>
                    ))}

                    {/* Add input box for adding/uploading new images */}
                    <div className="relative border-dashed border border-gray-500 rounded-md">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
                        // Handle file input change event to add new images
                        />
                        <label
                            htmlFor="image-input"
                            className="w-full h-full absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                        >
                            <ImageSVG className="w-6 h-6 text-gray-300" />
                            <div className="text-gray-500 text-lg mt-2">Add Images</div>
                        </label>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Gallery;

// const setFeatureImage = (imageId: string) => {
//     // Mark an image as the featured image
//     const updatedImages = images.map((image) => ({
//         ...image,
//         isFeatured: image.id === imageId,
//     }));
//     onReorder(updatedImages);
// };