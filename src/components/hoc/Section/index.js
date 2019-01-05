import React from 'react'

export default ({ children, ...props }) => (
  <section className='section' {...props} >
    {children}
  </section>
)
