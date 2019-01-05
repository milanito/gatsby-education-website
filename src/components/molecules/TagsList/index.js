import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { kebabCase, map, isEmpty } from 'lodash'
import { compose, mapProps, renderNothing, branch } from 'recompose'

const TagsContainer = styled.div`
  margin-top: 4rem;
`

const TagsList = ({ tags }) => map(tags, ({ tag, link, key }) => (
  <li key={key}>
    <Link to={link}>{tag}</Link>
  </li>
))

const TagsListContainer = ({ tags }) => (
  <TagsContainer>
    <h4>Tags</h4>
    <ul className='taglist'>
      <TagsList tags={tags} />
    </ul>
  </TagsContainer>
)

export default compose(branch(({ tags }) => isEmpty(tags), renderNothing),
  mapProps(({ tags }) => ({
    tags: map(tags, tag => ({
      key: `${tag}tag`,
      link: `/tags/${kebabCase(tag)}/`,
      tag
    }))
  }))
)(TagsListContainer)

