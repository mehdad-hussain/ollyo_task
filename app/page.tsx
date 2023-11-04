import GalleryUI from '@/view/page-gallery/GalleryUI';

export default function Home() {
    return (
        <main className="min-h-screen text-center px-2 sm:px-10 md:px-16 lg:px-24 py-8">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-6xl font-extrabold text-blue-400 tracking-wide mb-6">
                OLLYO Image Gallery
            </h1>
            <section>
                <GalleryUI />
            </section>
        </main>
    );
}
