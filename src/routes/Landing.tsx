import { Button, Checkbox, InputGroup, Label, ListBox, Modal, Select, TextField } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Calendar, Check, Mail, MapPin, User2, UserRoundGroup } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '../assets/branding/logo-eucerin-new.png'
import Separator from '../assets/luminescent.png'
import { registration } from '../services/dataService'
import type { UserData } from '../types/UserData'

const registrationSchema = z.object({
  user_type: z.enum(['influencer', 'medios'], { message: 'Selecciona un tipo de perfil.' }),
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

  const userType = watch('user_type')

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

  if (wasSent) {
    return (
      <main className='success-message flex flex-col gap-4  items-center p-4  '>
        <img src={Logo} className='w-29 mx-auto' alt='' />
        <section className='flex-1 md:m-5 text-center space-y-4  bg-white/60 backdrop-blur-md p-5 lg:px-20 py-10 rounded-3xl md:w-[625px] '>
          <div className='w-15 h-15 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto'>
            <Check className='text-accent size-8' />
          </div>
          <h1 className='text-3xl font-semibold  flex flex-col uppercase m-0'>¡Registro exitoso!</h1>
          <p className='pt-3 '>
            Tu participación en Eucerin Unlocking Skin Longevity <br /> ha quedado registrada.
          </p>

          <hr className='' />

          <p className='text-lg font-bold'>Te esperamos el 15 de octubre de 2026</p>
          <p>A las {userType === 'influencer' ? '12:30 hrs' : '19:00 hrs'}</p>

          <div className='flex flex-row items-center gap-2 justify-center text-left '>
            <MapPin className='text-accent size-10' />
            <div>
              <strong>InSpace Polanco</strong> <br />
              Lago Andromaco 84 B, Ampliación Granada
              <br /> Miguel Hidalgo. CDMX
            </div>
          </div>

          <div className='w-full bg-accent/10 rounded-lg p-4 text-balance text-sm text-[#3E4961]'>
            Guarda la fecha y la sede del evento. <br /> ¡Nos encantará verte ahí!
          </div>

          <p className='font-semibold text-[#4A3D89] '>¡Nos vemos pronto!</p>

          <div className='sm:px-25'>
            <Button
              type='button'
              fullWidth
              className='btn-lumi rounded-none border border-white text-lg font-medium text-[#152238] py-6 shadow-xl'
              onClick={() => {
                window.location.reload()
              }}
            >
              Finalizar
            </Button>
          </div>
        </section>
      </main>
    )
  } else {
    return (
      <>
        <main className='max-w-[1080px] mx-auto gap-4      '>
          <section className='flex justify-center lg:justify-start mt-5 '>
            <img src={Logo} className='w-29 ' alt='' />
          </section>
          <div className='flex flex-col lg:flex-row gap-10  p-5 pt-0 '>
            <section className='flex-1 mt-5'>
              <div className='text-xl sm:text-2xl  uppercase font-medium tracking-widest pl-3 mb-5'>Registro</div>
              <h1 className=' flex flex-col uppercase'>
                <span className='px-3 text-4xl lg:text-[3.5rem] leading-none'>Unlocking</span>
                <strong className='decoration-skin px-3 py-1 text-3xl sm:text-5xl lg:text-5xl'>Skin longevity</strong>
              </h1>
              <p className='text-[0.96rem]  px-3 mt-2 text-balance'>Descubre una nueva era en la longevidad de la piel</p>
              <img src={Separator} className='w-[324px]  my-3' alt='' />
              <p className='  leading-tight mb-2'>
                Completa tus datos para confirmar <br /> tu participación.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 max-w-[400px]'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <div className='flex flex-col gap-1'>
                      <TextField className='w-full' name={field.name} isInvalid={Boolean(errors.name)}>
                        <Label className='font-semibold text-sm'>Nombre completo</Label>
                        <InputGroup className='p-1 rounded-md border border-gray-200 shadow-none'>
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
                        <Label className='font-semibold text-sm'>Correo electrónico</Label>
                        <InputGroup className='p-1 rounded-md border border-gray-200 shadow-none'>
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

                <Controller
                  name='user_type'
                  control={control}
                  render={({ field }) => (
                    <Select className='' placeholder='Selecciona tu perfil' {...field} isInvalid={Boolean(errors.user_type)}>
                      <Label className='font-semibold text-sm'>Perfil</Label>
                      <Select.Trigger className='min-h-12 rounded-md border border-gray-200 shadow-none items-center'>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id='influencer' textValue='influencer'>
                            Influencer
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id='medios' textValue='medios'>
                            Medios
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  )}
                />
                {errors.user_type && <p className='text-sm text-red-600'>{errors.user_type.message}</p>}

                <section>
                  <div className='flex items-center gap-2'>
                    <Controller
                      name='accept_terms'
                      control={control}
                      render={({ field }) => (
                        <Checkbox name={field.name} isSelected={field.value} onChange={field.onChange}>
                          <Checkbox.Content>
                            <Checkbox.Control className='size-5'>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                          </Checkbox.Content>
                        </Checkbox>
                      )}
                    />{' '}
                    <div className='text-xs text-accent font-semibold '>
                      He leído y acepto los{' '}
                      <Modal>
                        <Modal.Trigger className='underline '>términos y condiciones</Modal.Trigger>
                        <Modal.Backdrop>
                          <Modal.Container size='lg'>
                            <Modal.Dialog>
                              <Modal.CloseTrigger />
                              <Modal.Header>
                                <Modal.Heading>Términos y condiciones</Modal.Heading>
                              </Modal.Header>
                              <Modal.Body className='space-y-4 text-sm text-[#3E4961]'>
                                <h2 className='text-lg font-bold text-balance'>AUTORIZACIÓN DE USO DE IMAGEN, VOZ Y TESTIMONIO</h2>
                                <p>
                                  Al registrarme y seleccionar <strong>“ACEPTO”</strong>, otorgo de manera libre, expresa e informada mi
                                  consentimiento a{' '}
                                  <strong>
                                    BDF México, S.A. de C.V., sus marcas, afiliadas y sociedades de su grupo, y a DW Agency, S.A. de C.V.,
                                    sus afiliadas y sociedades de su grupo
                                  </strong>
                                  (los “Organizadores”), para captar, grabar, reproducir, editar y utilizar mi imagen, voz, nombre y/o
                                  testimonio mediante fotografías, video, audio u otros medios durante mi participación en el{' '}
                                  <strong>Lanzamiento Eucerin Epigenetic del 15 de octubre de 2026.</strong>
                                </p>
                                <p>
                                  Autorizo el uso de dicho material con fines de comunicación, publicidad institucional y/o comercial de los
                                  Organizadores y sus marcas, incluyendo redes sociales, sitios web, prensa, presentaciones, materiales
                                  internos y otros medios digitales.
                                </p>
                                <p>
                                  Esta autorización tendrá <strong>alcance mundial y vigencia de 5 años.</strong> El material publicado o
                                  incorporado a campañas durante dicho periodo podrá continuar utilizándose posteriormente.
                                </p>{' '}
                                <p>
                                  Entiendo que mi participación en el Evento <strong>no genera ningún pago adicional</strong> por el uso de
                                  mi imagen, voz, nombre o testimonio.
                                </p>
                                <p>
                                  Asimismo, acepto el tratamiento de mis datos personales conforme a los Avisos de Privacidad aplicables y
                                  reconozco que mi participación en el Evento es voluntaria.
                                </p>
                                <p>Declaro que he leído y comprendido esta autorización y que otorgo mi consentimiento libremente.</p>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button slot='close'>Cerrar</Button>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal.Container>
                        </Modal.Backdrop>
                      </Modal>
                    </div>
                  </div>
                  {errors.accept_terms && <p className='text-sm text-red-600'>{errors.accept_terms.message}</p>}
                </section>

                <div className='sm:px-10'>
                  <Button
                    type='submit'
                    fullWidth
                    isDisabled={!termsAccepted || isSubmitting}
                    className='btn-lumi rounded-none border border-white text-lg font-medium text-[#152238] py-6'
                  >
                    Continuar <ArrowRight className='ml-2' />
                  </Button>
                </div>
                {errors.root && <p className='text-center text-sm text-red-600'>{errors.root.message}</p>}
              </form>
            </section>
            <section>
              <aside className=' bg-white/30 backdrop-blur-sm border-gray-300 border  rounded-3xl  min-w-xs lg:max-w-[400px] p-10   '>
                <img src={Logo} className='w-25 mx-auto ' alt='' />
                <h3 className='flex flex-col  items-center text-sm font-bold mt-4'>
                  HYALURON-FILLER <span className='text-accent'>+LONGEVITY</span>
                </h3>
                <hr className='mx-8 my-3' />
                <h2 className='text-center text-xl leading-tight  uppercase '>
                  Unlocking <br />
                  <strong>Skin Longevity</strong>
                </h2>
                <div className='text-center  text-xs my-5'>
                  CIENCIA HOY,
                  <br /> UNA PIEL CON FUTURO.
                </div>
                <ul className='space-y-7 my-10 lg:mx-10'>
                  <li className='flex gap-5 items-center '>
                    <div className='bg-accent/5  p-2 rounded-full w-11  h-11 flex items-center justify-center'>
                      <Calendar className='text-accent' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold uppercase text-xs mb-1'>Fecha</h4>
                      <p className='text-xs'>15 de octubre de 2026</p>
                    </div>
                  </li>
                  <li className='flex gap-5 items-center '>
                    <div className='bg-accent/10  p-2 rounded-full w-11  h-11 flex items-center justify-center'>
                      <MapPin className='text-accent' />
                    </div>
                    <div className='flex-1 '>
                      <h4 className='font-bold uppercase text-xs mb-1'>Sede</h4>
                      <p className='font-semibold text-xs'>InSpace Polanco </p>
                      <p className='text-xs'>
                        Lago Andromaco 84 B, Ampliación Granada <br /> Miguel Hidalgo. CDMX
                      </p>
                    </div>
                  </li>
                  <li className='flex gap-5 items-center '>
                    <div className='bg-accent/10  p-2 rounded-full w-11  h-11 flex items-center justify-center'>
                      <UserRoundGroup className='text-accent' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold uppercase text-xs mb-1'>Dirigido a</h4>
                      <p className='text-xs'>Influencers </p>
                    </div>
                  </li>
                </ul>
                <hr className='mx-8 my-4' />
                <p className='text-center text-xs text-gray-500 lg:mx-9 '>
                  Acompáñanos a un evento único donde la ciencia y la innovación transforman el futuro de tu piel.
                </p>
              </aside>
            </section>
          </div>
        </main>
      </>
    )
  }
}

export default Landing
