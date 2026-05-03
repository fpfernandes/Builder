module.exports = {
  default: {
    require: [
      'features/support/**/*.js',
      'features/steps/**/*.js',
      'hooks.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber.json'
    ],
    publishQuiet: true
  }
}