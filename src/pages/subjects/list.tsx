import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subject } from '@/types'
import { Select } from '@radix-ui/react-select'
import { useTable } from '@refinedev/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const SubjectsList = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const departmentFilters = selectedDepartment === 'all' ? [] : [{ field: 'department', operator: 'eq' as const, value: selectedDepartment }];
  const searchFilter = searchQuery ? [{ field: 'name', operator: 'contains' as const, value: searchQuery }] : [];
  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 100,
        header: () => <p className='column-title ml-2'>Code</p>,
        cell: ({ getValue }) => <Badge variant="destructive">{getValue<string>()}</Badge>
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 200,
        header: () => <p className='column-title ml-2'>Name</p>,
        cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>,
        filterFn: 'includesString',


      }, {
        id: 'department',
        accessorKey: 'department',
        size: 150,
        header: () => <p className='column-title ml-2'>Department</p>,
        cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        filterFn: 'includesString',
      }
      , {
        id: 'description',
        accessorKey: 'description',
        size: 300,
        header: () => <p className='column-title ml-2'>Description</p>,
        cell: ({ getValue }) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>,
        filterFn: 'includesString',
      }
    ], []),
    refineCoreProps: {
      resource: 'subjects',
      pagination: {
        pageSize: 10,
        mode: 'server',
      },
      filters: {
        permanent: [...departmentFilters, ...searchFilter],
      },
      sorters: {
        initial:
        {
          field: 'id',
          order: 'desc',
        }

      },
    }
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className='page-title'>hello</h1>
      <div className='intro-row'>

        <p>Quick access to essential metrics and mangement tools</p>
      </div>
      <div className='actions-row'>
        <div className='search-field'>
          <Search className="search-icon" />
          <Input
            type='text'
            value={searchQuery}
            placeholder='Search by name...'
            className='pl-10 w-full'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex gap-2 w-full sm:w-auto'>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CreateButton />
        </div>
      </div>
      <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectsList
