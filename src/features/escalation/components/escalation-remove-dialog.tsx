'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '@/features/users/data/schema'
import { toast } from '@/hooks/use-toast'
import { IconAlertTriangle } from '@tabler/icons-react'
import axios from 'axios'
import { useEscalation } from '../context/escalation-context'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentAppUser: User
}

export function EscalationRemoveUserDialog({ open, onOpenChange, currentAppUser }: Props) {

  const { setReloadIndex } = useEscalation()

  const handleRemove = () => {
    axios.delete(`/app-user-levels/${currentAppUser.id}`)
      .then(() => {
        setReloadIndex((prev: boolean) => !prev)
        toast({
          title: 'User removed',
          description: `User ${currentAppUser.username} has been removed.`,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error removing user',
          description: error.response.data.message,
          variant: 'destructive',
        })
      })

    onOpenChange(false)
    toast({
      title: 'The following user has been removed:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentAppUser, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleRemove}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='inline-block mr-1 stroke-destructive'
            size={18}
          />{' '}
          Remove User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to remove{' '}
            <span className='font-bold'>{currentAppUser.username}</span>?
            <br />
            This action will remove the user from the escalation.
          </p>
        </div>
      }
      confirmText='Remove'
      destructive
    />
  )
}
