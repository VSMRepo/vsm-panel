import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { LogInIcon } from "lucide-react";

export default async function User() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const user = data?.user;

  if (error || !user) {
    return (
      <Link href="/login" className="hover:text-gray-400">
        <LogInIcon className="w-5 h-5" />
      </Link>
    );
  }

  return <UserDropdown />;
}
