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

import { User } from '@/features/users/data/schema'


import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { userListSchema } from '@/features/users/data/schema'
import { users } from '@/features/users/data/users'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import axios from 'axios'
import { CheckIcon } from 'lucide-react'
import { useEscalation } from '../context/escalation-context'

const formSchema = z
  .object({
    id: z.string().optional(),
    user: z.string().min(1, { message: 'User is required.' }),
    level: z.string().min(1, { message: 'Level is required.' }),
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

export function EscalationActionDialog({ currentAppUser, open, onOpenChange }: Props) {

  const { currentAppUserList, currentApp, setReloadIndex } = useEscalation()

  const [notAttachedAppUserList, setNotAttachedAppUserList]: any = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await users();
      const parsed = userListSchema.parse(data);

      const currentUserList = currentAppUserList.map((data: any) => ({
        ...data.user,
      }));

      const notAttachedAppUserList = parsed.filter((user: { id: string }) =>
        !currentUserList.some((currentUser: { id: string }) => currentUser.id === user.id)
      );

      setNotAttachedAppUserList(notAttachedAppUserList);
    };

    fetchUsers();
  }, [currentAppUserList]);

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
        level: "1",
        isEdit,
      },
  })

  const onSubmit = (values: UserForm) => {
    form.reset()

    const data = {
      "userId": values.user,
      "appId": currentApp.id,
      "level": values.level,
    }

    console.log(data)

    if (isEdit) {
      // Update user logic
      console.log('Updating user:', values)
      // axios post request
      axios.put(`/app-user-levels/${values.id}`, data)
        .then((response) => {
          console.log('User updated successfully:', response.data)
          setReloadIndex((prev: boolean) => !prev)
          toast({
            title: 'User updated successfully',
            description: 'The user has been updated.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error updating user:', error)
          toast({
            title: 'Error updating user',
            description: error.message,
            variant: 'destructive',
          })
        })
    } else {
      // Create user logic
      console.log('Creating user:', values)
      // axios post request
      axios.post('/app-user-levels', data)
        .then((response) => {
          console.log('User created successfully:', response.data)
          setReloadIndex((prev: boolean) => !prev)
          toast({
            title: 'User created successfully',
            description: 'The user has been created.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error creating user:', error)
          toast({
            title: 'Error creating user',
            description: error.message,
            variant: 'destructive',
          })
        })
    }

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
                name="user"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>User</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? notAttachedAppUserList.find(
                                (user: any) => user.id === field.value
                              )?.username || "Select user"
                              : "Select user"}
                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search user..." />
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {notAttachedAppUserList.map((user: any) => (
                                <CommandItem
                                  key={user.id}
                                  value={user.id}
                                  onSelect={() => {
                                    form.setValue("user", user.id);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      user.id === field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {user.username}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the user that will be added to the escalation PIC.
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
                      placeholder='Select a level'
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
