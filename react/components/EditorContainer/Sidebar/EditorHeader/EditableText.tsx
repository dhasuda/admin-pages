import React from 'react'

import styles from './EditableText.css'

interface Props {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

const EditableText: React.FC<Props> = ({ onChange, placeholder, value }) => (
  <input
    className={`bn font-body input-reset f4 pa3 ${styles.input}`}
    type="text"
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />
)

export default EditableText
