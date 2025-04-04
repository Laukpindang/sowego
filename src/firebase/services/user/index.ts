import { getFirestore, getDocs, getDoc, collection, doc, addDoc, updateDoc } from 'firebase/firestore'

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
        name: doc.data().name,
        phone_number: doc.data().phone_number
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
    await addDoc(collection(db, 'user'), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const editUser = async (id: string, data: Omit<User, 'id'>) => {
  try {
    await updateDoc(doc(db, 'user', id), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}
