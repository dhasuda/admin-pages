import { GetTextFromContextArgs } from './typings'

export const getTextFromContext = ({
  context,
  isSitewide,
  intl,
}: GetTextFromContextArgs) => {
  if (isSitewide) {
    return intl.formatMessage({
      id: 'admin/pages.editor.configuration.tag.sitewide',
    })
  }

  if (context.id === '*') {
    return intl.formatMessage({
      id: 'admin/pages.editor.configuration.tag.template',
    })
  }

  return intl.formatMessage({
    id: `admin/pages.editor.configuration.tag.page`,
  })
}
