'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'

import { User } from '../data/schema'


import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { userListSchema } from '@/features/users/data/schema'
import { users } from '@/features/users/data/users'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { CheckIcon } from 'lucide-react'
import { useEscalation } from '../context/escalation-context'

const formSchema = z
  .object({
    id: z.string().optional(),
    user: z.string().min(1, { message: 'Group is required.' }),
    level: z.number().min(1, { message: 'Role is required.' }),
    isEdit: z.boolean(),
  })
type UserForm = z.infer<typeof formSchema>

interface Props {
  currentAppUser?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

const appUserLevelList = [
  {
    label: "1",
    value: "1"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "3"
  }
]

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

export function UsersActionDialog({ currentAppUser, open, onOpenChange }: Props) {

  const { currentAppUserList } = useEscalation()

  const [notAttachedAppUserList, setNotAttachedAppUserList]: any = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await users();
      const parsed = userListSchema.parse(data);

      const notAttachedAppUserList = parsed.filter((user: { id: string }) => {
        return !currentAppUserList.some((currentUser: { id: string }) => currentUser.id === user.id);
      });
      setNotAttachedAppUserList(notAttachedAppUserList);
    };

    fetchUsers();
  }, []);

  const isEdit = !!currentAppUser
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentAppUser,
        isEdit,
      }
      : {
        user: '',
        level: 1,
        isEdit,
      },
  })

  const onSubmit = (values: UserForm) => {
    form.reset()

    // const data = {
    //   "email": values.email,
    //   // "role": values.role,
    //   "groupId": values.group,
    //   "organizationId": values.organization,
    // }

    // if (isEdit) {
    //   // Update user logic
    //   console.log('Updating user:', values)
    //   // axios post request
    //   axios.put(`/users/${values.id}`, data)
    //     .then((response) => {
    //       console.log('User updated successfully:', response.data)
    //       toast({
    //         title: 'User updated successfully',
    //         description: 'The user has been updated.',
    //         variant: 'default',
    //       })
    //     })
    //     .catch((error) => {
    //       console.error('Error updating user:', error)
    //       toast({
    //         title: 'Error updating user',
    //         description: error.message,
    //         variant: 'destructive',
    //       })
    //     })
    // } else {
    //   // Create user logic
    //   console.log('Creating user:', values)
    //   // axios post request
    //   axios.post('/users', data)
    //     .then((response) => {
    //       console.log('User created successfully:', response.data)
    //       toast({
    //         title: 'User created successfully',
    //         description: 'The user has been created.',
    //         variant: 'default',
    //       })
    //     })
    //     .catch((error) => {
    //       console.error('Error creating user:', error)
    //       toast({
    //         title: 'Error creating user',
    //         description: error.message,
    //         variant: 'destructive',
    //       })
    //     })
    // }

    console.log(values)
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
                name='user'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                              : 'Select language'}
                            <CaretSortIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search language...' />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {notAttachedAppUserList.map((user: any) => (
                                <CommandItem
                                  value={user.id}
                                  key={user.displayName}
                                  onSelect={() => {
                                    form.setValue('user', user.id)
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      user.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {user.displayName}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Level
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={'1'}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      items={appUserLevelList}
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
