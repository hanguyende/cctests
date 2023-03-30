const reporter = require("cucumber-html-reporter");
const options = {
  theme: "bootstrap",
  jsonFile: "report/report.json",
  output: "report/cucumber-html-report.html",
  reportSuiteAsScenarios: true,
  launchReport: false,
};

reporter.generate(options);