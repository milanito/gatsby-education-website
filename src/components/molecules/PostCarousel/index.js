import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const PostCarousel = styled.div`
  min-height: 400px;
  text-align: center;
  background-image: url("${({ image }) => image}");
`

const PostTitle = styled.h2`
  color: white !important;
`

export default ({ title, image, slug }) => (
  <PostCarousel className='box' image={image}>
    <Link to={slug}>
      <PostTitle className='title is-2'>{title}</PostTitle>
    </Link>
  </PostCarousel>
)

