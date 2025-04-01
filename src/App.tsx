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
  type ColumnFiltersState
} from '@tanstack/react-table'

import { getUsers } from '@/firebase/services/user'
import { useAuth } from '@/context/auth-context'

import { Link } from 'react-router'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from './components/ui/input'
import { Button } from '@/components/ui/button'

import { ArrowUpDown } from 'lucide-react'

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

  const table = useReactTable({
    columns,
    data: userData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters }
  })

  useEffect(() => {
    getUsers().then(res => setUserData(res))
  }, [])

  return (
    <>
      <h1 className='text-xl'>Hello</h1>
      {user ? (
        <div>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filter emails...'
              value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
              onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
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
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
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
