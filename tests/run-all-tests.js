const { execSync } = require('child_process');

const testSuites = [
  'tests/integration.spec.ts',
  'tests/auth.spec.ts',
  'tests/admin-dashboard.spec.ts',
  'tests/trainer-dashboard.spec.ts',
  'tests/trainee-dashboard.spec.ts',
  'tests/shared-features.spec.ts'
];

console.log('Running all test suites...');

let failedTests = [];

for (const testSuite of testSuites) {
  try {
    console.log(`\nRunning ${testSuite}...`);
    execSync(`npx playwright test ${testSuite}`, { stdio: 'inherit' });
    console.log(`✅ ${testSuite} completed successfully`);
  } catch (error) {
    console.error(`❌ ${testSuite} failed with error code: ${error.status}`);
    failedTests.push(testSuite);
  }
}

if (failedTests.length > 0) {
  console.error('\n❌ The following test suites failed:');
  failedTests.forEach(test => console.error(`  - ${test}`));
  process.exit(1);
} else {
  console.log('\n✅ All test suites completed successfully!');
}