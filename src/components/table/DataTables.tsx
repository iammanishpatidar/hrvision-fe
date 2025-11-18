'use client';

import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SearchBar } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { DataTableProps } from './types';
import leftArrow from '/assets/LeftArrow.svg';
import RightArrow from '/assets/RightArrow.svg';

const styles = {
  row: {
    default: 'bg-white',
    highlighted: 'bg-[#0185E41F]',
    border: '!outline outline-1 !outline-trublue-secondary-500',
  },
};

export default function DataTable<T>({
  data,
  columns,
  allowPagination,
  allowSelection,
  // allowSearchBar,
  className,
  highlightByKey,
  highlightedValues,
  scrollHighlightedRowsIntoView,
  showSearchBar = true,
  tableHeaderStyle,
  tableHeight,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: allowSelection ?? false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const firstHighlightedRowRef = React.useRef<HTMLTableRowElement>(null);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 3, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(allowPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(allowPagination ? { pagination } : {}),
    },
  });

  const isRowHighlighted = (row: Row<T>) => {
    return (
      highlightedValues?.includes(
        row.original[highlightByKey as keyof typeof row.original] as string
      ) ?? false
    );
  };

  useEffect(() => {
    if (
      scrollHighlightedRowsIntoView &&
      highlightedValues?.length &&
      firstHighlightedRowRef.current &&
      tableContainerRef.current
    ) {
      const rowRect = firstHighlightedRowRef.current.getBoundingClientRect();
      const containerRect = tableContainerRef.current.getBoundingClientRect();

      // Calculate the scroll position to center the row in the container
      const scrollTop =
        rowRect.top -
        containerRect.top -
        containerRect.height / 2 +
        rowRect.height / 2 +
        tableContainerRef.current.scrollTop;

      tableContainerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [scrollHighlightedRowsIntoView, highlightedValues]);

  // Create an array of page numbers for pagination
  const generatePaginationNumbers = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;

    // Display up to 5 page numbers - we'll show current page, 2 before and 2 after when possible
    const pages = [];

    // Always show first page
    pages.push(0);

    // Calculate range around current page
    const rangeStart = Math.max(1, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 2, currentPage + 1);

    // Add ellipsis after first page if needed
    if (rangeStart > 1) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add page numbers from range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 2) {
      pages.push(-2); // -2 represents ellipsis
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }
    return pages;
  };

  return (
    <div className={`${className} w-full`}>
      {showSearchBar && (
        <div className="flex items-center py-4">
          <SearchBar
            className="border border-[#E6E6E6] w-[350px] shadow-none"
            inputStyle="text-base bg-gray-100"
            onChange={() => {}}
            onSearch={() => {}}
            placeholder="Search"
            value=""
          />
        </div>
      )}

      <div className="rounded-lg border border-[#EBE9F1] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
        <div style={{ position: 'relative' }}>
          {/* Fixed Header Table */}
          <Table className="rounded-lg w-full table-fixed">
            <TableHeader
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                // background: '#fff',
                width: '100%',
              }}
            >
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className={`text-[#000] font-montserrat text-[12px] font-bold leading-none tracking-[1px] uppercase px-[12px] ${tableHeaderStyle}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>

          {/* Scrollable Body */}
          <div
            ref={tableContainerRef}
            style={{ overflowY: 'auto', maxHeight: tableHeight || '300px' }}
          >
            <Table className="rounded-lg w-full table-fixed">
              <TableBody className={`${className}`}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className={classNames('bg-white', {
                        [styles.row.border]: isRowHighlighted(row),
                        [styles.row.default]: !isRowHighlighted(row),
                      })}
                      ref={
                        isRowHighlighted(row) && !firstHighlightedRowRef.current
                          ? firstHighlightedRowRef
                          : null
                      }
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className={`${isRowHighlighted(row) ? styles.row.highlighted : styles.row.default} 
                          ${index === 0 && isRowHighlighted(row) && '!border-l'}
                          ${index === row.getVisibleCells().length - 1 && isRowHighlighted(row) && '!border-r'}
                          text-[#636363] font-montserrat text-[14px] leading-[28px] px-[10px] py-[12px]`}
                        >
                          <div className="flex flex-col">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {allowPagination && (
        <div className="flex items-center justify-center space-x-2 py-4">
          {/* {allowSelection && (
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          )} */}

          {/* Numbered Pagination */}
          <div className="flex items-center space-x-2">
            {/* Previous Page Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border-none shadow-none"
            >
              <img src={leftArrow} alt="left " />
              {/* <ChevronLeft className="h-4 w-4" /> */}
            </Button>

            {generatePaginationNumbers().map((pageIndex, i) => {
              if (pageIndex < 0) {
                // Render ellipsis
                return (
                  <span key={`ellipsis-${i}`} className="px-2">
                    ...
                  </span>
                );
              }

              const isCurrentPage = pageIndex === table.getState().pagination.pageIndex;

              return (
                <Button
                  key={`page-${pageIndex}`}
                  variant={isCurrentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`w-8 h-8 p-0 ${isCurrentPage ? 'bg-[#0185E4] text-white' : ''}`}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
            {/* <div className="text-sm text-[#6E6B7B]">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div> */}
            {/* Next Page Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border-none shadow-none"
            >
              {/* <ChevronRight className="h-4 w-4" /> */}
              <img src={RightArrow} alt="left " />
            </Button>
          </div>

          {/* Page Information */}
        </div>
      )}
    </div>
  );
}
