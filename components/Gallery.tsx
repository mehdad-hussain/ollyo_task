'use client';
import { GalleryImage } from '@/model/GalleryPageDTO';
import ImageSVG from '@/public/icons/Image';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryHeader from './GalleryHeader';

type GalleryProps = {
    images: GalleryImage[];
    onDelete: (ids: string[]) => void;
    onReorder: (images: GalleryImage[]) => void;
};

const Gallery = ({ images, onDelete, onReorder }: GalleryProps) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [draggedImage, setDraggedImage] = useState<GalleryImage | null>(null);

    const onDragStart = (e: MouseEvent | PointerEvent | TouchEvent, index: number) => {
        setDraggedImage(images[index]);
    };


    const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (!draggedImage) return;

        const newImages = [...images];
        newImages.splice(images.indexOf(draggedImage), 1);
        newImages.splice(index, 0, draggedImage);
        onReorder(newImages);

        e.dataTransfer.dropEffect = 'move';
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
        onDelete(selectedImages);
        clearSelection();
    };


    return (
        <>
            <div className="bg-white rounded-lg shadow-sm">
                <GalleryHeader
                    selectedImagesCount={selectedImages.length}
                    onClearSelection={clearSelection}
                    onDeleteSelected={handleDeleteSelected}
                />

                <div className="gallery-grid m-8 pb-8">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={(e) => onDragOver(e, index)}
                            onDrop={() => onDrop(index)}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                            }} // Hover animation with a subtle shadow
                            initial={{ opacity: 1 }}
                            animate={
                                draggedImage
                                    ? { scale: 0.9, opacity: 0.8 }
                                    : { scale: 1, opacity: 1 }
                            } // Drag animation with opacity change
                            className={`${index === 0 ? 'featured-item' : 'grid-item'
                                } relative`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => toggleImageSelection(image.id)}
                        >
                            <input
                                type="checkbox"
                                className={`absolute top-4 left-4 w-4 h-4 z-20 ${index === hoveredIndex ||
                                    selectedImages.includes(image.id)
                                    ? 'block'
                                    : 'hidden'
                                    }`}
                                checked={selectedImages.includes(image.id)}
                                onChange={() => toggleImageSelection(image.id)}
                            />

                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={300}
                                className="object-contain w-full h-full hover:opacity-50 transition-opacity duration-300 hover:cursor-pointer bg-white"
                            />
                        </motion.div>
                    ))}

                    <div className="relative border-dashed border border-gray-500 w-[150px] h-[150px] rounded-md place-self-center">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
                        />
                        <label
                            htmlFor="image-input"
                            className="w-full h-full absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                        >
                            <ImageSVG className="w-6 h-6 text-gray-300" />
                            <div className="text-gray-500 text-lg mt-2">
                                Add Images
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;
