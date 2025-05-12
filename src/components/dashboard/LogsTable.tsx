"use client";
import React, { useMemo, useState } from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BookOpenTextIcon, FolderArchiveIcon } from "lucide-react";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}
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

export default function LogsTable({ events }: { events: Event[] }) {
  const [data] = useState(() => [...events]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "store_id",
        header: "Loja / CNPJ",
        footer: "Loja / CNPJ",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "app_version",
        header: "Versão",
        footer: "Versão",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "compacted",
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
        cell: (info) => String(info.getValue()),
        // cell: (info) => (info.getValue() ? "✅" : "❌"),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "reports",
        header: () => (
          <div className="tooltip tooltip-left" data-tip="Relatórios">
            <BookOpenTextIcon className="w-5 h-5" />
          </div>
        ),
        footer: () => (
          <div className="tooltip tooltip-left" data-tip="Relatórios">
            <BookOpenTextIcon className="w-5 h-5" />
          </div>
        ),
        cell: (info) => String(info.getValue()),
        // cell: (info) => (info.getValue() ? "✅" : "❌"),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "createdAt",
        header: "Criado em",
        footer: "Criado em",
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          date.setHours(date.getHours() - 3); // America/Sao_Paulo timezone offset
          return date.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          });
        },
      },
      {
        accessorKey: "time_exported",
        header: "Período",
        footer: "Período",
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          return `${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )} de ${date.getFullYear()}`;
        },
      },
      {
        accessorKey: "duration",
        header: "Duração",
        footer: "Duração",
        cell: (info) => {
          const seconds = info.getValue() as number;
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const remainingSeconds = seconds % 60;
          return `${
            hours > 0 ? String(hours).padStart(2, "0") + ":" : ""
          }${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
          ).padStart(2, "0")}`;
        },
      },
      {
        accessorKey: "sat_count",
        header: "SAT",
        footer: "SAT",
        cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "nfce_count",
        header: "NFC-e",
        footer: "NFC-e",
        cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "nfe_count",
        header: "NF-e",
        footer: "NF-e",
        cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "compras_count",
        header: "Compras",
        footer: "Compras",
        cell: (info) => (info.getValue() == 0 ? "❌" : info.getValue()),
        meta: {
          filterVariant: "range",
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          className="w-32 border shadow rounded"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 15, 25, 50, 100].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="bg-base-100 hover:bg-base-300 text-base-content text-left"
            >
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Filter({ column }: { column: Column<Event, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="w-18 border shadow rounded"
    >
      <option
        value=""
        className="bg-base-100 hover:bg-base-300 text-base-content text-center"
      >
        Todos
      </option>
      <option
        value="true"
        className="bg-base-100 hover:bg-base-300 text-base-content text-center"
      >
        ✅
      </option>
      <option
        value="false"
        className="bg-base-100 hover:bg-base-300 text-base-content text-center"
      >
        ❌
      </option>
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
