import Escalation from '@/features/escalation'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated/apps/escalation/$appId/',
)({
  component: Escalation,
})
