
export interface GalleryImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    aspectRatio: number;
    isFeatured: boolean;
    caption: string;
    id: string;
}


export interface GalleryPageDTO {
    images: GalleryImage[];
    title: string;
    description: string;
    date: string;
    tags: string[];
    id: string;
}