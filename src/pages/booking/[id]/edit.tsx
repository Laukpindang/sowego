import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'

import { editBooking, getBookingById } from '@/firebase/services/booking'

import Header from '@/components/header'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1),
  phone_number: z.string().min(1),
  destination: z.string().min(1)
})

type Schema = z.infer<typeof schema>

const EditBookingPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone_number: '',
      destination: ''
    }
  })

  const navigate = useNavigate()
  const params = useParams()

  const submit = async (data: Schema) => {
    toast.promise(editBooking(params.id as string, data), {
      loading: 'Edit booking...',
      success: () => {
        navigate('/booking')
        return 'Edit booking success'
      },
      error: 'Edit booking failed'
    })
  }

  useEffect(() => {
    setLoading(true)
    getBookingById(params.id as string).then(res => {
      form.setValue('name', res.data()!.name ?? '')
      form.setValue('phone_number', res.data()!.phone_number ?? '')
      form.setValue('destination', res.data()!.destination ?? '')
      setLoading(false)
    })
  }, [params])

  if (loading) return <Skeleton />

  return (
    <>
      <Header title='Edit Booking' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon onClick={() => navigate('/booking')} />
          Edit Booking
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

export default EditBookingPage
