import { useEffect } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from "@/components/ui/separator"
import { Route } from '@/routes/_authenticated/apps/escalation/$appId/index.lazy'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import EscalationProvider, { useEscalation } from './context/escalation-context'
import { apps, appUserLevelsAppId } from './data/escalation'

export default function Escalation() {
  return (
    <EscalationProvider>
      <EscalationContent />
    </EscalationProvider>
  )
}

function EscalationContent() {
  const { appId } = Route.useParams()
  const { currentAppUserList, setCurrentAppUserList, currentApp, setCurrentApp, reloadIndex } = useEscalation()


  useEffect(() => {
    const fetchApp = async () => {
      const data = await apps(appId);
      console.log("Data", data);

      setCurrentApp(data);
    }

    const fetchUsers = async () => {
      const data = await appUserLevelsAppId(appId);
      console.log("Data", data);

      setCurrentAppUserList(data);
    };

    fetchApp();
    fetchUsers();
  }, [reloadIndex]);

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
            <h2 className='text-xl font-bold tracking-tight'>
              Application Escalation
            </h2>
            <h2 className='text-2xl font-bold tracking-tight'>
              {currentApp ? `${currentApp?.name} (${currentApp.catalogId})` : ""}
            </h2>
            <p className='text-muted-foreground'>
              Manage the application alert escalation here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p>Level 1</p>
            <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
              <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 1) || []} columns={columns} />
            </div>
            <Separator />
          </div>
          <div className='flex flex-col gap-2'>
            <p>Level 2</p>
            <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
              <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 2) || []} columns={columns} />
            </div>
            <Separator />
          </div>
          <div className='flex flex-col gap-2'>
            <p>Level 3</p>
            <div className='flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
              <UsersTable data={currentAppUserList?.filter((user: any) => user.level === 3) || []} columns={columns} />
            </div>
          </div>
        </div>
      </Main>
      <UsersDialogs />
    </>
  )
}
