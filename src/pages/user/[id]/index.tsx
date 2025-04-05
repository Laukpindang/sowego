// THIS FILE IS NOT USED !

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getUserById } from '@/firebase/services/user'

import { Link } from 'react-router'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import { ArrowLeftIcon } from 'lucide-react'

import type { User } from '@/types/User'

const UserDetail = () => {
  const [userDetail, setUserDetail] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const params = useParams()

  useEffect(() => {
    setLoading(true)
    getUserById(params.id as string).then(res => {
      setUserDetail(res.data() as User)
      setLoading(false)
    })
  }, [params])

  if (loading) return <Skeleton />
  if (!userDetail) return 'Error'

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2 text-xl'>
          <ArrowLeftIcon />
          Detail User
        </div>
        <Button asChild>
          <Link to={`/user/${params.id}/edit`}>Edit</Link>
        </Button>
      </div>
      <div className='grid grid-cols-2'>
        <p>Name</p>
        <p>{userDetail.name}</p>
        <p>Email</p>
        <p>{userDetail.phone_number}</p>
      </div>
    </div>
  )
}

export default UserDetail
