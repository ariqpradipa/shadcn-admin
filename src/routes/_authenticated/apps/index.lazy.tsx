import Apps from '@/features/apps'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/apps/')({
  component: Apps,
})
