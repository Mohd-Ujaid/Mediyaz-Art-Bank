const routes = [
  '/',
  '/contacts',
  '/clinics',
  '/clinics/become-partners',
  '/inquiry',
  '/for-donors',
  '/for-donors/become-a-sperm-donor',
  '/for-donors/become-an-egg-donor',
  '/for-donors/donor-compensation',
  '/for-donors/faqs',
  '/for-donors/how-to-donate-eggs',
  '/aspiring-parents',
  '/aspiring-parents/assurance-programs',
  '/aspiring-parents/donors',
  '/aspiring-parents/faqs',
  '/aspiring-parents/financing',
  '/aspiring-parents/genetic-screening',
  '/blogs',
  '/register',
  '/robots.txt',
  '/sitemap.xml',
  '/non-existent-page-test-404'
];

async function testAllRoutes() {
  console.log('Starting full route test against http://localhost:3000 ...');
  let errors = 0;
  for (const route of routes) {
    try {
      const url = `http://localhost:3000${route}`;
      const res = await fetch(url);
      const is404Expected = route === '/non-existent-page-test-404';
      const expectedStatus = is404Expected ? 404 : 200;
      
      if (res.status === expectedStatus) {
        console.log(`[PASS] ${route} -> Status ${res.status}`);
      } else {
        console.error(`[FAIL] ${route} -> Expected ${expectedStatus}, got ${res.status}`);
        errors++;
      }
    } catch (err) {
      console.error(`[ERROR] ${route} -> Failed to fetch:`, err.message);
      errors++;
    }
  }

  console.log(`\nTest Completed: ${routes.length - errors}/${routes.length} passed.`);
  if (errors > 0) {
    process.exit(1);
  }
}

testAllRoutes();
