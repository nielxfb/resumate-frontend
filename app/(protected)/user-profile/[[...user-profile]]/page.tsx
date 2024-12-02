import { ContentLayout } from "@/components/base/protected/content-layout";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <ContentLayout title="Account">
      <div className="flex h-full justify-center items-center">
        <UserProfile />
      </div>
    </ContentLayout>
  );
}
