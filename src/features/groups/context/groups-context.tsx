import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'
import { Group } from '../data/schema'

type GroupsDialogType = 'add' | 'edit' | 'delete'

interface GroupsContextType {
  open: GroupsDialogType | null
  setOpen: (str: GroupsDialogType | null) => void
  currentRow: Group | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Group | null>>
  reloadIndex: boolean
  setReloadIndex: React.Dispatch<React.SetStateAction<boolean>>
}

const GroupsContext = React.createContext<GroupsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function GroupsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<GroupsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Group | null>(null)
  const [reloadIndex, setReloadIndex] = useState(false)

  return (
    <GroupsContext value={{ open, setOpen, currentRow, setCurrentRow, reloadIndex, setReloadIndex }}>
      {children}
    </GroupsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGroups = () => {
  const groupsContext = React.useContext(GroupsContext)

  if (!groupsContext) {
    throw new Error('useGroups has to be used within <GroupsContext>')
  }

  return groupsContext;
}
