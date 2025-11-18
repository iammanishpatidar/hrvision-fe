import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';

export type DocumentsColumns = {
  type: string;
  name: string;
  date: string;
  documents: React.ReactNode;
};

const columnHelper = createColumnHelper<DocumentsColumns>();

export const documentColumns = [
  columnHelper.accessor('type', {
    header: 'Document Type',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Document Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Submission Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('documents', {
    header: 'Documents',
    cell: info => info.getValue(),
  }),
] as ColumnDef<DocumentsColumns>[];
