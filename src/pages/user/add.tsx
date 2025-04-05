import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { createUser } from '@/firebase/services/user'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ArrowLeftIcon } from 'lucide-react'

const schema = z.object({
  name: z.string().min(3).max(50),
  phone_number: z.string().min(10)
})

type Schema = z.infer<typeof schema>

const AddUserPage = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone_number: ''
    }
  })

  const navigate = useNavigate()

  const submit = async (data: Schema) => {
    toast.promise(createUser(data), {
      loading: 'Creating user...',
      success: () => {
        navigate('/')
        return 'Add user success'
      },
      error: 'Add user failed'
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2 text-xl'>
        <ArrowLeftIcon />
        Add User
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
  )
}

export default AddUserPage
