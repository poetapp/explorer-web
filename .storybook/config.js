import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'
import { withKnobs, select } from '@storybook/addon-knobs/react'
addDecorator(withKnobs)
setAddon(JSXAddon)

// automatically import all files ending in *.stories.js | ts | tsx
const req = require.context('../stories', true, /.stories.(js|tsx?)$/)
function loadStories() {
  require('./welcomeStory')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
