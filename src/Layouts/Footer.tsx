import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer
      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12 flex items-center"
      style={{ minHeight: "200px" }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} Public_Library
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <NavLink to="/" className="hover:text-blue-500 transition-colors">
            Home
          </NavLink>
          <NavLink
            to="/allbooks"
            className="hover:text-blue-500 transition-colors"
          >
            Allbook
          </NavLink>
          <NavLink
            to="/addbook"
            className="hover:text-blue-500 transition-colors"
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow_book"
            className="hover:text-blue-500 transition-colors"
          >
            Borrow Summary
          </NavLink>
        </nav>
        <div className="flex gap-3">
          {/* Placeholder social icons */}
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.14 9.14 0 01-2.89 1.1A4.52 4.52 0 0016.1.4c-2.5 0-4.5 2.16-4.5 4.81 0 .38.04.75.12 1.1A12.94 12.94 0 013 2.14a4.92 4.92 0 001.39 6.44A4.42 4.42 0 012 7.22v.06c0 2.27 1.57 4.18 3.66 4.6a4.5 4.5 0 01-2.04.08 4.55 4.55 0 004.23 3.23A9.05 9.05 0 012 19.54 12.8 12.8 0 008.29 21c7.55 0 11.67-6.56 11.67-12.25 0-.19 0-.39-.02-.58A8.18 8.18 0 0023 3z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.54-1.4-1.32-1.77-1.32-1.77-1.08-.77.08-.75.08-.75 1.2.08 1.83 1.27 1.83 1.27 1.07 1.9 2.8 1.35 3.48 1.03.11-.79.42-1.35.76-1.66-2.66-.3-5.47-1.36-5.47-6.05 0-1.34.47-2.44 1.24-3.3-.13-.3-.54-1.5.12-3.12 0 0 1-.33 3.3 1.25a11.6 11.6 0 016 0C17 3.67 18 4 18 4c.66 1.62.25 2.82.12 3.12.77.86 1.23 1.96 1.23 3.3 0 4.7-2.82 5.75-5.5 6.05.43.37.81 1.1.81 2.22v3.3c0 .33.21.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
