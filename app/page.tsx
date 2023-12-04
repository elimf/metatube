import Header from "../components/Header";
import Image from "next/image";
export default function Home() {
   const galleryItems = Array.from({ length: 50 }, (_, index) => index + 1);
  return (
    <>
      <Header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item} className="overflow-hidden bg-gray-300">
                <Image
                  src={`https://via.placeholder.com/400?text=Gallery+Item+${item}`}
                  alt={`Gallery Item ${item}`}
                  className="object-cover w-full h-48"
                  width={400}
                  height={400}
                />
                <div className="p-4">
                  <p className="text-lg font-bold">{`Gallery Item ${item}`}</p>
                  <p className="text-gray-500">Description or caption here.</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </Header>
    </>
  );
}
