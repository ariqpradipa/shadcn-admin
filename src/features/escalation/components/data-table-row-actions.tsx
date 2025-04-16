import { Button } from '@/components/ui/button'
import { User } from '@/features/users/data/schema'
import { Row } from '@tanstack/react-table'
import { useEscalation } from '../context/escalation-context'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentAppUser } = useEscalation()

  return (
    <Button
      variant='destructive'
      size={'sm'}
      onClick={() => {
        setCurrentAppUser(row.original)
        setOpen('remove')
      }}
    >
      <p>Remove</p>
    </Button>
  )
}
