// Site footer. Shown on every page.
// PLACEHOLDER (Issue 8): Use the design system colors instead of gray-800.
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        {/* The year updates automatically */}
        <p>Copyright &copy; {new Date().getFullYear()} | GlobalRoots Team | All rights reserved</p>
        <p>Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
