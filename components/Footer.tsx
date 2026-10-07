export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 px-4 py-6 text-center text-sm text-slate-100 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Osigwe Uchechukwu
          DavidCaleb | All rights reserved
        </p>
        <p className="text-slate-300">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}