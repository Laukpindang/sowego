import { getFirestore, getDocs, getDoc, collection, doc, addDoc } from 'firebase/firestore'

import app from '@/firebase/config'

import type { User } from '@/types/User'

const db = getFirestore(app)

export const getUsers = async () => {
  try {
    const users: User[] = []
    const res = await getDocs(collection(db, 'user'))
    res.forEach(doc => {
      users.push({
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username
      })
    })
    return users
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const getUserById = async (id: string) => {
  try {
    const userRef = doc(db, 'user', id)
    return await getDoc(userRef)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const createUser = async (data: Omit<User, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'user'), data)
    console.log('Success create user with ID: ', docRef.id)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}
