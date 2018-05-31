import React from 'react'

import { storiesOf } from '@storybook/react'
import { wInfo } from './index.stories'

storiesOf('Welcome', module).addWithJSX(
  'to Storybook🎊',
  wInfo(`


    ### Notes

    Hello world!:

    ### Usage
    ~~~js
    <div>This is an example component</div>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.
  `)(() => <div>This is an example component</div>)
)
