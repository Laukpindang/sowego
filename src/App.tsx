import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email()
})

type Schema = z.infer<typeof schema>

function App() {
  const form = useForm<Schema>({ resolver: zodResolver(schema) })

  const submit = (data: Schema) => {
    console.log(data)
  }

  return (
    <>
      <h1 className='text-xl'>Hello</h1>
      <Button asChild>
        <Link to='/login'>Login</Link>
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default App
