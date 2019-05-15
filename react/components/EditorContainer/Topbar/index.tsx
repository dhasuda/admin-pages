import React, { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dropdown } from 'vtex.styleguide'
import ModeButton from './components/ModeButton'

const modes: StoreEditMode[] = ['settings', 'theme']

interface Props {
  changeMode: (mode?: StoreEditMode) => void
  mode?: StoreEditMode
  urlPath: string
}

const availableCultures = [{
  label: 'English (en-US)',
  value: 'en-US',
},
{
  label: 'Português (pt-BR)',
  value: 'pt-BR',
},
]

const Topbar: React.FunctionComponent<Props> = ({
  changeMode,
  mode,
  urlPath,
}) => {
  const [culture, setCulture] = useState({locale: 'en-US'})
  return (
    <div className="ph5 f6 h-3em w-100 flex justify-between items-center">
      <div className="flex items-stretch">
        {mode ? (
          <Fragment>
            <ModeButton changeMode={changeMode} mode={undefined} />
            <ModeButton changeMode={changeMode} mode={mode} />
          </Fragment>
        ) : (
          <Fragment>
              {modes.map(buttonMode => (
                <ModeButton
                  key={buttonMode}
                  changeMode={changeMode}
                  mode={buttonMode}
                />
              ))}
              <div className="flex items-center mv4 pl5 bw1 bl b--muted-5">
                <div className={`pl3 b mid-gray fw5`}>
                  <FormattedMessage id="admin/editor.settings.language" defaultMessage="Language" />
                  <Dropdown
                    variation="inline"
                    size="small"
                    options={availableCultures}
                    value={culture.locale}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCulture({
                        ...culture,
                        locale: e.target.value,
                      })}
                  />
                </div>
              </div>
              <div className="flex items-center mv4 pl5 bw1 bl b--muted-5">
                <FormattedMessage id="admin/pages.editor.container.editpath.label" />:
                <div className="pl3 c-muted-2">{urlPath}</div>
              </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Topbar
