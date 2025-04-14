'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { IconAlertTriangle } from '@tabler/icons-react'
import axios from 'axios'
import { useState } from 'react'
import { Organization } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Organization
}

export function OrganizationsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (!currentRow || value.trim() !== currentRow.name) return

    axios.delete(`/organizations/${currentRow.id}`)
      .then(() => {
        toast({
          title: 'Organizations deleted',
          description: `Organizations ${currentRow.name} has been deleted.`,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error deleting organization',
          description: error.response.data.message,
          variant: 'destructive',
        })
      })

    onOpenChange(false)
    toast({
      title: 'The following organization has been deleted:',
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
          Delete Organizations
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow?.name ?? 'Unknown Organizations'}</span>?
            <br />
            This action will permanently remove the Organizations from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter organization name to confirm deletion.'
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
