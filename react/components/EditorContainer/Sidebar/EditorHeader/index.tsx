import React, { ChangeEvent } from 'react'
import { IconArrowBack, Input } from 'vtex.styleguide'

import SaveButton from './SaveButton'

interface Props {
  isTitleEditable?: boolean
  isLoading?: boolean
  onClose: () => void
  onSave?: () => void
  onTitleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  shouldDisableSaveButton?: boolean
  title?: string
}

const EditorHeader: React.FunctionComponent<Props> = ({
  isTitleEditable = false,
  isLoading,
  onClose,
  onSave,
  onTitleChange,
  shouldDisableSaveButton = false,
  title,
}) => (
  <div className={`w-100 pv4 bb bw1 b--light-silver`}>
    <div className="w-100 pl5 flex justify-between">
      <div className={`flex items-center ${onSave ? 'w-100' : ''}`}>
        <span className="pointer" onClick={onClose}>
          <IconArrowBack size={16} color="#585959" />
        </span>
        <div className="w-100 pl3 mv1 flex justify-between items-center">
          {!isTitleEditable && title && (
            <h4 className="mv0 f6 fw5 dark-gray b--transparent ba bw1">
              {title}
            </h4>
          )}
          {isTitleEditable && title && (
            <Input value={title} onChange={onTitleChange}>
              {title}
            </Input>
          )}
          {onSave && (
            <SaveButton
              isDisabled={shouldDisableSaveButton}
              isLoading={isLoading || false}
              onClick={onSave}
              variation="tertiary"
            />
          )}
        </div>
      </div>
    </div>
  </div>
)

export default EditorHeader
