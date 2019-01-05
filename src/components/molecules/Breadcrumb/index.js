import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import { compose, withProps } from 'recompose'

const Breadcrumb = ({ categorie, title, link }) => (
  <nav className='breadcrumb' aria-label='breadcrumbs'>
  <ul>
    <li>
      <Link to='/blog'>Blog</Link>
    </li>
    <li>
      <Link to={link}>{categorie}</Link>
    </li>
    <li className='is-active'>
      <Link to='#' aria-current='page'>{title}</Link>
    </li>
  </ul>
</nav>
)

export default compose(withProps(({ categorie }) => ({
  link: `/categories/${kebabCase(categorie)}`
})))(Breadcrumb)
