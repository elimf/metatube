import React from "react";
//import MenuItemLoader from "@/components/Loader/MenuItemLoader"; // You may need to adjust the import path
import MenuItemLoader from "./MenuItemLoader";
const SidebarLoader: React.FC = () => (
  <aside
    id="logo-sidebar"
    className="fixed top-0 left-0 z-30 h-screen pt-20 transition-transform w-48 -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-neutral-950 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-neutral-950">
      <ul className="space-y-2 font-medium">
        <MenuItemLoader repeatCount={3} />
        <MenuItemLoader repeatCount={4} />
        <MenuItemLoader repeatCount={4} />
        <MenuItemLoader repeatCount={2} />
      </ul>
    </div>
  </aside>
);

export default SidebarLoader;
