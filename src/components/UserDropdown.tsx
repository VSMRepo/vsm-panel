"use client";

import { UserIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="rounded-field hover:cursor-pointer">
        <UserIcon className="w-5 h-5" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
      >
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
