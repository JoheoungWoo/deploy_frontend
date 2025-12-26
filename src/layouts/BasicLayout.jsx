import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const BasicLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="h-20 shrink-0 bg-sky-300">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default BasicLayout;
