import React from 'react'
import { Link } from 'gatsby'

import PostExtractImage from '../../atoms/PostExtractImage'

export default ({ post }) => (
  <div className='column'>
    <div className='card'>
      <div className='card-image'>
        <PostExtractImage link={post.fields.slug} alt={post.frontmatter.title} image='https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
      </div>
      <div className='card-content'>
        <div className='media'>
          <div className='media-content'>
            <p className='title is-4'>
              <Link to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </p>
            <p className='subtitle is-6'>{post.frontmatter.date}</p>
          </div>
        </div>

        <div className='content'>{post.excerpt}</div>

        <Link className='button is-small' to={post.fields.slug}>
          Keep Reading →
        </Link>
      </div>
    </div>
  </div>
)
