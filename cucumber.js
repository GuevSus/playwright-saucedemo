module.exports = {
  default: [
    '--require support/hooks.js',
    '--require step-definitions/sauceDemoSteps.js',
    '--format progress',
    '--format html:reports/cucumber-report.html'
  ].join(' ')
};