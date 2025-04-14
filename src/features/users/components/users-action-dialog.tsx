'use client'
import { useEffect, useState } from 'react'

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
import { groups } from '@/features/groups/data/groups'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userTypes } from '../data/data'
import { organizations } from '../data/organizations'

import { groupListSchema } from '@/features/groups/data/schema'
import { User, userOrganizationListSchema } from '../data/schema'

const formSchema = z
  .object({
    id: z.string().optional(),
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

  const [groupList, setGroupList]: any = useState([]);
  const [organizationList, setOrganizationList]: any = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await groups();
      console.log("Data", data);
      const parsed = groupListSchema.parse(data);
      console.log("Parsed")
      setGroupList(parsed);
    };

    const fetchOrganizations = async () => {
      const data = await organizations();
      console.log("Data", data);
      const parsed = userOrganizationListSchema.parse(data);
      console.log("Parsed")
      setOrganizationList(parsed);
    }

    fetchOrganizations();
    fetchGroups();
  }, []);

  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
        group: currentRow.groupId || "",
        organization: currentRow.organizationId || "",
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

    const data = {
      "email": values.email,
      "role": values.role,
      "groupId": values.group,
      "organizationId": values.organization,
    }

    if (isEdit) {
      // Update user logic
      console.log('Updating user:', values)
      // axios post request
      axios.put(`/users/${values.id}`, data)
        .then((response) => {
          console.log('User updated successfully:', response.data)
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
      axios.post('/users', data)
        .then((response) => {
          console.log('User created successfully:', response.data)
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
                      items={groupList.map(({ name, id }: any) => ({
                        label: name,
                        value: id,
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
                      items={organizationList.map(({ name, id }: any) => ({
                        label: name,
                        value: id,
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
