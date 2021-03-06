import React, { useState } from 'react'
import {
  defineMessages,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl'

import { Tab, Tabs } from 'vtex.styleguide'

import PWAForm from './PWAForm'
import StoreForm from './StoreForm'

const messages = defineMessages({
  advanced: {
    defaultMessage: 'Advanced',
    id: 'admin/pages.editor.store.settings.tabs.advanced',
  },
  general: {
    defaultMessage: 'General',
    id: 'admin/pages.editor.store.settings.tabs.general',
  },
})

const Store: React.FunctionComponent<InjectedIntlProps> = ({ intl }) => {
  const [activeTab, setActiveTab] = useState('general')
  return (
    <div className="pa7 h-100 overflow-y-auto flex flex-column">
      <div className="pb6 t-heading-5">
        <FormattedMessage id="admin/pages.editor.store.settings.title" />
      </div>
      <div className="flex">
        <Tabs sticky>
          <Tab
            active={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
            label={intl.formatMessage(messages.general)}
          >
            <div className="pv6">
              <StoreForm />
            </div>
          </Tab>
          <Tab
            active={activeTab === 'advanced'}
            onClick={() => setActiveTab('advanced')}
            label={intl.formatMessage(messages.advanced)}
          >
            <div className="pv6">
              <PWAForm />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default injectIntl(Store)
