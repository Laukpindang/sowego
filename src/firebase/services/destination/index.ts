import { getFirestore, getDocs, getDoc, collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

import app from '@/firebase/config'

const db = getFirestore(app)

import type { Destination } from '@/types/Destination'

export const getDestinations = async () => {
  try {
    const destinations: Destination[] = []
    const res = await getDocs(collection(db, 'destination'))
    res.forEach(doc => {
      destinations.push({
        id: doc.id,
        city: doc.data().city,
        price: doc.data().price,
        discount: doc.data().discount,
        country: doc.data().country,
        rating: doc.data().rating,
        quota: doc.data().quota
      })
    })
    return destinations
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const getDestinationById = async (id: string) => {
  try {
    const destinationRef = doc(db, 'destination', id)
    return await getDoc(destinationRef)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const createDestination = async (data: Omit<Destination, 'id'>) => {
  try {
    await addDoc(collection(db, 'destination'), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const editDestination = async (id: string, data: Omit<Destination, 'id'>) => {
  try {
    await updateDoc(doc(db, 'destination', id), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const deleteDestination = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'destination', id))
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}
