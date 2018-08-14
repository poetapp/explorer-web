import * as React from 'react'

import { text, boolean, select } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { AvatarMenu } from './AvatarMenu'

storiesOf('Components/Menus', module).addWithJSX(
  'AvatarMenu',
  wInfo(`

  ### Notes

  This is an input.

  ### Usage
  ~~~ts
    <AvatarMenu />
  ~~~`)(() => <AvatarMenu />)
)
