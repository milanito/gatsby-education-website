import React from 'react'
import { get } from 'lodash'
import { compose, withProps } from 'recompose'

import Layout from '../components/hoc/Layout'

const CategoriePage = ({ categorie }) => (
  <Layout>
  <h1>Categorie {categorie} page</h1>
  </Layout>
)

export default compose(withProps(({ pageContext }) => ({
  categorie: get(pageContext, 'categorie', '')
})))(CategoriePage)
