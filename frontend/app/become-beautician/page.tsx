import type { Metadata } from "next";
import ProfileCompletionDashboard from "@/components/become-beautician/ProfileCompletionDashboard";

export const metadata: Metadata = {
  title: "Complete Beautician Profile",
  description:
    "Track beautician profile completion and start your RoopSetu setup flow.",
};

export default function Page() {
  return <ProfileCompletionDashboard />;
}
