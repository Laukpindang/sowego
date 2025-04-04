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

import { getUsers } from '@/firebase/services/user'
import { useAuth } from '@/context/auth-context'
import { usePagination } from './hooks/use-pagination'

import { Link } from 'react-router'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from './components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from './components/ui/pagination'

import { ArrowUpDown, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from 'lucide-react'

import type { User } from './types/User'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Username
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const navigate = useNavigate()
      return <Button onClick={() => navigate(`/user/${row.original.id}`)}>Detail</Button>
    }
  }
]

function App() {
  const { user } = useAuth()

  const [userData, setUserData] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    columns,
    data: userData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters, pagination }
  })

  const { paginationRange } = usePagination({ itemsPerPage: pagination.pageSize, totalItems: table.getRowCount() })

  useEffect(() => {
    getUsers().then(res => setUserData(res))
  }, [])

  return (
    <>
      {user ? (
        <div>
          <div className='flex items-center justify-between gap-2 py-4'>
            <Input
              placeholder='Filter by Emails...'
              value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
              onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
            <Button asChild>
              <Link to='/user/add'>Add user</Link>
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
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
          {userData.length > 10 && (
            <div className='flex items-center justify-between space-x-2 py-4'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => table.firstPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronsLeftIcon />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeftIcon />
                    </Button>
                  </PaginationItem>
                  {paginationRange.map((item, index) => (
                    <PaginationItem key={`${item}-${index}`}>
                      <PaginationLink isActive={typeof item === 'number' && pagination.pageIndex === item - 1}>
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <ChevronRightIcon />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => table.lastPage()}
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
      ) : (
        <Button asChild>
          <Link to='/login'>Login</Link>
        </Button>
      )}
    </>
  )
}

export default App
