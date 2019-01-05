import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../../molecules/Navbar'
import './all.sass'

const DefaultHelmet = () => (
  <Helmet>
    <title>Home | Education canine</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css' />
    <body className='has-navbar-fixed-top' />
  </Helmet>
)

export default ({ children }) => (
  <div>
    <DefaultHelmet />
    <Navbar />
    <div>{children}</div>
  </div>
)
