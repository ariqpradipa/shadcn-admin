import Groups from '@/features/groups'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/groups/')({
  component: Groups,
})
