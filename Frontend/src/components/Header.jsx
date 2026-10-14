import React from "react";

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-[#121212]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Moody Player</h1>

          <p className="mt-1 text-sm text-gray-400">Music based on your mood</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1ed760]" />
          Ready
        </div>
      </div>
    </header>
  );
};

export default Header;
