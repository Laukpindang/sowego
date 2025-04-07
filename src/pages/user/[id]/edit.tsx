import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'

import { editUser, getUserById } from '@/firebase/services/user'

import Header from '@/components/header'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  name: z.string().min(3).max(50),
  phone_number: z.string().min(10)
})

type Schema = z.infer<typeof schema>

const EditUserPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone_number: ''
    }
  })

  const navigate = useNavigate()
  const params = useParams()

  const submit = async (data: Schema) => {
    toast.promise(editUser(params.id as string, data), {
      loading: 'Editing user...',
      success: () => {
        navigate(`/user`)
        return 'Edit user success'
      },
      error: 'Edit user failed'
    })
  }

  useEffect(() => {
    setLoading(true)
    getUserById(params.id as string).then(res => {
      form.setValue('name', res.data()!.name ?? '')
      form.setValue('phone_number', res.data()!.phone_number ?? '')
      setLoading(false)
    })
  }, [params])

  if (loading) return <Skeleton />

  return (
    <>
      <Header title='Edit User' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon onClick={() => navigate('/user')} />
          Edit User
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
            <Button type='submit' className='max-w-16 self-end'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default EditUserPage
