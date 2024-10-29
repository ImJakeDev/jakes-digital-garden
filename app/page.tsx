import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Jake Unplugged
          </h1>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="text-sm text-gray-500">Made with ✨ by Jake</span>
        <span className="text-sm text-gray-500">•</span>
        <em className="text-sm text-gray-500">© 2024 Jake Unplugged</em>
      </footer>
    </div>
  );
}
