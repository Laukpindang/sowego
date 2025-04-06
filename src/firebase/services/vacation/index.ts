import { getFirestore, getDocs, getDoc, collection, doc, addDoc, updateDoc } from 'firebase/firestore'

import app from '@/firebase/config'

const db = getFirestore(app)

import type { Vacation } from '@/types/Vacation'

export const getVacations = async () => {
  try {
    const vacations: Vacation[] = []
    const res = await getDocs(collection(db, 'vacation'))
    res.forEach(doc => {
      vacations.push({
        id: doc.id,
        city: doc.data().city,
        price: doc.data().price,
        day_trip: doc.data().day_trip,
        country: doc.data().country,
        rating: doc.data().rating,
        quota: doc.data().quota
      })
    })
    return vacations
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const getVacationById = async (id: string) => {
  try {
    const vacationRef = doc(db, 'vacation', id)
    return await getDoc(vacationRef)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const createVacation = async (data: Omit<Vacation, 'id'>) => {
  try {
    await addDoc(collection(db, 'vacation'), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const editVacation = async (id: string, data: Omit<Vacation, 'id'>) => {
  try {
    await updateDoc(doc(db, 'vacation', id), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}
