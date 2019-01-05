import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { map, isEqual } from 'lodash'
import { Link, graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

import Layout from '../components/hoc/Layout'

const PageContainer = styled.div`
  margin-bottom: 6rem;
`

const PostsLinks = ({ posts }) => map(posts, post => (
  <li key={post.node.fields.slug}>
    <Link to={post.node.fields.slug}>
      <h2 className='is-size-2'>{post.node.frontmatter.title}</h2>
    </Link>
  </li>
))

const TagRoute = ({ pageTitle, posts, tagHeader }) => (
  <Layout>
    <section className='section'>
      <Helmet title={pageTitle} />
      <div className='container content'>
        <div className='columns'>
          <PageContainer className='column is-10 is-offset-1'>
            <h3 className='title is-size-4 is-bold-light'>{tagHeader}</h3>
            <ul className='taglist'>
              <PostsLinks posts={posts} />
            </ul>
            <p>
              <Link to='/tags/'>Browse all tags</Link>
            </p>
          </PageContainer>
        </div>
      </div>
    </section>
  </Layout>
)

export default compose(withProps(({ pageContext, data }) => ({
  tag: pageContext.tag,
  title: data.site.siteMetadata.title,
  posts: data.allMarkdownRemark.edges,
  totalCount: data.allMarkdownRemark.totalCount
})), withProps(({ tag, title, totalCount }) => ({
  pageTitle: `${tag} | ${title}`,
  tagHeader: `${totalCount} post${
    isEqual(totalCount, 1) ? '' : 's'
  } tagged with “${tag}”`
})))(TagRoute)

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
