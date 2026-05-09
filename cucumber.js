module.exports = {
  default: {
    require: [
      'features/hooks.js',
      'features/support/**/*.js',
      'features/support/steps/**/*.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber.json'
    ],
    publishQuiet: true
  }
}