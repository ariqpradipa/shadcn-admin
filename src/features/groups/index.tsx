import { useEffect, useState } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/groups-columns'
import { GroupsDialogs } from './components/groups-dialogs'
import { GroupsPrimaryButtons } from './components/groups-primary-buttons'
import { GroupsTable } from './components/groups-table'
import GroupsProvider from './context/groups-context'
import { groups } from './data/groups'
import { groupListSchema } from './data/schema'

export default function Groups() {
  const [groupList, setGroupList]: any = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await groups();
      console.log("Data", data);
      const parsed = groupListSchema.parse(data);
      console.log("Parsed")
      setGroupList(parsed);
    };

    fetchGroups();
  }, []);

  return (
    <GroupsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Group List</h2>
            <p className='text-muted-foreground'>
              Manage the groups here.
            </p>
          </div>
          <GroupsPrimaryButtons />
        </div>
        <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
          <GroupsTable data={groupList} columns={columns} />
        </div>
      </Main>

      <GroupsDialogs />
    </GroupsProvider>
  )
}
