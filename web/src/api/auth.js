import api, { setToken, makeGoogleAuthURL } from './init'
import { getDecodedToken } from './token'

// Sends a POST request to /auth on the server, with the email & password returning the JWT
// Belonging to the user with supplied credentials
export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

// Open new window to begin google sign in process
export function googleSignIn() {
  window.open(makeGoogleAuthURL('/auth/google'))
}

// After google sign in process token is returned
export function googleDidSignInWithToken(token) {
  setToken(token)
  return getDecodedToken()
}

export function signOut() {
  setToken(null)
}
