import React, { ChangeEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { IconArrowBack } from 'vtex.styleguide'

import EditableText from './EditableText'

interface Props {
  isTitleEditable?: boolean
  onClose: () => void
  onTitleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  title?: string
}

const EditorHeader: React.FunctionComponent<Props> = ({
  isTitleEditable = false,
  onClose,
  onTitleChange,
  title,
}) => (
  <div className="w-100 mt5">
    <div className="w-100 pl5 flex justify-between">
      <div className="flex items-center">
        <span className="pointer" onClick={onClose}>
          <IconArrowBack size={16} color="#585959" />
        </span>
        <div className="w-100 pl3 mv1 flex justify-between items-center">
          {!isTitleEditable && title && (
            <h4 className="mv0 f6 fw5 dark-gray b--transparent ba bw1">
              {title}
            </h4>
          )}
          {isTitleEditable && (
            <FormattedMessage
              id="admin/pages.editor.components.configurations.defaultTitle"
              defaultMessage="Untitled"
            >
              {placeholder => (
                <EditableText
                  value={title}
                  onChange={onTitleChange}
                  placeholder={placeholder as string}
                />
              )}
            </FormattedMessage>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default EditorHeader
