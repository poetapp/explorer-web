import { SITE } from '../helpers'
import { HomePage as page } from '../page-objects/home-page'

fixture `Visit home page test`
  .page `${SITE}`

test(`Home page is loaded when visiting ${SITE}`, async t => {
  const wasLoaded = await page.pageClass.exists
  await t.expect(wasLoaded).ok('page class not found')
})
