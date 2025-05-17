import Header from '@/components/layouts/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto ">
        <div className="p-4 max-w-7xl mx-auto w-full">{children}</div>
      </main>
      <footer className="text-center p-4 border-t">Copyright © 2025 Dev Nest. All rights reserved.</footer>
    </div>
  );
}
