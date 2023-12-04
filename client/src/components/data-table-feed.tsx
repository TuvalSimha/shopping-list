import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { graphql } from "@/gql/gql";
import { useQuery } from "urql";
import { Item, Comment } from "@/gql/graphql";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "status",
    header: "מצב",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: () => {
      return <div>שם</div>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">כמות</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"));

      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "comments",
    header: () => <div className="text-right">הערות</div>,
    cell: ({ row }) => {
      const commentsArray = row.getValue("comments") as Comment[];
      if (!commentsArray || !commentsArray.length) {
        return <div className="text-right font-medium">-</div>;
      }
      const comment = commentsArray[0].body;

      if (!comment) {
        return <div className="text-right font-medium">-</div>;
      }

      return <div className="text-right font-medium">{comment}</div>;
    },
  },
];

const AllItems = graphql(/* GraphQL */ `
  query AllItems {
    feed {
      id
      quantity
      title
      status
      comments {
        body
        id
      }
    }
  }
`);

export function DataTableForFeed() {
  const [result] = useQuery({ query: AllItems });
  const data = React.useMemo(() => result.data?.feed, [result.data]) ?? [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full -z-50 h-full mt-[50px]">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
