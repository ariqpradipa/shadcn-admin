'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { IconAlertTriangle } from '@tabler/icons-react'
import axios from 'axios'
import { useState } from 'react'
import { useGroups } from '../context/groups-context'
import { Group } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Group
}

export function GroupsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { setReloadIndex } = useGroups()
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (!currentRow || value.trim() !== currentRow.name) return

    axios.delete(`/groups/${currentRow.id}`)
      .then(() => {
        setReloadIndex((prev: boolean) => !prev)
        toast({
          title: 'Group deleted',
          description: `Group ${currentRow.name} has been deleted.`,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error deleting group',
          description: error.response.data.message,
          variant: 'destructive',
        })
      })

    onOpenChange(false)
    toast({
      title: 'The following group has been deleted:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={!currentRow || value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='inline-block mr-1 stroke-destructive'
            size={18}
          />{' '}
          Delete Group
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow?.name ?? 'Unknown Group'}</span>?
            <br />
            This action will permanently remove the Group from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter group name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
