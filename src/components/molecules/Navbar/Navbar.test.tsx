import { FeatureToggles } from '@paralleldrive/react-feature-toggles'
import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { describe } from 'riteway'

import { Images } from '../../../images/Images'
import { Navbar } from './Navbar'

const initialFeatures = ['auth', 'avatar']

const render = ReactDOMServer.renderToStaticMarkup
const NavBarWithFeature = (props: any) => (
  <FeatureToggles features={initialFeatures}>
    <Navbar {...props} />
  </FeatureToggles>
)

const createProps = ({
  shadow = false,
  transparent = false,
  margin = false,
  displayLogo = false,
  displaySearch = false,
  user = {},
  onSignOut = () => ({}),
} = {}) => ({
  user,
  onSignOut,
  displaySearch,
  displayLogo,
  shadow,
  transparent,
  margin,
})

describe('<Navbar {...props} />', async (should: any) => {
  const { assert } = should('render the correct Navbar')
  {
    const $ = dom.load(render(<NavBarWithFeature />))
    assert({
      given: 'no props',
      should: 'not render an avatar',
      actual: $('.avatar').length,
      expected: 0,
    })
    assert({
      given: 'no props',
      should: 'not render a search',
      actual: $('.search').length,
      expected: 0,
    })
    assert({
      given: 'No Props',
      should: 'not render a logo',
      actual: $('.navbar-brand').length,
      expected: 0,
    })
    assert({
      given: 'No Props',
      should: 'not render a transparent navbar',
      actual: $('.transparent').length,
      expected: 0,
    })
    assert({
      given: 'No Props',
      should: 'not render a margin navbar',
      actual: $('.margin').length,
      expected: 0,
    })
    assert({
      given: 'No Props',
      should: 'not render a shadow navbar',
      actual: $('.shadow').length,
      expected: 0,
    })
  }
  {
    const user = { profile: { avatar: Images.Avatar, createdAt: 'test' } }

    const $ = dom.load(render(<NavBarWithFeature {...createProps({ user })} />))
    assert({
      given: 'user with createdAt',
      should: 'render an avatar',
      actual: $('.avatar').length,
      expected: 1,
    })
  }
  {
    const displayLogo = true

    const $ = dom.load(render(<NavBarWithFeature {...createProps({ displayLogo })} />))
    assert({
      given: 'displayLogo Prop',
      should: 'render a logo',
      actual: $('.navbar-brand').length,
      expected: 1,
    })
  }
  {
    const shadow = true

    const $ = dom.load(render(<NavBarWithFeature {...createProps({ shadow })} />))
    assert({
      given: 'shadow prop',
      should: 'render a shadow navbar',
      actual: $('.shadow').length,
      expected: 1,
    })
  }
  {
    const transparent = true

    const $ = dom.load(render(<NavBarWithFeature {...createProps({ transparent })} />))
    assert({
      given: 'transparent prop',
      should: 'render a transparent navbar',
      actual: $('.transparent').length,
      expected: 1,
    })
  }
  {
    const margin = true

    const $ = dom.load(render(<NavBarWithFeature {...createProps({ margin })} />))
    assert({
      given: 'margin prop',
      should: 'render a margin navbar',
      actual: $('.margin').length,
      expected: 1,
    })
  }
})
