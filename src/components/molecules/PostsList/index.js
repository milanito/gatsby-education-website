import React from 'react'
import { map } from 'lodash'

import Section from '../../hoc/Section'
import PostExtract from '../PostExtract'

const PostsList = ({ posts }) =>
  map(posts, ({ node: post }) => (<PostExtract post={post} key={post.id}/>))

const PostsTitle = () => (
  <div className='content'>
    <h1 className='has-text-weight-bold is-size-2'>Latest Stories</h1>
  </div>
)

export default ({ posts }) => (
  <Section>
    <div className='container'>
      <PostsTitle />
      <div className='columns'>
        <PostsList posts={posts} />
      </div>
    </div>
  </Section>
)
