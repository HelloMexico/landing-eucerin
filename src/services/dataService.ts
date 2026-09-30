import type { UserData } from '../types/UserData'
import { getSupabaseClient } from './supabase'

export async function registration(userData: UserData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await getSupabaseClient().from('user_data').insert(userData)

    if (error) throw error

    const emailResponse = await sendWelcomeEmail(userData.email, userData.name)
    if (!emailResponse.ok) {
      console.error('Error sending welcome email:', emailResponse.error)
    }

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

export async function sendWelcomeEmail(email: string, name: string): Promise<{ ok: boolean; error?: unknown }> {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    })
    const responseText = await response.text()
    let body: unknown = responseText
    try {
      body = responseText ? JSON.parse(responseText) : {}
    } catch {
      // Netlify, a proxy, or the email provider may return plain text/HTML on errors.
    }

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}: ${formatResponseBody(body)}` }
    }

    if (typeof body === 'object' && body !== null && 'ok' in body && body.ok === false) {
      return { ok: false, error: body }
    }

    return { ok: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { ok: false, error }
  }
}

function formatResponseBody(body: unknown): string {
  if (typeof body === 'string') return body || '(respuesta vacía)'
  return JSON.stringify(body)
}
