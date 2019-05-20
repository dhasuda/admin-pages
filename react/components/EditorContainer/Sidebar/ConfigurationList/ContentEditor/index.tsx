import { JSONSchema6 } from 'json-schema'
import React, { Fragment } from 'react'
import { FormProps } from 'react-jsonschema-form'

import ComponentEditor from '../../ComponentEditor'

import ConditionControls from './ConditionControls'
import LabelEditor from './LabelEditor'

interface Props {
  componentTitle?: ComponentSchema['title']
  condition: ExtensionConfiguration['condition']
  configuration?: ExtensionConfiguration
  contentSchema?: JSONSchema6
  data?: object
  iframeRuntime: RenderContext
  isDefault: boolean
  isLoading: boolean
  isSitewide: boolean
  onClose: () => void
  onConditionChange: (
    changes: Partial<ExtensionConfiguration['condition']>
  ) => void
  onFormChange: FormProps<{ formData: object }>['onChange']
  onSave: () => void
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  shouldDisableSaveButton: boolean
}

const ContentEditor: React.FunctionComponent<Props> = ({
  componentTitle,
  condition,
  contentSchema,
  data = {},
  iframeRuntime,
  isDefault,
  isLoading,
  isSitewide,
  onClose,
  onConditionChange,
  onFormChange,
  onSave,
  onTitleChange,
  shouldDisableSaveButton,
}) => (
  <ComponentEditor
    after={
      !isDefault ? (
        <ConditionControls
          condition={condition}
          isSitewide={isSitewide}
          pageContext={iframeRuntime.route.pageContext}
          onConditionChange={onConditionChange}
        />
      ) : (
        undefined
      )
    }
    contentSchema={contentSchema}
    data={data}
    iframeRuntime={iframeRuntime}
    isContent
    isLoading={isLoading}
    onChange={onFormChange}
    onClose={onClose}
    onSave={onSave}
    onTitleChange={onTitleChange}
    shouldDisableSaveButton={shouldDisableSaveButton}
    title={componentTitle}
  />
)

export default ContentEditor
