import React from 'react'
import { graphql } from 'gatsby'
import { get, take } from 'lodash'
import { compose, withProps } from 'recompose'

import Layout from '../components/hoc/Layout'
import Carousel from '../components/molecules/Carousel'
import PostsList from '../components/molecules/PostsList'

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

const IndexPage = ({ posts }) => (
  <Layout>
    <Carousel posts={posts} />
    <PostsList posts={posts} />
  </Layout>
)

export default compose(withProps(({ data }) => ({
  posts: take(get(data, 'allMarkdownRemark.edges', []), 3)
})))(IndexPage)
