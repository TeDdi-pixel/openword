import { Navigation } from "@/entities/navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex flex-1 max-w-[1440px] w-full h-full flex-col items-center">
        Home page
      </main>
    </>
  );
}
