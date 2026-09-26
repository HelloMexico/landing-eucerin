import { Button, Checkbox, InputGroup, Label, Radio, RadioGroup, TextField } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Calendar, Check, Mail, MapPin, User2, UserRoundGroup } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '../assets/branding/eucerin_logo.svg'
import { registration } from '../services/dataService'
import type { UserData } from '../types/UserData'

const registrationSchema = z.object({
  user_type: z.enum(['influencer', 'profesional'], { message: 'Selecciona un tipo de perfil.' }),
  name: z.string().trim().min(1, 'Escribe tu nombre completo.'),
  email: z.string().trim().email('Escribe un correo electrónico válido.'),
  accept_terms: z.boolean().refine((value) => value, 'Debes aceptar los términos y condiciones.')
})

type RegistrationFormData = z.infer<typeof registrationSchema>

const Landing = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
    defaultValues: {
      user_type: undefined,
      name: '',
      email: '',
      accept_terms: false
    }
  })

  const [wasSent, setWasSent] = useState(false)

  const termsAccepted = watch('accept_terms')
  const onSubmit = async ({ accept_terms: _acceptTerms, ...data }: RegistrationFormData) => {
    const result = await registration(data as UserData)

    if (!result.success) {
      setError('root', { message: result.error || 'Error desconocido' })
      setWasSent(false)
    } else {
      setWasSent(true)
    }
  }

  const profileOptions = [
    {
      icon: User2,
      title: 'Influencer dermatológico',
      value: 'influencer'
    },
    {
      icon: User2,
      title: 'Profesional de la salud',
      value: 'profesional'
    }
  ]

  if (wasSent) {
    return (
      <main className='success-message flex flex-col lg:flex-row gap-4  mx-auto p-4 bg-white/30 backdrop-blur-md drop-shadow-2xl md:max-w-xl'>
        <section className='flex-1 md:m-12 text-center space-y-6'>
          <div className='w-15 h-15 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto'>
            <Check className='text-accent size-8' />
          </div>
          <h1 className='text-3xl font-bold  flex flex-col'>¡Registro exitoso!</h1>
          <p className='text:lg md:text-xl  text-balance'>Tu participación en Eucerin Unlocking Skin Longevity ha quedado registrada.</p>

          <hr className='' />

          <p className='text-lg font-bold'>Te esperamos el 15 de octubre de 2026</p>
          <p>10:00 – 14:00 h</p>

          <div className='flex flex-row items-center gap-2 '>
            <MapPin className='text-accent size-10' />
            MUNET · Museo Nacional de Energía y Tecnología Ciudad de México
          </div>

          <div className='w-full bg-accent/20 rounded-lg p-4 text-balance'>
            Guarda la fecha y la sede del evento. ¡Nos encantará verte ahí!
          </div>

          <p>¡Nos vemos pronto! </p>
        </section>
      </main>
    )
  } else {
    return (
      <>
        <main className='container flex flex-col lg:flex-row gap-4  mx-auto p-4 bg-white/30 backdrop-blur-md drop-shadow-2xl xl:max-w-7xl'>
          <section className='flex-1 md:m-10 '>
            <div className='text-xl sm:text-2xl  xl:text-4xl '>Lanzamiento Eucerin</div>
            <h1 className='text-4xl sm:text-5xl lg:text-5xl xl:text-6xl  flex flex-col'>
              Unlocking
              <strong>Skin longevity</strong>
            </h1>

            <p className='text:lg md:text-xl my-6'>
              Completa el registro con tus datos para <br />
              confirmar tu participación
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <Controller
                name='user_type'
                control={control}
                render={({ field }) => (
                  <RadioGroup name={field.name} value={field.value} onChange={field.onChange} variant='secondary'>
                    <div className='flex flex-wrap items-center justify-between '>
                      <Label className='font-bold text-lg'>¿Qué tipo de perfil tienes?</Label>
                    </div>
                    <div className='grid gap-x-4 md:grid-cols-2'>
                      {profileOptions.map((option) => {
                        return (
                          <Radio key={option.value} value={option.value}>
                            <Radio.Content
                              className={clsx(
                                'group relative flex w-full flex-row items-start justify-start gap-4 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all',
                                'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10'
                              )}
                            >
                              <Radio.Control className='absolute end-4 top-3 size-5'>
                                <Radio.Indicator />
                              </Radio.Control>

                              <div className='flex flex-col gap-1'>
                                <span>{option.title}</span>
                              </div>
                            </Radio.Content>
                          </Radio>
                        )
                      })}
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.user_type && <p className='text-sm text-red-600'>{errors.user_type.message}</p>}

              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <div className='flex flex-col gap-1'>
                    <TextField className='w-full' name={field.name} isInvalid={Boolean(errors.name)}>
                      <Label className='font-bold text-lg'>Nombre</Label>
                      <InputGroup className='p-2'>
                        <InputGroup.Prefix>
                          <User2 className='text-accent opacity-70' />
                        </InputGroup.Prefix>
                        <InputGroup.Input {...field} className='w-full ' placeholder='Escribe tu nombre completo' type='text' />
                      </InputGroup>
                    </TextField>
                    {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
                  </div>
                )}
              />
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <div className='flex flex-col gap-1'>
                    <TextField className='w-full' name={field.name} isInvalid={Boolean(errors.email)}>
                      <Label className='font-bold text-lg'>Correo electrónico</Label>
                      <InputGroup className='p-2'>
                        <InputGroup.Prefix>
                          <Mail className='text-accent opacity-70' />
                        </InputGroup.Prefix>
                        <InputGroup.Input {...field} className='w-full ' placeholder='tu@correo.com' type='email' />
                      </InputGroup>
                    </TextField>
                    {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                  </div>
                )}
              />

              <section>
                <Controller
                  name='accept_terms'
                  control={control}
                  render={({ field }) => (
                    <Checkbox name={field.name} isSelected={field.value} onChange={field.onChange}>
                      <Checkbox.Content>
                        <Checkbox.Control className='size-5'>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Confirmo que he leído el aviso de privacidad y acepto los términos y condiciones.
                      </Checkbox.Content>
                    </Checkbox>
                  )}
                />
                {errors.accept_terms && <p className='text-sm text-red-600'>{errors.accept_terms.message}</p>}
              </section>

              <div className='sm:px-20'>
                <Button
                  type='submit'
                  fullWidth
                  isDisabled={!termsAccepted || isSubmitting}
                  className='bg-accent text-white hover:bg-accent/90 '
                >
                  Continuar
                </Button>
              </div>
              {errors.root && <p className='text-center text-sm text-red-600'>{errors.root.message}</p>}
            </form>
          </section>
          <section>
            <aside className=' bg-white rounded-3xl md:m-10 min-w-xs lg:w-xs p-10 shadow-xl '>
              <img src={Logo} className='w-25 mx-auto ' alt='' />

              <h3 className='flex flex-col  items-center text-lg font-bold mt-4'>
                HYALURON-FILLER <span>+LONGEVITY</span>
              </h3>

              <div className='text-center font-bold text-sm'>
                CIENCIA HOY,
                <br /> UNA PIEL CON FUTURO.
              </div>

              <ul className='space-y-7 my-10'>
                <li className='flex gap-2 '>
                  <div className='bg-purple-50 border border-purple-200 p-2 rounded-full w-13  h-13 flex items-center justify-center'>
                    <Calendar className='text-accent' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-bold '>Fecha</h4>
                    <p className='text-sm'>25 de octubre de 2023</p>
                  </div>
                </li>
                <li className='flex gap-2 '>
                  <div className='bg-purple-50 border border-purple-200 p-2 rounded-full w-13 h-13 flex items-center justify-center'>
                    <MapPin className='text-accent' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-bold '>Sede</h4>
                    <p className='text-sm'>Museo nacional de energía y tecnología, Ciudad de México</p>
                  </div>
                </li>
                <li className='flex gap-2 '>
                  <div className='bg-purple-50 border border-purple-200 p-2 rounded-full w-13 h-13 flex items-center justify-center'>
                    <UserRoundGroup className='text-accent' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-bold '>Dirigido a</h4>
                    <p className='text-sm'>Profesionales de la salud e influencers dermatológicos</p>
                  </div>
                </li>
              </ul>

              <hr className='mx-8 my-4' />
              <p className='text-center text-sm text-gray-500 mx-10'>
                Acompáñanos a un evento único donde la ciencia y la innovación transforman el futuro de tu piel.
              </p>
            </aside>
          </section>
        </main>
      </>
    )
  }
}

export default Landing
