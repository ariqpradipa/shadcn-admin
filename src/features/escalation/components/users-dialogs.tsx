import { useEscalation } from '../context/escalation-context'
import { EscalationActionDialog } from './escalation-action-dialog'
import { EscalationRemoveUserDialog } from './escalation-remove-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentAppUser, setCurrentAppUser } = useEscalation()
  return (
    <>
      <EscalationActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentAppUser && (
        <>
          <EscalationRemoveUserDialog
            key={`user-delete-${currentAppUser.id}`}
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
