import React from 'react'
import { Font } from 'react-email'

const montserratUrl = 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459WlhyyTn89ddpQ.woff2'

const weights = [400, 500, 600, 700]

export function Fonts() {
  if (!React) return null

  return (
    <>
      {weights.map((fontWeight) => (
        <Font
          key={fontWeight}
          fontFamily='Montserrat'
          fallbackFontFamily={['Arial', 'sans-serif']}
          webFont={{
            url: montserratUrl,
            format: 'woff2'
          }}
          fontWeight={fontWeight}
          fontStyle='normal'
        />
      ))}
    </>
  )
}
