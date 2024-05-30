const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/applications', (req, res) => {
    let applications = req.session.data.applications

    let keyWords = _.get(req.session.data.search, 'keyWords')

    if(keyWords) {
      let applicationsByName = applications.filter(application => {
        return application.name.toLowerCase().indexOf(keyWords.toLowerCase()) > -1
      })

      let applicationsByReference = applications.filter(application => {
        return application.id.indexOf(keyWords.toLowerCase()) > -1
      })

      if(applicationsByName.length > 0) {
        applications = applicationsByName
      } else {
        applications = applicationsByReference
      }

    }

    // ['Received', ...]
    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedSectorFilters = _.get(req.session.data.filters, 'sectors')

    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedSectorFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      applications = applications.filter(application => {
        let matchesStatus = true
        let matchesSector = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(application.status);
        }

        if(_.get(selectedSectorFilters, 'length')) {
          matchesSector = selectedSectorFilters.includes(application.sector);
        }

        return matchesStatus && matchesSector
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/applications/remove-status/${label}`
          }
        })
      })
    }

    if(_.get(selectedSectorFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Sector' },
        items: selectedSectorFilters.map(label => {
          return {
            text: label,
            href: `/applications/remove-sector/${label}`
          }
        })
      })
    }

    let pageSize = 25
    let pagination = new Pagination(applications, req.query.page, pageSize)
    applications = pagination.getData()

    res.render('applications/index', {
      applications,
      selectedFilters,
      pagination
    })
  })

  router.get('/applications/clear-search', (req, res) => {
    _.set(req, 'session.data.search.keyWords', '')
    res.redirect('/applications')
  })

  router.get('/applications/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/applications')
  })

  router.get('/applications/remove-sector/:sector', (req, res) => {
    _.set(req, 'session.data.filters.sectors', _.pull(req.session.data.filters.sectors, req.params.sector))
    res.redirect('/applications')
  })

  router.get('/applications/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.sectors', null)
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/show', {
      application
    })
  })




}