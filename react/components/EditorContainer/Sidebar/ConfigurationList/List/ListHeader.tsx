import React from 'react'
import { IconArrowBack } from 'vtex.styleguide'

interface ListProps {
  onClose: () => void
  title?: string
}

const ListHeader: React.FunctionComponent<ListProps> = ({ onClose, title }) => (
  <div className={`w-100 ph5 pv4 bb bw1 b--light-silver`}>
    <div className="w-100 flex justify-between">
      <div className="flex items-center">
        <span className="pointer" onClick={onClose}>
          <IconArrowBack size={16} color="#585959" />
        </span>
        <div className="w-100 pl3 mv1 flex justify-between items-center">
          {title && (
            <h4 className="mv0 f6 fw5 dark-gray b--transparent ba bw1">
              {title}
            </h4>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default ListHeader
