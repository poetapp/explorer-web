import { isActiveFeatureName } from '@paralleldrive/feature-toggles'
import { Feature } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'

import { FeatureName } from 'config/features'
import { Images } from 'images/Images'

import './Footer.scss'

export class Footer extends React.Component<undefined, undefined> {
  render() {
    return (
      <footer>
        <div>
          <a href="#">{new Date().getFullYear()} Po.et</a>
          <Feature>
            {({ features }) =>
              isActiveFeatureName(FeatureName.Footer, features) && (
                <React.Fragment>
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                </React.Fragment>
              )
            }
          </Feature>
        </div>
        <img src={Images.Quill} />
        <Feature>
          {({ features }) =>
            isActiveFeatureName(FeatureName.Footer, features) && (
              <div>
                <a href="#">Frost API</a>
                <a href="#">Blog</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
              </div>
            )
          }
        </Feature>
      </footer>
    )
  }
}
