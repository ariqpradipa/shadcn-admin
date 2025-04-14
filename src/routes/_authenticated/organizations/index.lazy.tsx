import Organizations from '@/features/organizations'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/organizations/')({
  component: Organizations,
})
