import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav
        className="
        bg-[#0f1a14]/95 
        backdrop-blur-lg 
        border-b border-[#1b2a21]
        text-[#e6d9b5] 
        px-6 py-4 
        shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        sticky top-0 z-50
      "
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/home"
            className="flex items-center gap-3 hover:text-[#c3b27d] transition"
          >
            <span className="text-3xl font-extrabold tracking-wide">
              Floral World
            </span>
            <img
              src="/logo.png"
              alt="Floral World Logo"
              className="w-12 h-12 md:w-12 md:h-12 object-contain"
            />
          </Link>
          {/* Mobile Hamburger */}
          {token && (
            <div className="hidden md:flex gap-8 items-center text-lg">
              <Link className="hover:text-[#c3b27d] transition" to="/home">
                Home
              </Link>
              <Link className="hover:text-[#c3b27d] transition" to="/about">
                About
              </Link>
              <Link className="hover:text-[#c3b27d] transition" to="/contact">
                Contact
              </Link>
              <Link className="hover:text-[#c3b27d] transition" to="/chat">
                AI Chat
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-[#c3b27d] transition"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-4 
                    bg-[#c3b27d] text-[#0f1a14] 
                    text-xs font-bold 
                    rounded-full 
                    w-5 h-5 flex items-center justify-center
                    shadow-md
                  "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {user?.isAdmin && (
                <Link
                  className="hover:text-[#c3b27d] transition"
                  to="/admin/dashboard"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="
                bg-[#1d2f25] 
                border border-[#2b4a38] 
                text-[#e6d9b5] 
                px-4 py-2 
                rounded-lg 
                hover:border-[#c3b27d] 
                transition
                cursor-pointer
              "
              >
                Logout
              </button>
            </div>
          )}
          {/* Mobile Hamburger */}
          {token && (
            <button
              className="md:hidden text-3xl text-[#e6d9b5]"
              onClick={() => setOpen(!open)}
            >
              {open ? "✖" : "☰"}
            </button>
          )}
        </div>

        {open && token && (
          <div
            className="
            md:hidden 
            flex flex-col gap-5 
            mt-4 px-4 py-4 
            bg-[#0f1a14]/95 
            border-t border-[#1b2a21]
            text-lg
          "
          >
            <Link
              to="/home"
              onClick={() => setOpen(false)}
              className="hover:text-[#c3b27d]"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="hover:text-[#c3b27d]"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="hover:text-[#c3b27d]"
            >
              Contact
            </Link>

            <Link
              to="/chat"
              onClick={() => setOpen(false)}
              className="hover:text-[#c3b27d]"
            >
              AI Chat
            </Link>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="relative hover:text-[#c3b27d]"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span
                  className="
                  absolute -top-2 left-20 
                  bg-[#c3b27d] text-[#0f1a14] 
                  text-xs font-bold 
                  rounded-full 
                  w-5 h-5 flex items-center justify-center
                "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="hover:text-[#c3b27d]"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="
              bg-[#1d2f25] 
              border border-[#2b4a38] 
              text-[#e6d9b5] 
              px-4 py-2 
              rounded-lg 
              hover:border-[#c3b27d] 
              transition
            "
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
