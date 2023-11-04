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


            <section className="bg-gradient-to-r from-blue-400 to-green-400 p-6 rounded-lg shadow-lg">
                <p className="mb-6 text-left">
                    I created this project using Next.js, following the recommendation from the official React documentation. React no longer suggests using Create React App; instead, they recommend using Next.js and Remix. This framework choice offers numerous advantages for modern web development.
                </p>
                <div className="bg-white p-6 rounded-lg text-left">
                    <h3 className="text-2xl font-bold mb-4">Key Technologies and Libraries</h3>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Next.js:</strong> Next.js serves as the foundation of the project, providing an excellent platform for building React applications.
                        </li>
                        <li>
                            <strong>TypeScript:</strong> The project is developed using TypeScript, enhancing the development experience with strong typing and code validation.
                        </li>
                        <li>
                            <strong>Tailwind CSS:</strong> Tailwind CSS is employed for styling, making it easy to create responsive and aesthetically pleasing user interfaces.
                        </li>
                        <li>
                            <strong>Framer Motion:</strong> Framer Motion, a popular animation library, is utilized to add delightful animations and transitions to the user interface.
                        </li>
                    </ul>
                </div>
            </section>

        </main>
    );
}
