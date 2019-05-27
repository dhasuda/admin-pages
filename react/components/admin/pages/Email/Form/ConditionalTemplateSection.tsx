import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Dropdown } from 'vtex.styleguide'
import {
  ConditionalTemplatePicker,
  ConditionalTemplatePickerProps,
} from './ConditionalTemplatePicker'
import SectionTitle from './SectionTitle'
import { FormErrors } from './typings'

import { PagesFormData } from 'pages'

type TemplatePickerCallbacks = Pick<
  ConditionalTemplatePickerProps,
  | 'onChangeOperatorConditionalTemplate'
  | 'onChangeStatementsConditionalTemplate'
  | 'onChangeTemplateConditionalTemplate'
  | 'onRemoveConditionalTemplate'
>

export interface ConditionalTemplateSectionProps
  extends TemplatePickerCallbacks {
  detailChangeHandlerGetter: (
    detailName: keyof Route
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  formErrors: FormErrors
  onAddConditionalTemplate: () => void
  pages: PagesFormData[]
  blockId: string
  templates: Template[]
}

type Props = ConditionalTemplateSectionProps & ReactIntl.InjectedIntlProps

const messages = defineMessages({
  defaultFieldLabel: {
    defaultMessage: 'Default',
    id: 'admin/pages.admin.pages.form.templates.field.default',
  },
  templateTitle: {
    defaultMessage: 'Templates',
    id: 'admin/pages.admin.pages.form.templates.title',
  },
})

export const ConditionalTemplateSection: React.FunctionComponent<Props> = ({
  detailChangeHandlerGetter,
  formErrors,
  intl,
  onAddConditionalTemplate,
  onChangeOperatorConditionalTemplate,
  onChangeStatementsConditionalTemplate,
  onChangeTemplateConditionalTemplate,
  onRemoveConditionalTemplate,
  pages,
  blockId,
  templates,
}) => (
  <React.Fragment>
    <SectionTitle textId="admin/pages.admin.pages.form.templates.title" />
    <Dropdown
      label={intl.formatMessage(messages.defaultFieldLabel)}
      options={templates.map(({ id }) => ({ value: id, label: id }))}
      onChange={detailChangeHandlerGetter('blockId')}
      value={blockId}
      errorMessage={
        formErrors.blockId && intl.formatMessage({ id: formErrors.blockId })
      }
    />
  </React.Fragment>
)

export default ConditionalTemplateSection
