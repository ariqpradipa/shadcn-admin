import { useEscalation } from '../context/escalation-context'
import { UsersActionDialog } from './users-action-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentAppUser, setCurrentAppUser } = useEscalation()
  return (
    <>
      <UsersActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentAppUser && (
        <>
          <UsersDeleteDialog
            key={`user-remove-${currentAppUser.id}`}
            open={open === 'remove'}
            onOpenChange={() => {
              setOpen('remove')
              setTimeout(() => {
                setCurrentAppUser(null)
              }, 500)
            }}
            currentAppUser={currentAppUser}
          />
        </>
      )}
    </>
  )
}
