export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-8">
      <div className="flex gap-2 items-center">
        <img />
        <span className="font-medium text-lg">Expense Tracker</span>
      </div>
      {children}
    </div>
  );
}
