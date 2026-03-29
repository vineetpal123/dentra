import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";

export type DataColumn<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

interface DataTableProps<T> {
  data: T[];
  columns: DataColumn<T>[];
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
  onSortChange?: (columnKey: keyof T) => void;
  noDataMessage?: string;
  rowKey?: (row: T) => React.Key;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortBy,
  sortOrder,
  onSortChange,
  noDataMessage = "No records found",
  rowKey,
}: DataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const active = sortBy === column.key;
              return (
                <TableCell
                  key={String(column.key)}
                  align={column.align || "left"}
                >
                  {column.sortable && onSortChange ? (
                    <TableSortLabel
                      active={active}
                      direction={active && sortOrder ? sortOrder : "asc"}
                      onClick={() => onSortChange(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2" color="textSecondary">
                  {noDataMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={rowKey ? rowKey(row) : (row.id ?? JSON.stringify(row))}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${String(column.key)}-${String(row[column.key])}`}
                    align={column.align || "left"}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
