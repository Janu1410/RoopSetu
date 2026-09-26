import Navbar from "@/components/home/Navbar/Navbar";
import Hero from "@/components/home/Hero";
import { EditorialSection } from "@/components/home/EditorialSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      <Hero />
      <EditorialSection />
    </main>
  );
}
