//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('statusColour', status => {
  switch(status) {
    case 'Draft':
      return 'govuk-tag--grey'
    case 'Pre-application':
      return 'govuk-tag--purple'
    case 'Acceptance':
      return 'govuk-tag--purple'
    case 'Pre-examination':
      return 'govuk-tag--orange'
    case 'Examination':
      return 'govuk-tag--green'
    case 'Recommendation':
      return 'govuk-tag--pink'
  }
})

addFilter('documentStatusColour', status => {
  switch(status) {
    case 'Published':
      return 'govuk-tag--green'
    case 'Ready to publish':
      return 'govuk-tag--blue'
    case 'Not checked':
      return 'govuk-tag--purple'
    case 'Checked':
      return 'govuk-tag--pink'
    case 'Do not publish':
      return 'govuk-tag--red'
  }
})