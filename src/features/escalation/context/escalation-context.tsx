import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'

type EscalationDialogType = 'add' | 'remove'

interface EscalationContextType {
  open: EscalationDialogType | null
  setOpen: (str: EscalationDialogType | null) => void
  currentAppUserList: any
  setCurrentAppUserList: any
  currentAppUser: any
  setCurrentAppUser: any
}

const EscalationContext = React.createContext<EscalationContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function EscalationProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<EscalationDialogType>(null)
  const [currentAppUserList, setCurrentAppUserList] = useState([])
  const [currentAppUser, setCurrentAppUser] = useState<any>(null)

  return (
    <EscalationContext value={{
      open,
      setOpen,
      currentAppUserList,
      setCurrentAppUserList,
      currentAppUser,
      setCurrentAppUser
    }}>
      {children}
    </EscalationContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEscalation = () => {
  const escalationContext = React.useContext(EscalationContext)

  if (!escalationContext) {
    throw new Error('useEscalation has to be used within <EscalationContext>')
  }

  return escalationContext
}
