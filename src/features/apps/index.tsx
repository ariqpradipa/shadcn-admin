import { useEffect, useState } from 'react'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { DataItemAction } from './components/data-item-actions'
import { apps } from './data/apps'

const appText = new Map<string, string>([
  ['all', 'All Apps'],
  ['Business Support', 'Business Support'],
  ['Business Important', 'Business Important'],
  ['Business Critical', 'Business Critical'],
  ['Mission Critical', 'Mission Critical']
])

export default function Apps() {
  const [sort, setSort] = useState('ascending')
  const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  interface App {
    name: string;
    catalogId: string;
    description: string;
    priority: string;
  }

  const [appList, setAppList] = useState<App[]>([])

  useEffect(() => {
    const fetchApps = async () => {
      const data = await apps();
      setAppList(data);
    };

    fetchApps();
  }, []);

  const filteredApps = appList
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app: { name: string; catalogId: string }) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.catalogId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((app: any) => {
      if (appType === 'all') return true
      return app.priority === appType
    });

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='flex items-center gap-4 ml-auto'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Application Catalog
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of Telkomsel Application Catalog.
          </p>
        </div>
        <div className='flex items-end justify-between my-4 sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter apps...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className='w-fit'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Apps</SelectItem>
                <SelectItem value='Business Support'>Business Support</SelectItem>
                <SelectItem value='Business Critical'>Business Critical</SelectItem>
                <SelectItem value='Business Important'>Business Important</SelectItem>
                <SelectItem value='Mission Critical'>Mission Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />
        {
          appList.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No apps found.
            </p>
          ) : (
            <ul className='grid gap-4 pt-4 pb-16 overflow-auto faded-bottom no-scrollbar md:grid-cols-2 lg:grid-cols-3'>
              {filteredApps.map((app) => (
                <li
                  key={app.name}
                  className='p-4 border rounded-lg hover:shadow-md'
                >
                  <div className='flex items-center justify-between mb-8'>
                    <div>
                      <p
                        className='text-sm font-bold'
                      >
                        {app.catalogId}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {app.priority}
                      </p>
                    </div>
                    <DataItemAction app={app} />
                  </div>
                  <div>
                    <h2 className='mb-1 font-semibold'>{app.name}</h2>
                    <p className='text-xs text-gray-500 line-clamp-2'>{app.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </Main>
    </>
  )
}