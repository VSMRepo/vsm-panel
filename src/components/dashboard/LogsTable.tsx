"use client";
import React, { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BookOpenTextIcon, FolderArchiveIcon } from "lucide-react";

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
    header: "Loja / CNPJ",
    footer: "Loja / CNPJ",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("app_version", {
    header: "Versão",
    footer: "Versão",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("compacted", {
    header: () => (
      <div className="tooltip tooltip-left" data-tip="Compactado">
        <FolderArchiveIcon className="w-5 h-5" />
      </div>
    ),
    footer: () => (
      <div className="tooltip tooltip-left" data-tip="Compactado">
        <FolderArchiveIcon className="w-5 h-5" />
      </div>
    ),
    cell: (info) => (info.getValue() ? "✅" : "❌"),
  }),
  columnHelper.accessor("reports", {
    header: () => (
      <div className="tooltip tooltip-right" data-tip="Relatórios">
        <BookOpenTextIcon className="w-5 h-5" />
      </div>
    ),
    footer: () => (
      <div className="tooltip tooltip-right" data-tip="Relatórios">
        <BookOpenTextIcon className="w-5 h-5" />
      </div>
    ),
    cell: (info) => (info.getValue() ? "✅" : "❌"),
  }),
  columnHelper.accessor("createdAt", {
    header: "Criado em",
    footer: "Criado em",
    cell: (info) => {
      const date = new Date(info.getValue());
      date.setHours(date.getHours() - 3); // America/Sao_Paulo timezone offset
      return date.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
    },
  }),
  columnHelper.accessor("time_exported", {
    header: "Período",
    footer: "Período",
    cell: (info) => {
      const date = new Date(info.getValue());
      return `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )} de ${date.getFullYear()}`;
    },
  }),
  columnHelper.accessor("sat_count", {
    header: "SAT",
    footer: "SAT",
    cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
  }),
  columnHelper.accessor("nfce_count", {
    header: "NFC-e",
    footer: "NFC-e",
    cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
  }),
  columnHelper.accessor("nfe_count", {
    header: "NF-e",
    footer: "NF-e",
    cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
  }),
  columnHelper.accessor("compras_count", {
    header: "Compras",
    footer: "Compras",
    cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
  }),
  columnHelper.accessor("duration", {
    header: "Duração",
    footer: "Duração",
    cell: (info) => {
      const seconds = info.getValue();
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}${String(
        minutes
      ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    },
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
      <table className="table w-full">
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
