import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { createDestination } from '@/firebase/services/destination'

import Header from '@/components/header'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  city: z.string().min(1),
  price: z.string().min(1),
  discount: z.string().min(1),
  country: z.string().min(1),
  rating: z.string().min(0).max(5),
  quota: z.string().min(1)
})

type Schema = z.infer<typeof schema>

const AddDestinationPage = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: '',
      price: '',
      discount: '',
      country: '',
      rating: '',
      quota: ''
    }
  })

  const navigate = useNavigate()

  const submit = async (data: Schema) => {
    toast.promise(
      createDestination({
        ...data,
        discount: parseInt(data.discount),
        price: parseInt(data.price),
        rating: parseInt(data.rating),
        quota: parseInt(data.quota)
      }),
      {
        loading: 'Creating destination...',
        success: () => {
          navigate('/destination')
          return 'Add destination success'
        },
        error: 'Add destination failed'
      }
    )
  }

  return (
    <>
      <Header title='Add Destination' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon onClick={() => navigate('/destination')} />
          Add Destination
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quota'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quota</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='max-w-16 self-end'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default AddDestinationPage
