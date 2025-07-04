import { Outlet } from "react-router";
import Navbar from "./Layouts/Navbar";
import "./App.css"
import Footer from "./Layouts/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}