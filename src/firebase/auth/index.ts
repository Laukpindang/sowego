import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

import app from '../config'

const auth = getAuth(app)

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const loginGoogle = async () => {
  const user = await signInWithPopup(auth, new GoogleAuthProvider())
  return user.user
}

export const logout = () => {
  return auth.signOut()
}

export default auth
