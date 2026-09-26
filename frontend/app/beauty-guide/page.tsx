import Navbar from "@/components/home/Navbar/Navbar";
import Hero from "@/components/beauty-guide/Hero";
import BeautyDiscovery from "@/components/beauty-guide/BeautyDiscovery";
import GetTheLook from "@/components/beauty-guide/GetTheLook";

export default function BeautyGuidePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      <Hero />
      <BeautyDiscovery />
      <GetTheLook />
    </main>
  );
}
