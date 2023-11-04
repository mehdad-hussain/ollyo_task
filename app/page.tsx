import GalleryUI from '@/view/page-gallery/GalleryUI';

export default function Home() {
    return (
        <main className="min-h-screen text-center px-24 py-8">
            <h1 className="text-6xl font-extrabold text-teal-500 tracking-wide mb-6">
                OLLYO Image Gallery
            </h1>
            <section>
                <GalleryUI />
            </section>
        </main>
    );
}
