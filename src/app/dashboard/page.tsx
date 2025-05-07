import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import LogsTable from "@/components/dashboard/LogsTable";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();
  if (!session?.user) {
    redirect("/login");
  }

  const { data: events, error } = await supabase
    .from("EventLog")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Erro ao buscar eventos:", error.message);
    return <div>Erro ao carregar dados.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard de Logs</h1>
      <LogsTable events={events || []} />
    </div>
  );
}
