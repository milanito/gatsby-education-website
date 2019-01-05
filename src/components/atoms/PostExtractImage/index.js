import React from 'react'
import { Link } from 'gatsby'

export default ({ image, alt, link }) => (
  <Link to={link}>
    <figure className='image is-2by1'>
      <img src={image} alt={alt} />
    </figure>
  </Link>
)
