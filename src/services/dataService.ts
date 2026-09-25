import type { UserData } from '../types/UserData'
import { getSupabaseClient } from './supabase'

export async function registration(userData: UserData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await getSupabaseClient().from('user_data').insert(userData)

    if (error) throw error

    return { success: true }
  } catch (error) {
    const outputError = (error as any).message || 'Error desconocido'
    let returnError = 'No pudimos completar el registro. Inténtalo nuevamente.'

    //Revisar si el error es por duplicado y manejarlo de manera adecuada
    if ((error as any).code === '23505') {
      console.error('Error: El usuario ya está registrado.')
      returnError = 'El correo electrónico ya está registrado en el evento.'
    } else {
      console.error('Error al registrar el usuario:', outputError)
    }

    return { success: false, error: returnError }
  }
}
