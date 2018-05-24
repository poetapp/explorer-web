import React from 'react'

import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { text, boolean } from '@storybook/addon-knobs/react'

  const wInfoStyle = {
    header: {
      h1: {
        marginRight: '20px',
        fontSize: '25px',
        display: 'inline',
      },
      body: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      h2: {
        display: 'inline',
        color: '#999',
      }
    },
    infoBody: {
      backgroundColor: '#eee',
      padding: '0px 5px',
      lineHeight: '2',
    }
  }
  export const wInfo = text => withInfo({ inline: true, source: false, styles: wInfoStyle, text: text })
