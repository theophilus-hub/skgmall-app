import { AppState, Alert } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rfeoweuynhcrldkefooc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZW93ZXV5bmhjcmxka2Vmb29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwMDkzNTksImV4cCI6MjAzMTU4NTM1OX0.bOgJWyi_4Ajnk87Ve4xud77vRWBXiwF0JJVNPMZtncg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})


export async function signUpWithEmail(email: string, password: string) {
    const { data: { session }, error } = await supabase.auth.signUp({email: email, password: password })

    if(error) {
        throw error;       
    }

    return session;
}


export async function signInWithEmail(email: string, password: string) {
  
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
 
      if (error != null) throw new Error('error')
      
    }


export async function updateUserProfile(id: string, firstName: string, lastName: string, phoneNumber: string) {

  const { error } = await supabase
  .from('profiles')
  .update({ first_name: firstName, last_name: lastName, phone_number: phoneNumber })
  .eq('id', id)

  if (error != null) throw new Error('error')
    console.log(error)
  
}

export async function clientSession() {
  const { data: { session }, error } = await supabase.auth.getSession()

  console.log(error)

  if (error) {
    throw error
  }

  return session;
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();

  return user;
}

export async function getData(){
  const { data, error } = await supabase.from('categories').select()
  if(error){
    throw error;
  }else{
   return({ data })
  }
}