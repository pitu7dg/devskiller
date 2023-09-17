import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    fixturesFolder: false,
    supportFile: false,
    specPattern: './tests/cypress',
    screenshotOnRunFailure: false,
    video: false,
    excludeSpecPattern: '*.xml',
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'tests/test-results.xml',
    toConsole: true,
  },
});
