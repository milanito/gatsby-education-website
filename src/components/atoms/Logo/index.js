import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import logo from '../../../img/logo.svg'

const LogoImage = styled.img`
  width: 88px !important;
`

export default () => (
  <Link to='/' className='navbar-item'>
    <LogoImage src={logo} alt='Kaldi' />
  </Link>
)
