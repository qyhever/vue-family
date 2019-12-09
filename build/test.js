const notifier = require('node-notifier')
const path = require('path')
notifier.notify({
  title: 'app',
  message: 'app error',
  subtitle: '34 undefined',
  icon: path.join(__dirname, 'logo.png')
})