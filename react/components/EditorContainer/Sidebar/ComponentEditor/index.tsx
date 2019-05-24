import { JSONSchema6 } from 'json-schema'
import React, { Fragment, useMemo } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormProps } from 'react-jsonschema-form'
import { Button, Spinner } from 'vtex.styleguide'

import { useEditorContext } from '../../../EditorContext'
import EditorHeader from '../EditorHeader'
import { useFormMetaContext } from '../FormMetaContext'

import ConditionControls from './ConditionControls'
import Form from './Form'
import { getSchemas } from './utils'

import ContentContainer from '../ContentContainer'

interface CustomProps {
  condition?: ExtensionConfiguration['condition']
  contentSchema?: JSONSchema6
  data: object
  iframeRuntime: RenderContext
  isDefault?: boolean
  isNew?: boolean
  isSitewide?: boolean
  onChange: FormProps<{ formData: object }>['onChange']
  onClose: () => void
  onConditionChange?: (
    changes: Partial<ExtensionConfiguration['condition']>
  ) => void
  onSave: () => void
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  title?: ComponentSchema['title']
}

type Props = CustomProps & ReactIntl.InjectedIntlProps

const ComponentEditor: React.FunctionComponent<Props> = ({
  condition,
  contentSchema,
  data,
  iframeRuntime,
  isDefault,
  isNew,
  isSitewide = false,
  onChange,
  onConditionChange,
  onClose,
  onSave,
  onTitleChange,
  title,
}) => {
  const editor = useEditorContext()
  const formMeta = useFormMetaContext()

  const isContent = useMemo(() => editor.mode === 'content', [editor.mode])

  const { componentSchema, uiSchema } = useMemo(
    () =>
      getSchemas({
        contentSchema,
        editTreePath: editor.editTreePath,
        iframeRuntime,
        isContent,
      }),
    [editor.editTreePath, editor.mode]
  )

  const schema = useMemo(
    () => ({
      ...componentSchema,
      properties: {
        ...componentSchema.properties,
      },
      title: undefined,
    }),
    [componentSchema]
  )

  const shouldDisableSaveButton =
    !isNew && (editor.isLoading || !formMeta.getWasModified())

  return (
    <Fragment>
      <ContentContainer
        containerClassName="h-100 overflow-y-auto overflow-x-hidden"
        centerSpinner
      >
        <EditorHeader
          isTitleEditable={isContent}
          onClose={onClose}
          onTitleChange={onTitleChange}
          title={title}
        />

        <div className="relative bg-white flex flex-column justify-between size-editor w-100 pb3 ph5">
          <Form
            formContext={{
              addMessages: iframeRuntime.addMessages,
              isLayoutMode: editor.mode === 'layout',
              messages: iframeRuntime.messages,
            }}
            formData={data}
            onChange={onChange}
            onSubmit={onSave}
            schema={schema as JSONSchema6}
            uiSchema={uiSchema}
          />

          <div id="form__error-list-template___alert" />
        </div>

        {isContent && !isDefault && condition && onConditionChange && (
          <ConditionControls
            condition={condition}
            isSitewide={isSitewide}
            onConditionChange={onConditionChange}
            pageContext={iframeRuntime.route.pageContext}
          />
        )}
      </ContentContainer>

      <div className="flex flex-row-reverse w-100 bt bw1 b--light-silver">
        <div className="pa4">
          <Button
            disabled={editor.isLoading}
            onClick={onClose}
            size="small"
            variation="tertiary"
          >
            <FormattedMessage
              defaultMessage="Cancel"
              id="admin/pages.editor.components.button.cancel"
            />
          </Button>

          <Button
            disabled={shouldDisableSaveButton}
            onClick={onSave}
            size="small"
            variation="primary"
          >
            <FormattedMessage
              defaultMessage="Save"
              id="admin/pages.editor.components.button.save"
            />
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default injectIntl(ComponentEditor)
