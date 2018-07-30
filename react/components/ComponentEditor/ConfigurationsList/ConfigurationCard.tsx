import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Badge, Button, Card } from 'vtex.styleguide'

type Props = {
  activeConfiguration?: ExtensionConfiguration
  configuration: ExtensionConfiguration
  onClick: (configuration: ExtensionConfiguration) => void
  onEdit: (configuration: ExtensionConfiguration) => void
}

const ConfigurationCard = ({
  activeConfiguration,
  configuration,
  intl,
  onClick,
  onEdit,
}: Props & ReactIntl.InjectedIntlProps) => {
  const isActive =
    activeConfiguration &&
    configuration.configurationId === activeConfiguration.configurationId

  return (
    <div
      className="mh5 mt5 pointer"
      onClick={() => {
        onClick(configuration)
      }}
    >
      <Card noPadding>
        <div className={`pa5 ${isActive ? 'bg-washed-blue' : ''}`}>
          <div className="mt5">
            <FormattedMessage id="pages.conditions.scope.title" />
            <Badge bgColor="#979899" color="#FFF">
              {intl.formatMessage({
                id: `pages.conditions.scope.${configuration.scope}`,
              })}
            </Badge>
          </div>
          {configuration.conditions.length > 0 && (
            <div className="mt5">
              <FormattedMessage id="pages.editor.components.configurations.customConditions" />
              <div>{configuration.conditions.join(', ')}</div>
            </div>
          )}
          <div className="mt5">
            <Button
              onClick={() => {
                onEdit(configuration)
              }}
              size="small"
              variation="tertiary"
            >
              {intl.formatMessage({
                id: 'pages.editor.components.configurations.button.edit',
              })}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default injectIntl(ConfigurationCard)
