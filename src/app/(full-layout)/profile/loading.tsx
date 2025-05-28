import ProfileLoading from "@/components/layout/loaders/ProfileLoader";
import SideBarLoader from "@/components/layout/loaders/SideBarLoader";

export default function ProfileSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row animate-pulse">
            <SideBarLoader />
            <ProfileLoading />
        </div>
    );
}
