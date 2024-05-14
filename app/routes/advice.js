const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/applications/:applicationId/advice', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    let advice = application.advice

    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedSectorFilters = _.get(req.session.data.filters, 'sectors')

    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedSectorFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      advice = advice.filter(application => {
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
    let pagination = new Pagination(advice, req.query.page, pageSize)
    // documents = pagination.getData()

    res.render('applications/advice/index', {
      application,
      advice,
      selectedFilters,
      pagination
    })
  })

  router.get('/applications/:applicationId/advice/clear-search', (req, res) => {
    _.set(req, 'session.data.search.emailAddress', '')
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId/advice/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId/advice/remove-sector/:sector', (req, res) => {
    _.set(req, 'session.data.filters.sectors', _.pull(req.session.data.filters.sectors, req.params.sector))
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId/advice/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.sectors', null)
    res.redirect('/applications')
  })

  router.get('/applications/:applicationId/advice/:documentId', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    res.render('applications/show', {
      application
    })
  })


}