import { Button } from '@/components/ui/button'
import { IconUserPlus } from '@tabler/icons-react'
import { useGroups } from '../context/groups-context'

export function GroupsPrimaryButtons() {
  const { setOpen } = useGroups()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Group</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
