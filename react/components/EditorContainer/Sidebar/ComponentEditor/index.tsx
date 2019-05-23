import { JSONSchema6 } from 'json-schema'
import React, { Fragment, useMemo } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormProps } from 'react-jsonschema-form'
import { Button, Spinner } from 'vtex.styleguide'

import {
  getComponentSchema,
  getExtension,
  getIframeImplementation,
} from '../../../../utils/components'
import { useEditorContext } from '../../../EditorContext'
import EditorHeader from '../EditorHeader'

import Form from './Form'
import { getUiSchema } from './utils'

import ContentContainer from '../ContentContainer'

interface CustomProps {
  after?: JSX.Element
  contentSchema?: JSONSchema6
  data: object
  iframeRuntime: RenderContext
  isContent?: boolean
  isLoading: boolean
  onChange: FormProps<{ formData: object }>['onChange']
  onClose: () => void
  onSave: () => void
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  shouldDisableSaveButton: boolean
  title?: ComponentSchema['title']
}

type getSchemasArgs = Pick<
  CustomProps,
  'iframeRuntime' | 'isContent' | 'contentSchema'
> & { editTreePath: string | null }

const getSchemas = ({
  iframeRuntime,
  isContent,
  editTreePath,
  contentSchema,
}: getSchemasArgs) => {
  const extension = getExtension(editTreePath, iframeRuntime.extensions)
  const componentImplementation = getIframeImplementation(extension.component)

  const componentSchema = getComponentSchema({
    component: componentImplementation,
    contentSchema,
    isContent: true,
    propsOrContent: extension[isContent ? 'content' : 'props'],
    runtime: iframeRuntime,
  })

  const componentUiSchema =
    componentImplementation && componentImplementation.uiSchema
      ? componentImplementation.uiSchema
      : null

  const uiSchemaFromComponent = getUiSchema(componentUiSchema, componentSchema)

  return {
    componentSchema,
    uiSchema: uiSchemaFromComponent,
  }
}

type Props = CustomProps & ReactIntl.InjectedIntlProps

const ComponentEditor: React.FunctionComponent<Props> = ({
  after,
  contentSchema,
  data,
  iframeRuntime,
  isContent,
  isLoading,
  onChange,
  onClose,
  onSave,
  onTitleChange,
  shouldDisableSaveButton,
  title,
}) => {
  const { editTreePath, mode } = useEditorContext()

  const { componentSchema, uiSchema } = useMemo(
    () => getSchemas({ contentSchema, editTreePath, iframeRuntime, isContent }),
    [editTreePath, mode]
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
              isLayoutMode: mode === 'layout',
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
        {after}
      </ContentContainer>
      <div className="flex flex-row-reverse w-100 bt bw1 b--light-silver">
        <div className="pa4">
          <Button
            disabled={isLoading}
            onClick={onClose}
            size="small"
            variation="tertiary"
          >
            <FormattedMessage
              id="admin/pages.editor.components.button.cancel"
              defaultMessage="Cancel"
            />
          </Button>
          <Button
            disabled={shouldDisableSaveButton || isLoading}
            onClick={onSave}
            size="small"
            variation="primary"
          >
            <FormattedMessage
              id="admin/pages.editor.components.button.save"
              defaultMessage="Save"
            />
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default injectIntl(ComponentEditor)
