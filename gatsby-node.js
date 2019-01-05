const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { get, uniq, kebabCase, forEach, isEqual, reduce } = require('lodash')

const POSTS_QUERY = `
  {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            tags
            categorie
            templateKey
          }
        }
      }
    }
  }
`

const createPostsPages = (createPage, posts) =>
  forEach(posts, edge => createPage({
    path: edge.node.fields.slug,
    tags: edge.node.frontmatter.tags,
    component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
    // additional data can be passed via context
    context: {
      id: edge.node.id,
    },
  }))

const createTagsPages = (createPage, posts) =>
  forEach(uniq(reduce(posts, (tags, edge) => {
    if (get(edge, `node.frontmatter.tags`)) {
      return [...tags, ...edge.node.frontmatter.tags]
    }
    return tags
  }, [])), tag => createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: path.resolve(`src/templates/tags.js`),
      context: { tag },
  }))

const createCategoriesPages = (createPage, posts) =>
  forEach(uniq(reduce(posts, (categories, edge) => {
    if (get(edge, `node.frontmatter.categorie`)) {
      return [...categories, edge.node.frontmatter.categorie]
    }
    return categories
  }, [])), categorie => createPage({
      path: `/categories/${kebabCase(categorie)}/`,
      component: path.resolve(`src/templates/categories.js`),
      context: { categorie },
  }))

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(POSTS_QUERY)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      // Posts pages
      createPostsPages(createPage, result.data.allMarkdownRemark.edges)
      // Categories pages
      createCategoriesPages(createPage, result.data.allMarkdownRemark.edges)
      // Tag pages
      createTagsPages(createPage, result.data.allMarkdownRemark.edges)
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (isEqual(node.internal.type, 'MarkdownRemark')) {
    return createNodeField({
      name: `slug`,
      value: createFilePath({ node, getNode }),
      node
    })
  }
}
