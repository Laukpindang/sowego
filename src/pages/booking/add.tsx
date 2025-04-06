import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { createBooking } from '@/firebase/services/booking'

import Header from '@/components/header'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1),
  phone_number: z.string().min(1),
  destination: z.string().min(1)
})

type Schema = z.infer<typeof schema>

const AddBookingPage = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone_number: '',
      destination: ''
    }
  })

  const navigate = useNavigate()

  const submit = async (data: Schema) => {
    toast.promise(createBooking(data), {
      loading: 'Creating booking...',
      success: () => {
        navigate('/booking')
        return 'Add booking success'
      },
      error: 'Add booking failed'
    })
  }

  return (
    <>
      <Header title='Add Booking' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon onClick={() => navigate('/booking')} />
          Add Booking
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='destination'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

export default AddBookingPage
