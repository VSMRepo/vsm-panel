import React from "react";

type Event = {
  id: string;
  store_id: string;
  app_version: string;
  compacted: boolean;
  reports: boolean;
  createdAt: string;
  time_exported: string;
};

export default function LogsTable({ events }: { events: Event[] }) {
  if (!Array.isArray(events) || events.length === 0) {
    return <div>Sem dados para mostrar.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Store ID</th>
            <th>App Version</th>
            <th>Compacted</th>
            <th>Reports</th>
            <th>Data Criada</th>
            <th>Time Exported</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.store_id}</td>
              <td>{event.app_version || "-"}</td>
              <td>{event.compacted ? "✅" : "❌"}</td>
              <td>{event.reports ? "✅" : "❌"}</td>
              <td>{new Date(event.createdAt).toLocaleString()}</td>
              <td>{event.time_exported || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
