import { Button } from '@/components/ui/button'
import { IconUserPlus } from '@tabler/icons-react'
import { useOrganizations } from '../context/organizations-context'

export function OrganizationsPrimaryButtons() {
  const { setOpen } = useOrganizations()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Organization</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
