import { useEffect, useState } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/organizations-columns'
import { OrganizationsDialogs } from './components/organizations-dialogs'
import { OrganizationsPrimaryButtons } from './components/organizations-primary-buttons'
import { OrganizationsTable } from './components/organizations-table'
import OrganizationsProvider from './context/organizations-context'
import { organizations } from './data/organizations'
import { organizationListSchema } from './data/schema'

export default function Organizations() {
  const [organizationList, setOrganizationList]: any = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const data = await organizations();
      console.log("Data", data);
      const parsed = organizationListSchema.parse(data);
      console.log("Parsed")
      setOrganizationList(parsed);
    };

    fetchOrganizations();
  }, []);

  return (
    <OrganizationsProvider>
      <Header fixed>
        <Search />
        <div className='flex items-center ml-auto space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='flex flex-wrap items-center justify-between mb-2 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Organization List</h2>
            <p className='text-muted-foreground'>
              Manage the organizations here.
            </p>
          </div>
          <OrganizationsPrimaryButtons />
        </div>
        <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
          <OrganizationsTable data={organizationList} columns={columns} />
        </div>
      </Main>

      <OrganizationsDialogs />
    </OrganizationsProvider>
  )
}
