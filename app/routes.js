const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

router.get('/clear-all-data', (req, res) => {
  req.session.data = require('./data/applications.json')
  res.redirect('/account/sign-in')
})

require('./routes/account')(router)
require('./routes/applications')(router)
require('./routes/application--approve')(router)
require('./routes/application--reject')(router)
require('./routes/application--edit-name')(router)

require('./routes/key-dates')(router)
require('./routes/team')(router)
require('./routes/documents')(router)
require('./routes/updates')(router)