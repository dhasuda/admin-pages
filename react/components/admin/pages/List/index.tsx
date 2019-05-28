import React, { Fragment } from 'react'
import { defineMessages } from 'react-intl'

import Section from './Section'
import SectionSeparator from './SectionSeparator'
import { CategorizedRoutes } from './typings'
import { sortRoutes } from './utils'

interface Props {
  categorizedRoutes: CategorizedRoutes
}

defineMessages({
  product: {
    defaultMessage: 'Product',
    id: 'admin/pages.admin.pages.list.section.product',
  },
  productCollections: {
    defaultMessage: 'Product collections',
    id: 'admin/pages.admin.pages.list.section.productCollections',
  },
  standard: {
    defaultMessage: 'Standard',
    id: 'admin/pages.admin.pages.list.section.standard',
  },
})

const List: React.FunctionComponent<Props> = ({ categorizedRoutes }) => (
  <Fragment>
    <Section
      hasCreateButton
      routes={sortRoutes(categorizedRoutes.noProducts)}
      titleId="admin/pages.admin.pages.list.section.standard"
    />
    <SectionSeparator />
  </Fragment>
)

export default List
