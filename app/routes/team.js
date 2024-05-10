const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/applications/:applicationId/team', (req, res) => {
    let application = req.session.data.applications.find(application => application.id === req.params.applicationId)

  res.render('applications/team/index', {
      application
    })
  })

}