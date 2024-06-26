const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/applications/:applicationId/updates', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

    let updates = application.updates

    res.render('applications/updates/index', {
      application,
      updates
    })
  })

}