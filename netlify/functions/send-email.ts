import type { Handler } from '@netlify/functions'
import { render } from '@react-email/render'
import * as React from 'react'
import { Resend } from 'resend'
import RegisterEmail from '../../emails/registration'

const resend = new Resend(process.env.RESEND_API_KEY)

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, body: 'ok' }
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

    let body: { name?: string; email?: string }
    try {
      body = JSON.parse(event.body || '{}')
    } catch {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'JSON inválido en la solicitud' }) }
    }
    const { name, email } = body
    if (!name || !email) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Falta el nombre o el correo' }) }
    }

    // 4) Render email
    const emailElement = React.createElement(RegisterEmail, { name, email })
    const html = await render(emailElement)

    const devMode = process.env.DEV_MODE?.trim().toLowerCase() === 'true'
    const recipient = devMode ? process.env.TEST_MAILBOX?.trim() : email

    if (!recipient) {
      const message = devMode
        ? 'DEV_MODE está activo, pero TEST_MAILBOX no está configurado en Netlify.'
        : 'No se recibió un correo destinatario válido.'
      console.error(message)
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: message }) }
    }

    console.log(`Enviando correo a ${recipient} (DEV_MODE=${devMode})`)

    // 5) Envía correo

    const { error } = await resend.emails.send({
      from: 'Evento Eucerin <notificaciones@unlockingskinlongevity.com>',
      to: recipient,
      subject: 'Registro exitoso',
      html
    })

    if (error) {
      console.error('Resend error:', error)
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: error.message }) }
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err: unknown) {
    console.log(err)

    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: (err as Error)?.message || 'Error al enviar el correo' })
    }
  }
}
