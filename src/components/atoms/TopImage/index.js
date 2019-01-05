import React from 'react'

import Section from '../../hoc/Section'

export default ({ image, alt }) => (
  <Section>
    <figure className='image'>
      <img src={image} alt={alt} />
    </figure>
  </Section>
)
