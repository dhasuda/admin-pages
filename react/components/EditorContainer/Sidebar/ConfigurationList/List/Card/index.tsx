import React from 'react'
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl'

import ActionMenu from '../../../ComponentList/SortableList/SortableListItem/ActionMenu'

import Tag from './Tag'
import { getTextFromContext } from './utils'

interface Props {
  configuration: ExtensionConfiguration
  isDisabled?: boolean
  isSitewide: boolean
  isDefaultContent?: boolean
  onClick: (configuration: ExtensionConfiguration) => void
  onDelete: () => void
}

function stopPropagation(e: React.MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}

const messages = defineMessages({
  // Some of these messages are used in getTextFromContext
  delete: {
    defaultMessage: 'Delete',
    id: 'admin/pages.editor.component-list.action-menu.delete',
  },
  page: {
    defaultMessage: 'Page',
    id: 'admin/pages.editor.configuration.tag.sitewide',
  },
  reset: {
    defaultMessage: 'Reset',
    id: 'admin/pages.editor.component-list.action-menu.reset',
  },
  sitewide: {
    defaultMessage: 'Entire site',
    id: 'admin/pages.editor.configuration.tag.sitewide',
  },
  template: {
    defaultMessage: 'This template',
    id: 'admin/pages.editor.configuration.tag.template',
  },
})

const Card = ({
  configuration,
  isDefaultContent = false,
  isDisabled = false,
  intl,
  isSitewide,
  onClick,
  onDelete,
}: Props & ReactIntl.InjectedIntlProps) => {
  const actionMenuOptions = [
    {
      label: intl.formatMessage(
        isDefaultContent ? messages.reset : messages.delete
      ),
      onClick: () => onDelete(),
    },
  ]

  const appName = React.useMemo(
    () => {
      if (!isDefaultContent) {
        return null
      }

      const splittedOrigin =
        configuration.origin && configuration.origin.split('@')

      return splittedOrigin && splittedOrigin[0]
    },
    [configuration.origin]
  )

  const conditionPageContext = configuration.condition.pageContext

  const scope = React.useMemo(
    () =>
      getTextFromContext({
        context: conditionPageContext,
        isSitewide,
        intl,
      }),
    [conditionPageContext, isSitewide]
  )

  return (
    <div
      className={`relative mh5 mt5 pa5 ba br2 b--action-secondary bg-action-secondary hover-bg-action-secondary ${
        !isDisabled ? 'pointer' : ''
      }`}
      onClick={() => {
        if (!isDisabled) {
          onClick(configuration)
        }
      }}
    >
      {configuration.label ? (
        <div className="c-on-base">{configuration.label}</div>
      ) : (
        <FormattedMessage
          defaultMessage="Untitled"
          id="admin/pages.editor.configuration.defaultTitle"
        >
          {message => <div className="i c-muted-2">{message}</div>}
        </FormattedMessage>
      )}

      <div className="mt5">
        <div>
          <FormattedMessage
            defaultMessage="Saved: "
            id="admin/pages.editor.configuration.scope"
          >
            {message => (
              <span>
                <span className="fw5">{message}</span>

                {scope}
              </span>
            )}
          </FormattedMessage>
        </div>

        {appName && (
          <FormattedMessage
            defaultMessage="CREATED BY {name}"
            id="admin/pages.editor.configuration.createdBy"
            values={{ name: appName }}
          >
            {message => <div className="mt3 f7 c-muted-2">{message}</div>}
          </FormattedMessage>
        )}
      </div>

      <div className="absolute top-0 right-0 mt1" onClick={stopPropagation}>
        <ActionMenu options={actionMenuOptions} />
      </div>
    </div>
  )
}

export default injectIntl(Card)
