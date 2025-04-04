import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'

import { editUser, getUserById } from '@/firebase/services/user'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50)
})

type Schema = z.infer<typeof schema>

const EditUserPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      username: ''
    }
  })

  const navigate = useNavigate()
  const params = useParams()

  const submit = async (data: Schema) => {
    toast.promise(editUser(params.id as string, data), {
      loading: 'Editing user...',
      success: () => {
        navigate(`/user/${params.id}`)
        return 'Edit user success'
      },
      error: 'Edit user failed'
    })
  }

  useEffect(() => {
    setLoading(true)
    getUserById(params.id as string).then(res => {
      form.setValue('email', res.data()!.email ?? '')
      form.setValue('username', res.data()!.username ?? '')
      setLoading(false)
    })
  }, [params])

  if (loading) return <Skeleton />

  return (
    <div className='flex gap-4 flex-col'>
      <div className='text-xl flex gap-2 items-center'>
        <ArrowLeftIcon />
        Edit User
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
  )
}

export default EditUserPage
