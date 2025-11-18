import { ColumnDef } from '@tanstack/react-table';

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  allowPagination?: boolean;
  allowColumnFilters?: boolean;
  allowSelection?: boolean;
  allowSearchBar?: boolean;
  className?: string;
  highlightByKey?: string;
  highlightedValues?: string[];
  scrollHighlightedRowsIntoView?: boolean;
  highlightText?: string;
  showSearchBar?: boolean;
  tableHeaderStyle?: string;
  tableHeight?: string;
};
