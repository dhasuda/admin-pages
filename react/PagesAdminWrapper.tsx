import { mapObjIndexed, values } from 'ramda'
import React, { useState } from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { PageHeader, Tab, Tabs } from 'vtex.styleguide'
import TargetPathContext from './components/admin/TargetPathContext'
import Loader from './components/Loader'
import { useAdminLoadingContext } from './utils/AdminLoadingContext'

export interface TargetPathRenderProps {
  targetPath: string
  setTargetPath: (s: string) => void
}

const fields = {
  pages: {
    path: 'pages',
    titleId: 'admin/pages.admin.tabs.pages',
  },
}

interface FieldInfo {
  path: string
  titleId: string
}

interface CustomProps {
  targetPath: string
}

defineMessages({
  pages: {
    defaultMessage: 'Pages',
    id: 'admin/pages.admin.tabs.pages',
  },
})

type Props = CustomProps & ReactIntl.InjectedIntlProps & RenderContextProps

const PagesAdminWrapper: React.FunctionComponent<Props> = ({
  children,
  intl,
}) => {
  const [targetPath, setTargetPath] = useState('')
  const { startLoading } = useAdminLoadingContext()
  const runtime = useRuntime()

  return (
    <TargetPathContext.Provider value={{ targetPath, setTargetPath }}>
      <div className="h-100 overflow-y-auto bg-light-silver">
        <div className="center mw8">
          <PageHeader title="Messenger Custom" />
          <div className="ph7">
            <Tabs>
              {values(
                mapObjIndexed(
                  (info: FieldInfo, key: string) => (
                    <Tab
                      active={
                        targetPath.startsWith(info.path) &&
                        (targetPath === '' ? targetPath === info.path : true)
                      }
                      key={key}
                      label={intl.formatMessage({ id: info.titleId })}
                      onClick={() => {
                        runtime.navigate({ to: '/admin/email/' + info.path })
                        startLoading()
                        setTargetPath(info.path)
                      }}
                    />
                  ),
                  fields
                )
              )}
            </Tabs>
          </div>
          <div className="ma7">{runtime.preview ? <Loader /> : children}</div>
        </div>
      </div>
    </TargetPathContext.Provider>
  )
}

export default injectIntl(PagesAdminWrapper)
