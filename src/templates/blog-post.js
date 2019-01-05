import React from 'react'
import Helmet from 'react-helmet'
import { get } from 'lodash'
import { graphql } from 'gatsby'
import { compose, withProps } from 'recompose'

import Layout from '../components/hoc/Layout'
import Breadcrumb from '../components/molecules/Breadcrumb'
import Section from '../components/hoc/Section'
import TagsList from '../components/molecules/TagsList'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ pageTitle, post }) => (
  <Layout>
    <Section>
      <Helmet title={pageTitle} />
      <Breadcrumb categorie={post.frontmatter.categorie} title={post.frontmatter.title} />
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
              {post.frontmatter.title}
            </h1>
            <p>{post.frontmatter.description}</p>
            <HTMLContent content={post.html} />
            <TagsList tags={post.frontmatter.tags} />
          </div>
        </div>
      </div>
    </Section>
  </Layout>
)

export const BlogPostTemplate = compose(withProps(({ data }) => ({
  post: get(data, 'markdownRemark', {})
})),
  withProps(({ post }) => ({
    pageTitle: `${post.frontmatter.title} | Blog`
  }))
)(BlogPost)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        categorie
      }
    }
  }
`
