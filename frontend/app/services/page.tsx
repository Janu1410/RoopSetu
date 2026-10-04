import Navbar from "@/components/home/Navbar/Navbar";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-serif text-4xl font-medium md:text-5xl lg:text-6xl text-[#5A001F]">
          Our Services
        </h1>
        <p className="max-w-2xl text-lg text-[#6C4A59]">
          Welcome to the Services page. We are currently designing this section.
          Check back soon for exciting updates!
        </p>
      </div>
    </main>
  );
}
