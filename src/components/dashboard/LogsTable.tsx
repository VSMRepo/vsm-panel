"use client";
import React, { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Event = {
  id: string;
  store_id: string;
  app_version: string;
  compacted: boolean;
  reports: boolean;
  createdAt: string;
  time_exported: string;
  sat_count: number;
  nfce_count: number;
  nfe_count: number;
  compras_count: number;
  duration: number;
};

const columnHelper = createColumnHelper<Event>();

const columns = [
  columnHelper.accessor("store_id", {
    header: "Loja",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("app_version", {
    header: "Versão",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("compacted", {
    header: "Compactado",
    cell: (info) => (info.getValue() ? "✅" : "❌"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("reports", {
    header: "Relatórios",
    cell: (info) => (info.getValue() ? "✅" : "❌"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Criado em",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("time_exported", {
    header: "Período",
    cell: (info) => info.getValue() || "-",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("sat_count", {
    header: "SAT",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nfce_count", {
    header: "NFC-e",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nfe_count", {
    header: "NF-e",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("compras_count", {
    header: "Compras",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("duration", {
    header: "Duração",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export default function LogsTable({ events }: { events: Event[] }) {
  const [data] = useState(() => [...events]);
  // const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
