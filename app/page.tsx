import Header from "@/components/Header";
import VideoSkeleton from "@/components/Video/VideoSkeleton";
export default function Home() {
  const galleryItems = Array.from({ length: 9 }, (_, index) => index + 1);
  return (
    <>
      <Header withSidebar={true}>
        <div className="flex-grow mt-24 px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <VideoSkeleton item={item} key={item} />
            ))}
          </div>
        </div>
      </Header>
    </>
  );
}
