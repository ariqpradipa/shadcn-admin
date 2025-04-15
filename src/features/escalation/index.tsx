import { useEffect } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import EscalationProvider, { useEscalation } from './context/escalation-context'
import { appUserLevelsAppId } from './data/escalation'

import { Route } from '@/routes/_authenticated/apps/escalation/$appId/index.lazy'

export default function Escalation() {
  return (
    <EscalationProvider>
      <EscalationContent />
    </EscalationProvider>
  )
}

function EscalationContent() {
  const { appId } = Route.useParams()
  const { currentAppUserList, setCurrentAppUserList } = useEscalation()

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await appUserLevelsAppId(appId);
      console.log("Data", data);

      console.log(data.map((data: any) => ({
        ...data.user,
      })))

      setCurrentAppUserList(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
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
            <h2 className='text-2xl font-bold tracking-tight'>Application Escalation</h2>
            <p className='text-muted-foreground'>
              Manage the application alert escalation here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
          Level 1
          <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 1) || []} columns={columns} />
        </div>
        <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
          Level 2
          <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 2) || []} columns={columns} />
        </div>
        <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
          Level 3
          <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 3) || []} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </>
  )
}
