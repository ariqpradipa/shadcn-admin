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
import { useOrganizations } from '../context/organizations-context'
import { organizations } from '../data/organizations'
import { Organization, organizationListSchema } from '../data/schema'

const formSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    isEdit: z.boolean(),
  })
type OrganizationForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Organization
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrganizationsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { setReloadIndex } = useOrganizations()
  const [organizationList, setOrganizationList]: any = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const data = await organizations();
      console.log("Data", data);
      const parsed = organizationListSchema.parse(data);
      console.log("Parsed")
      setOrganizationList(parsed);
    };

    fetchOrganizations();
  }, []);

  const isEdit = !!currentRow
  const form = useForm<OrganizationForm>({
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

  const onSubmit = (values: OrganizationForm) => {
    form.reset()

    const data = {
      "name": values.name,
      "description": values.description,
    }

    if (isEdit) {
      // axios post request
      axios.put(`/organizations/${values.id}`, data)
        .then((response) => {
          setReloadIndex((prev: boolean) => !prev)
          toast({
            title: 'Organization updated successfully',
            description: 'The organization has been updated.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error updating organization:', error)
          toast({
            title: 'Error updating organization',
            description: error.message,
            variant: 'destructive',
          })
        })
    } else {
      // axios post request
      axios.post('/organizations', data)
        .then((response) => {
          setReloadIndex((prev: boolean) => !prev);
          toast({
            title: 'Organization created successfully',
            description: 'The organization has been created.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Error creating organization:', error)
          toast({
            title: 'Error creating organization',
            description: error.message,
            variant: 'destructive',
          })
        })
    }
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
          <DialogTitle>{isEdit ? 'Edit Grooup' : 'Add New Organization'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the organization here. ' : 'Create new organization here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full py-1 pr-4 -mr-4 overflow-y-auto'>
          <Form {...form}>
            <form
              id='organization-form'
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
                        placeholder='This organization is...'
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
          <Button type='submit' form='organization-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
