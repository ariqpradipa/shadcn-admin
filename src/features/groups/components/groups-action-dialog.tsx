'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { groups } from '../data/groups'
import { Group, groupListSchema } from '../data/schema'

const formSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    isEdit: z.boolean(),
  })
type GroupForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupsActionDialog({ currentRow, open, onOpenChange }: Props) {

  const [groupList, setGroupList]: any = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await groups();
      console.log("Data", data);
      const parsed = groupListSchema.parse(data);
      console.log("Parsed")
      setGroupList(parsed);
    };

    fetchGroups();
  }, []);

  const isEdit = !!currentRow
  const form = useForm<GroupForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
        isEdit,
      }
      : {
        name: '',
        description: '',
        isEdit,
      },
  })

  const onSubmit = (values: GroupForm) => {
    form.reset()

    const data = {
      "name": values.name,
      "description": values.description,
    }

    if (isEdit) {
      // Update grou logic
      console.log('Updating group:', values)
      // axios post request
      axios.put(`/groups/${values.id}`, data)
        .then((response) => {
          console.log('Group updated successfully:', response.data)
          toast({
            title: 'Group updated successfully',
            description: 'The group has been updated.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error updating group:', error)
          toast({
            title: 'Error updating group',
            description: error.message,
            variant: 'destructive',
          })
        })
    } else {
      // Create group logic
      console.log('Creating group:', values)
      // axios post request
      axios.post('/groups', data)
        .then((response) => {
          console.log('Group created successfully:', response.data)
          toast({
            title: 'Group created successfully',
            description: 'The group has been created.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error creating group:', error)
          toast({
            title: 'Error creating group',
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
          <DialogTitle>{isEdit ? 'Edit Grooup' : 'Add New Group'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the group here. ' : 'Create new group here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full py-1 pr-4 -mr-4 overflow-y-auto'>
          <Form {...form}>
            <form
              id='group-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='IT-OAR'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-y-2'>
                    <FormLabel className='text-left'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='This group is...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='group-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
