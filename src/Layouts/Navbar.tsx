import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavLink } from "react-router";
import LibraryLogo from "./books-svgrepo-com.svg";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/allbooks" className="flex items-center gap-3">
          <img className="w-10 h-10" src={LibraryLogo} alt="" />
          <p className="text-xl font-bold text-primary">Public_Library</p>
        </NavLink>

        <div className="hidden md:flex gap-4 items-center">
          <NavLinks />
          <ModeToggle />
        </div>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden px-4 pb-4 overflow-hidden"
        >
          <div className="flex flex-col gap-2">
            <NavLinks />
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      <NavLink
        to="/allbooks"
        className={({ isActive }) =>
          [
            "nav-link",
            "text-gray-700 dark:text-gray-200",
            "hover:text-black dark:hover:text-white",
            isActive && "nav-link-active",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        AllBooks
      </NavLink>
      <NavLink
        to="/addbook"
        className={({ isActive }) =>
          [
            "nav-link",
            "text-gray-700 dark:text-gray-200",
            "hover:text-black dark:hover:text-white",
            isActive && "nav-link-active",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        AddBook
      </NavLink>
      <NavLink
        to="/borrow_book"
        className={({ isActive }) =>
          [
            "nav-link",
            "text-gray-700 dark:text-gray-200",
            "hover:text-black dark:hover:text-white",
            isActive && "nav-link-active",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        BorrowSummary
      </NavLink>
    </>
  );
}
