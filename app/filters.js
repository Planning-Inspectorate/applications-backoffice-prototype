//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here
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