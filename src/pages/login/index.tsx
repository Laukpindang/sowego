import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { login } from '@/firebase/auth'
import { useAuth } from '@/context/auth-context'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, 'Password must be one lowercase, one uppercase, and one number')
})

type Schema = z.infer<typeof schema>

const Login = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { setUser } = useAuth()

  const navigate = useNavigate()

  const submit = async (data: Schema) => {
    toast.promise(login(data.email, data.password), {
      loading: 'Loggin in...',
      success: data => {
        setUser({
          email: data.user.email as string,
          id: data.user.uid,
          username: data.user.displayName ?? '',
          photo: data.user.photoURL ?? ''
        })
        navigate('/', { replace: true })
        return `Welcome back ${data.user.displayName ? data.user.displayName : ''}`
      },
      error: 'Login failed'
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
