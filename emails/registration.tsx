// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails
import React from 'react'
import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Tailwind, Text } from 'react-email'
import { Fonts } from './Fonts'
import { emailTailwindConfig } from './theme'

interface FeatureAnnouncementEmailProps {
  name: string
  email: string
  baseUrl: string
}

export const FeatureAnnouncementEmail = ({ name, baseUrl }: FeatureAnnouncementEmailProps) => {
  if (!React) return null

  return (
    <Tailwind config={emailTailwindConfig as any}>
      <Html>
        <Head>
          <Fonts />
        </Head>

        <Body className='bg-canvas font-14 font-montserrat text-fg m-0 p-0'>
          <Preview>Tu participación en Eucerin Unlocking Skin Longevity ha quedado registrada.</Preview>
          <Container className='mx-auto max-w-[600px] px-4 pt-16 pb-6'>
            <Section className='shadow-collage-card rounded-2xl'>
              <Section className='bg-bg border-stroke rounded-2xl border'>
                <Section className='p-0'>
                  <Img
                    src={`${baseUrl}/static/assets-mail/header.png`}
                    alt=''
                    width={600}
                    className='block w-full max-w-[600px] border-none rounded-t-2xl'
                  />
                </Section>

                <Section className='mobile:px-6!  px-10 pt-5 pb-0 text-left'>
                  <Section className='mb-9 text-left'>
                    <Text className='font-25 text-primary m-0 font-montserrat uppercase'>¡Tu registro está confirmado!</Text>
                    <Text className='font-20 text-fg m-0 font-montserrat font-semibold pt-5'>Hola, {name}:</Text>
                    <Text className='font-14 font-montserrat text-base m-0 mt-[18px]'>
                      Gracias por registrarte a Eucerin Unlocking Skin Longevity. <br />
                      Tu participación ha quedado confirmada. Nos encantará recibirte en un encuentro dedicado a la ciencia y al futuro de
                      la piel.
                    </Text>
                  </Section>
                </Section>

                <Section className='mobile:px-5! px-10 py-0'>
                  <Section className='p-6 bg-[#F5F6FB] border border-[#E7EAF3] rounded-2xl'>
                    <Text className='font-12 font-montserrat m-0 text-accent font-semibold uppercase'>Detalles del evento</Text>
                    <Section className='pt-5'>
                      <Row>
                        <Column className='w-[15%] mobile:w-[25%] text-left align-middle'>
                          <Img
                            src={`${baseUrl}/static/assets-mail/icono-calendar.png`}
                            alt=''
                            width={44}
                            height={44}
                            className='inline-block border-none align-middle'
                          />
                        </Column>
                        <Column className='w-[85%] mobile:w-[75%] align-top'>
                          <Text className='font-11 font-montserrat font-semibold uppercase text-accent m-0 '>Fecha y horario</Text>
                          <Text className='font-15 font-montserrat text-primary font-semibold m-0 '>15 de octubre de 2026</Text>
                          <Text className='font-12 font-montserrat text-base  m-0'>09:00 hrs - 12:00 hrs</Text>
                        </Column>
                      </Row>
                      <Row>
                        <Column className='text-center align-middle'>
                          <div className='border-t border-[#E7EAF3] my-4' />
                        </Column>
                      </Row>
                      <Row>
                        <Column className='w-[15%] mobile:w-[25%] text-left align-middle'>
                          <Img
                            src={`${baseUrl}/static/assets-mail/icono-calendar.png`}
                            alt=''
                            width={44}
                            height={44}
                            className='inline-block border-none align-middle'
                          />
                        </Column>
                        <Column className='w-[85%] mobile:w-[75%] align-top'>
                          <Text className='font-11 font-montserrat font-semibold uppercase text-accent m-0 '>Sede</Text>
                          <Text className='font-15 font-montserrat text-primary font-semibold m-0 '>InSpace Polanco</Text>
                          <Text className='font-12 font-montserrat text-base  m-0'>
                            Ciudad de México <br />
                            Ciudad de México
                          </Text>
                        </Column>
                      </Row>
                    </Section>
                  </Section>
                </Section>

                <Section className='mobile:px-6! mobile:pt-0 px-10 pt-5 pb-0 text-left'>
                  <Section className='mb-9 text-left'>
                    <Text className='font-montserrat text-base text-fg-2 m-0 mt-[18px]'>
                      Te recomendamos conservar este correo y llegar unos minutos antes del inicio del evento.
                    </Text>
                    <Text className='font-15 font-montserrat font-semibold text-primary m-0 mt-[18px]'>¡Nos vemos pronto!</Text>
                  </Section>
                </Section>

                <Section className='border-stroke border-t px-10 py-5 bg-footer'>
                  <Text className='font-12 font-montserrat text-primary m-0 font-semibold '>Eucerin · Unlocking Skin Longevity</Text>
                  <Text className='font-11 font-montserrat text-base  m-0 '>
                    Este mensaje confirma tu registro al evento del 15 de octubre de 2026.
                  </Text>
                </Section>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

FeatureAnnouncementEmail.PreviewProps = {
  name: 'Edgar Moreira Ortiz',
  email: 'prueba@mail.com',
  baseUrl: 'http://localhost:3000'
} satisfies FeatureAnnouncementEmailProps

export default FeatureAnnouncementEmail
