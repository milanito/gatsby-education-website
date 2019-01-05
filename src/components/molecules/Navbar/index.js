import React from 'react'
import { map } from 'lodash'
import { Link } from 'gatsby'
import { compose, withProps } from 'recompose'

import Logo from '../../atoms/Logo'
import Burgers from '../../atoms/Burgers'

const LinkItem = ({ title, link }) => (
  <Link className='navbar-item' to={link}>{title}</Link>
)

const LinksList = ({ links }) => map(links, link => (<LinkItem {...link} key={link.title}/>))

const NavBar = ({ links }) => (
  <nav className='navbar is-transparent is-fixed-top'>
    <div className='navbar-brand'>
      <Logo />
      <Burgers target='navbarMenu' />
    </div>
    <div id='navbarMenu' className='navbar-menu'>
      <div className='navbar-start'>
        <LinksList links={links} />
      </div>
    </div>
  </nav>
)

export default compose(withProps({
  links: [{ title: 'Blog', link: '/blog' }, { title: 'Éducation canine', link: '/products' }, { title: 'À propos', link: '/about' },
    { title: 'Contact', link: '/contact' }, { title: 'Form Example', link: '/contact/examples' }]
}))(NavBar)
