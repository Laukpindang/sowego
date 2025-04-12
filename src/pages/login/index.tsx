import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useState } from 'react'

import { login } from '@/firebase/auth'
import { useAuth } from '@/context/auth-context'

import { Link } from 'react-router'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, 'Password must be one lowercase, one uppercase, and one number')
})

type Schema = z.infer<typeof schema>

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

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
        navigate('/destination', { replace: true })
        return `Welcome back ${data.user.displayName ? data.user.displayName : ''}`
      },
      error: 'Login failed'
    })
  }

  return (
    <div className='mx-auto my-40 flex max-w-lg flex-col gap-4 rounded border p-5'>
      <h1 className='text-center text-2xl'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-4'>
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
                <div className='relative'>
                  <FormControl>
                    <Input type={showPassword ? 'text' : 'password'} {...field} />
                  </FormControl>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to='/auth/register' className='text-right'>
            Doesn't have an account? Register!
          </Link>
          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
