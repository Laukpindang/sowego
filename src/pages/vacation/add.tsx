import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { createVacation } from '@/firebase/services/vacation'

import Header from '@/components/header'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  city: z.string().min(1),
  price: z.string().min(1),
  day_trip: z.string().min(1),
  country: z.string().min(1),
  rating: z.string().min(0).max(5),
  quota: z.string().min(1)
})

type Schema = z.infer<typeof schema>

const AddVacationPage = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: '',
      price: '',
      day_trip: '',
      country: '',
      rating: '',
      quota: ''
    }
  })

  const navigate = useNavigate()

  const submit = async (data: Schema) => {
    toast.promise(
      createVacation({
        ...data,
        day_trip: parseInt(data.day_trip),
        price: parseInt(data.price),
        rating: parseInt(data.rating),
        quota: parseInt(data.quota)
      }),
      {
        loading: 'Creating vacation...',
        success: () => {
          navigate('/vacation')
          return 'Add vacation success'
        },
        error: 'Add vacation failed'
      }
    )
  }

  return (
    <>
      <Header title='Add Vacation' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon onClick={() => navigate('/vacation')} />
          Add Vacation
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
              name='day_trip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day Trip</FormLabel>
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

export default AddVacationPage
