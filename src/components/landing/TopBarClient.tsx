"use client";

import { Github } from "@/assets/svg/Github";
import { Download } from "lucide-react";
import Link from "next/link";

interface TopBarClientProps {
  rightSlot?: React.ReactNode;
}

export default function TopBarClient({ rightSlot }: TopBarClientProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-base-300 text-base-content">
      <div className="text-lg font-bold">
        <Link href="/">VSM Panel</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="https://github.com/matheusgrilo/xml-facil-vsm/releases/latest/download/XML_Facil.exe"
          className="hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download className="w-5 h-5" />
        </Link>
        <Link
          href="https://github.com/MatheusGrilo/XML-Facil-VSM"
          className="hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-5 h-5" />
        </Link>
        {rightSlot}
      </div>
    </div>
  );
}
