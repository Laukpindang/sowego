import { useEffect, useState, useCallback, useMemo } from 'react'
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
import { toast } from 'sonner'

import { getDestinations, deleteDestination } from '@/firebase/services/destination'
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { ArrowUpDown, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from 'lucide-react'

import type { Destination } from '@/types/Destination'

function DestinationPage() {
  const [destinationData, setDestinationData] = useState<Destination[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  const columns: ColumnDef<Destination>[] = useMemo(
    () => [
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
        accessorKey: 'discount',
        header: ({ column }) => (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Discount
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
          return (
            <Dialog>
              <div className='flex items-center gap-2'>
                <Button asChild>
                  <Link to={`/destination/${row.original.id}/edit`}>Edit</Link>
                </Button>
                <DialogTrigger asChild>
                  <Button variant='destructive'>Delete</Button>
                </DialogTrigger>
              </div>
              <DialogContent>
                <div className='mx-auto w-full max-w-sm'>
                  <DialogHeader>
                    <DialogTitle>Are you sure to delete this data?</DialogTitle>
                    <DialogDescription>This action cannot be undone</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant='destructive' onClick={() => deleteData(row.original.id)}>
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          )
        }
      }
    ],
    []
  )

  const table = useReactTable({
    columns,
    data: destinationData,
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

  const fetchData = useCallback(() => {
    getDestinations().then(res => setDestinationData(res))
  }, [])

  const deleteData = useCallback(async (id: string) => {
    toast.promise(() => deleteDestination(id), {
      loading: 'Deleting data...',
      success: 'Success delete data',
      error: 'Failed delete data',
      finally: () => fetchData()
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Header title='Manage Destination' />
      <div className='p-4'>
        <div className='flex items-center justify-between gap-2 py-4'>
          <Input
            placeholder='Filter by City...'
            value={(table.getColumn('city')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('city')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <Button asChild>
            <Link to='/destination/add'>Add</Link>
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
        {destinationData.length > 10 && (
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

export default DestinationPage
