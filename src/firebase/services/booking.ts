import { getFirestore, getDocs, getDoc, collection, doc, addDoc, updateDoc } from 'firebase/firestore'

import app from '@/firebase/config'

const db = getFirestore(app)

import type { Booking } from '@/types/Booking'

export const getBookings = async () => {
  try {
    const bookings: Booking[] = []
    const res = await getDocs(collection(db, 'booking'))
    res.forEach(doc => {
      bookings.push({
        id: doc.id,
        name: doc.data().name,
        phone_number: doc.data().phone_number,
        destination: doc.data().destination
      })
    })
    return bookings
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const getBookingById = async (id: string) => {
  try {
    const bookingRef = doc(db, 'booking', id)
    return await getDoc(bookingRef)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const createBooking = async (data: Omit<Booking, 'id'>) => {
  try {
    await addDoc(collection(db, 'booking'), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export const editBooking = async (id: string, data: Omit<Booking, 'id'>) => {
  try {
    await updateDoc(doc(db, 'booking', id), data)
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}
