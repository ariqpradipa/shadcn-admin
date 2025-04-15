import { Button } from '@/components/ui/button'
import { IconUserPlus } from '@tabler/icons-react'
import { useEscalation } from '../context/escalation-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useEscalation()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add PIC</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
