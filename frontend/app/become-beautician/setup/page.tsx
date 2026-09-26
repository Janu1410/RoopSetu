import type { Metadata } from "next";
import BecomeBeauticianPage from "@/components/become-beautician/BecomeBeauticianPage";

export const metadata: Metadata = {
  title: "Beautician Profile Setup",
  description: "Complete each step of your RoopSetu beautician profile setup.",
};

export default function Page() {
  return <BecomeBeauticianPage />;
}
