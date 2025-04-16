import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'
import { Organization } from '../data/schema'

type OrganizationsDialogType = 'add' | 'edit' | 'delete'

interface OrganizationsContextType {
  open: OrganizationsDialogType | null
  setOpen: (str: OrganizationsDialogType | null) => void
  currentRow: Organization | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Organization | null>>
  reloadIndex: boolean
  setReloadIndex: React.Dispatch<React.SetStateAction<boolean>>
}

const OrganizationsContext = React.createContext<OrganizationsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function OrganizationsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<OrganizationsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Organization | null>(null)
  const [reloadIndex, setReloadIndex] = useState(false)

  return (
    <OrganizationsContext value={{ open, setOpen, currentRow, setCurrentRow, reloadIndex, setReloadIndex }}>
      {children}
    </OrganizationsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrganizations = () => {
  const organizationContext = React.useContext(OrganizationsContext)

  if (!organizationContext) {
    throw new Error('useOrganizations has to be used within <OrganizationsContext>')
  }

  return organizationContext;
}
