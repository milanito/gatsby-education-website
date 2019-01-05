import React from 'react'
import Slider from 'react-id-swiper'
import { map, get } from 'lodash'
import { compose, withProps } from 'recompose'

import PostCarousel from '../PostCarousel'

const DEFAULT_SETTINGS = {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
}

const Carousel = ({ settings, items }) => (
  <Slider {...settings}>
    {map(items, item => (
      <div key={item.id}>
        <PostCarousel {...item} />
      </div>
    ))}
  </Slider>
)

export default compose(withProps(({ options = {}, posts }) => ({
  settings: {
    ...options,
    ...DEFAULT_SETTINGS
  },
  items: map(posts, post => ({
    id: get(post, 'node.id'),
    slug: get(post, 'node.fields.slug'),
    image: 'https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ...get(post, 'node.frontmatter')
  }))
})))(Carousel)
