import Link from 'next/link';
import Services from './components/Services';
import ContactPage from './contact';

export default function Home() {
  return (
    // <main className="min-h-screen flex flex-col items-center justify-center p-8">
    //   <section className="text-center max-w-3xl">
    //     <h1 className="text-4xl font-bold mb-4 text-blue-800">
    //       Professional Resume Review Services
    //     </h1>
    //     <p className="text-xl text-gray-600 mb-8">
    //       Transform your resume into a powerful job-search tool with our expert review services.
    //     </p>
    //     <Link 
    //       href="/services" 
    //       className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    //     >
    //       View Our Services
    //     </Link>
    //   </section>

    //   <div className="mt-12 w-full flex flex-col items-center">
    //     <Services />
        <ContactPage />
      // </div>
    // </main>
  );
}
