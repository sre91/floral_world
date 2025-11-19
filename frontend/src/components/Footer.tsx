export default function Footer() {
  return (
    <footer
      className="
        bg-linear-to-b 
        from-[#0f1a14] to-[#0b140f] 
        text-[#c8bc94] 
        text-center 
        py-6 
        border-t border-[#1a2a21]
        shadow-[0_-4px_20px_rgba(0,0,0,0.4)]
      "
    >
      <p className="text-sm tracking-wide opacity-90">
        © {new Date().getFullYear()} Floral World · Crafted with Nature 🌿
      </p>

      <p className="mt-2 text-xs opacity-75">created by Sreenath</p>
    </footer>
  );
}
