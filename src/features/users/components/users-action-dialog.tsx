'use client'

import { SelectDropdown } from '@/components/select-dropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userTypes } from '../data/data'
import { User } from '../data/schema'

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Email is invalid.' }),
    role: z.string().min(1, { message: 'Role is required.' }),
    group: z.string().min(1, { message: 'Group is required.' }),
    organization: z.string().min(1, { message: 'Organization is required.' }),
    isEdit: z.boolean(),
  })
type UserForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
        isEdit,
      }
      : {
        email: '',
        role: '',
        group: '',
        organization: '',
        isEdit,
      },
  })

  const onSubmit = (values: UserForm) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full py-1 pr-4 -mr-4 overflow-y-auto'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john.doe@gmail.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='group'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Group
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a group'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='organization'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Organization
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select an organization'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
