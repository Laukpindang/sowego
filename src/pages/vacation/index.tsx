import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState
} from '@tanstack/react-table'

import { getVacations } from '@/firebase/services/vacation'
import { usePagination } from '@/hooks/use-pagination'

import { Link } from 'react-router'

import Header from '@/components/header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'

import { ArrowUpDown, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from 'lucide-react'

import type { Vacation } from '@/types/Vacation'

const columns: ColumnDef<Vacation>[] = [
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        City
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Price
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'day_trip',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Day Trip
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Country
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Rating
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'quota',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Quota
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const navigate = useNavigate()
      return <Button onClick={() => navigate(`/vacation/${row.original.id}/edit`)}>Edit</Button>
    }
  }
]

function VacationPage() {
  const [vacationData, setVacationData] = useState<Vacation[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    columns,
    data: vacationData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters, pagination }
  })

  const { range, first, last, next, previous, setPage, active } = usePagination({ total: table.getPageCount() })

  useEffect(() => {
    getVacations().then(res => setVacationData(res))
  }, [])

  return (
    <>
      <Header title='Manage Vacation' />
      <div className='p-4'>
        <div className='flex items-center justify-between gap-2 py-4'>
          <Input
            placeholder='Filter by City...'
            value={(table.getColumn('city')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('city')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <Button asChild>
            <Link to='/vacation/add'>Add</Link>
          </Button>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {vacationData.length > 10 && (
          <div className='flex items-center justify-between space-x-2 py-4'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      table.firstPage()
                      first()
                    }}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronsLeftIcon />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      table.previousPage()
                      previous()
                    }}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeftIcon />
                  </Button>
                </PaginationItem>
                {range.map((item, index) => (
                  <PaginationItem key={`${item}-${index}`}>
                    {typeof item === 'number' ? (
                      <PaginationLink
                        onClick={() => {
                          table.setPageIndex(item - 1)
                          setPage(item)
                        }}
                        isActive={item === active}
                      >
                        {item}
                      </PaginationLink>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      table.nextPage()
                      next()
                    }}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRightIcon />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      table.lastPage()
                      last()
                    }}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronsRightIcon />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  )
}

export default VacationPage
