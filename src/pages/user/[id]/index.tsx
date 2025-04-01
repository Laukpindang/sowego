import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getUserById } from '@/firebase/services/user'

import type { User } from '@/types/User'

const UserDetail = () => {
  const [userDetail, setUserDetail] = useState<User | null>(null)

  const params = useParams()

  useEffect(() => {
    getUserById(params.id as string).then(res => setUserDetail(res.data() as User))
  }, [params])

  return (
    <div>
      <h1>UserDetail</h1>
      <div className='grid grid-cols-2'>
        <p>Name</p>
        <p>{userDetail?.username}</p>
        <p>Email</p>
        <p>{userDetail?.email}</p>
      </div>
    </div>
  )
}

export default UserDetail
