const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker


const generateApplication = () => {
  let application = {}

  // Application ID
  application.id = "" + faker.number.int({ min: 123456, max: 999999 })

  let now = new Date().toISOString()

  application.sentDate = faker.date.recent({ days: 21 })

  application.name = faker.location.city() + ' ' + faker.helpers.arrayElement(['highway', 'airport runway', 'wind farm', 'interchange', 'junction', 'facility', 'park'])

  application.description = faker.lorem.paragraphs(1, '\n\n')

  application.emailAddress = `${faker.person.firstName().toLocaleLowerCase()}.${faker.person.lastName().toLocaleLowerCase()}@gmail.com`

  application.location = faker.location.city()

  application.gridReference = {
    easting: '611442',
    northing: '926790'
  }

  application.regions = faker.helpers.arrayElements([
    'East Midlands',
    'Eastern',
    'London',
    'North East',
    'North West',
    'South East',
    'South West',
    'Wales',
    'West Midlands',
    'Yorkshire and the Humber'
  ])

  application.mapZoom = faker.helpers.arrayElement([
    'Country',
    'Region',
    'County',
    'Borough',
    'District',
    'None'
  ])

  application.status = faker.helpers.arrayElement([
    'Draft',
    'Pre-application',
    'Acceptance',
    'Pre-examination',
    'Examination',
    'Recommendation'
  ])

  application.sector = faker.helpers.arrayElement([
    'Business and commercial',
    'Energy',
    'Transport',
    'Training',
    'Water',
    'Waste',
    'Waste water'
  ])

  // Personal details
  application.applicant = {}
  application.applicant.organisationName = faker.company.name()
  application.applicant.firstName = faker.person.firstName()
  application.applicant.lastName = faker.person.lastName()
  application.applicant.emailAddress = `${application.applicant.firstName.toLowerCase()}.${application.applicant.lastName.toLowerCase()}@gmail.com`
  application.applicant.phoneNumber = faker.helpers.replaceSymbolWithNumber('079## ### ###')
  application.applicant.address = {
    line1: '1 The Avenue',
    town: 'London',
    postcode: 'W9 1ST'
  }

  application.applicant.website = faker.internet.url()


  // Evidence
  application.evidence = {}
  application.evidence.hasEvidence = faker.helpers.arrayElement([
    'Yes',
    'No'
  ])
  if(application.evidence.hasEvidence == 'Yes') {
    application.evidence.files = [{
      name: 'trick-performance.mp4',
      size: '5MB'
    }, {
      name: 'juggling-show.mp4',
      size: '32MB'
    }, {
      name: 'testimonial.mp3',
      size: '2MB'
    }]
  }

  return application
}

const generateApplications = () => {
  const applications = []

  for(let i = 0; i < 249; i++) {
    applications.push(generateApplication())
  }

  return applications
}

const generateApplicationsFile = (filePath) => {
  const applications = generateApplications()
  const filedata = JSON.stringify(applications, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Applications generated: ${filePath}`)
    }
  )
}

generateApplicationsFile(path.join(__dirname, '../app/data/applications.json'))