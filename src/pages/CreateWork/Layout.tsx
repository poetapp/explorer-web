import * as React from 'react'
import { Work, LicenseTypes } from 'poet-js'

import { Configuration } from '../../configuration'
import { publicKeyToAddress } from '../../helpers/AddressHelper'

import { StepRegister, StepRegisterData } from './StepRegister/StepRegister'
import { AttributeData } from './StepRegister/Attribute'
import { StepLicense, StepLicenseData } from './StepLicense/StepLicense'
import StepPublishAndReview from './StepPublishAndReview/StepPublishAndReview'
import { CurrentStep } from './CurrentStep'

import './Layout.scss'

export interface CreateWorkProps {
  readonly userPublicKey: string;
  readonly mode: 'create' | 'edit';
  readonly workId: string;
}

export interface CreateWorkActions {
  readonly createWorkRequested: (claims: any[]) => any // Actions.claimsSubmitRequested
}

interface CreateWorkLayoutState extends Partial<StepRegisterData>, Partial<StepLicenseData> {
  readonly selectedStep?: number;
  readonly hasLicense?: boolean;
}

export class CreateWorkLayout extends React.Component<CreateWorkProps & CreateWorkActions, CreateWorkLayoutState> {
  private readonly StepNames: ReadonlyArray<string> = ['Register a Work', 'Add a License', 'Preview and Publish']
  private readonly defaultAttributes: ReadonlyArray<AttributeData> = ['name', 'author', 'dateCreated', 'datePublished'].map(keyName => ({keyName, value: '', keyNameReadOnly: true}))

  constructor() {
    super(...arguments)
    this.state = {
      selectedStep: 0,
      mediaType: 'article',
      articleType: 'news-article',
      content: '',
      attributes: [...this.defaultAttributes],

      hasLicense: false,
      licenseType: LicenseTypes[0],
      pricing: {
        price: {
          amount: 0,
          currency: 'BTC'
        },
        frequency: 'oneTime'
      }
    }
  }

  render() {
    return (
      <section className="container create-work">
        <header>
          <h1>{ this.StepNames[this.state.selectedStep] }</h1>
          <CurrentStep
            selectedStep={this.state.selectedStep}
            className="current-step"
          />
        </header>
        { this.state.selectedStep === 0 &&
          <StepRegister
            onSubmit={this.onStepRegisterSubmit}
            mediaType={this.state.mediaType}
            onMediaTypeChange={mediaType => this.setState({ mediaType })}
            articleType={this.state.articleType}
            onArticleTypeChange={articleType => this.setState({ articleType })}
            content={this.state.content}
            onContentChange={content => this.setState({ content })}
            attributes={this.state.attributes}
            onAttributesChange={attributes => this.setState({ attributes })}
          /> }
        { this.state.selectedStep === 1 &&
          <StepLicense
            onSubmit={this.onStepLicenseSubmit}
            onSkip={this.onStepLicenseSkip}
            licenseType={this.state.licenseType}
            onLicenseTypeChange={licenseType => this.setState({ licenseType })}
            pricing={this.state.pricing}
            onPricingChange={pricing => this.setState({ pricing })} /> }
        { this.state.selectedStep === 2 &&
          <StepPublishAndReview
            onSubmit={this.onStepPublishAndReviewSubmit}
            workTitle={this.getAttributeValue('name')}
            contentHash={this.getAttributeValue('contentHash')}
            wordCount={this.getAttributeValue('wordCount')}
            authorName={this.getAttributeValue('author')}
            price={this.state.hasLicense && this.state.pricing.price}
            licenseType={this.state.hasLicense && this.state.licenseType}
            /> }
      </section>

    )
  }

  componentWillMount() {
    if (this.props.mode === 'edit') {
      this.loadWork()
    }
  }

  componentDidMount() {
    document.title = 'Register New Work'
  }

  componentWillUnmount() {
    document.title = 'Poet'
  }

  private onStepRegisterSubmit = () => {
    this.setState({
      selectedStep: 1
    })

    window.scrollTo(0, 0)
  }

  private onStepLicenseSubmit = () => {
    this.setState({
      selectedStep: 2,
      hasLicense: true
    })

    window.scrollTo(0, 0)
  }

  private onStepLicenseSkip: (() => void) = () => {
    this.setState({
      selectedStep: 2,
      hasLicense: false
    })
    window.scrollTo(0, 0)
  }

  private onStepPublishAndReviewSubmit = () => {
    const noReservedAttributes = (attribute: AttributeData) =>
      !['supersedes', 'supersededby'].includes(attribute.keyName)
    const attributeToKeyValue = (attribute: AttributeData) =>
      ({ key: attribute.keyName, value: attribute.value })

    const request = [{
      type: 'Work',
      attributes: [
        this.props.mode === 'edit' && { key: 'supersedes', value: this.props.workId },
        ...this.state.attributes.filter(noReservedAttributes).map(attributeToKeyValue),
        { key: 'mediaType', value: this.state.mediaType },
        { key: 'articleType', value: this.state.articleType },
        { key: 'content', value: this.state.content },
        { key: 'dateSubmitted', value: '' + new Date().getTime() }
      ].filterTruthy()
    }]
    if (this.state.hasLicense) {
      request.push({
        type: 'Offering',
        attributes: {
          'licenseType': this.state.licenseType.id,
          'licenseDescription': this.state.licenseType.description,
          'pricingFrequency': this.state.pricing.frequency,
          'pricingPriceAmount': '' + this.state.pricing.price.amount,
          'pricingPriceCurrency': this.state.pricing.price.currency,
          'paymentAddress': publicKeyToAddress(this.props.userPublicKey),
          'amountInSatoshis': (this.state.pricing.price.amount * 1e8).toFixed(0)
        } as any
      })
    }
    this.props.createWorkRequested(request)
  }

  private getAttributeValue(key: string): string {
    const attribute = this.state.attributes.find(_ => _.keyName === key)
    return attribute && attribute.value
  }

  private loadWork() {
    const objectToKeyNameValue = (_: Object): ReadonlyArray<{readonly keyName: string, readonly value: any}> => Object.entries(_).map(([keyName, value]) => ({keyName, value}))

    /**
     * Attributes come from the API different to how we send them:
     * They are an object instead of a Key-Value array, don't have the optional and read-only fields, and aren't necessarily sorted correctly.
     * mergeDefaultAttributes takes the attributes object already converted to an array and ensures .
     */
    const mergeDefaultAttributes = (attributes: ReadonlyArray<AttributeData>): ReadonlyArray<AttributeData> => {
      const defaultAttributes = this.defaultAttributes.map(defaultAttribute => {
        const attribute = attributes.find(_ => _.keyName === defaultAttribute.keyName)
        if (!attribute && !defaultAttribute.optional)
          console.warn(`The work we're editing is missing the %c${defaultAttribute.keyName}%c attribute, which is mandatory.`, 'font-style: italic', 'font-style: regular')
        return { ...defaultAttribute, ...(attribute || {})}
      })

      const customAttributes = attributes
        .filter(attribute => !this.defaultAttributes.some(defaultAttribute => defaultAttribute.keyName === attribute.keyName))
        .filter(attribute => !['articleType', 'mediaType', 'content', 'dateSubmitted'].includes(attribute.keyName))
        .map(_ => ({..._, optional: true}))

      return [...defaultAttributes, ...customAttributes]
    }

    fetch(Configuration.api.explorer + '/works/' + this.props.workId).then(_ => _.json()).then((_: any) => {
      const license = _.offerings && _.offerings[0] && _.offerings[0].attributes
      const licenseType = license && LicenseTypes.find(_ => _.id === license.licenseType)

      if (license && !licenseType)
        console.warn(
          `The work we're editing has an invalid license type: '${license.licenseType}'.` +
          `Valid license types are: ${LicenseTypes.map(_ => `'${_.id}'`)}. ` +
          `Defaulting to '${LicenseTypes[0].id}'`)

      this.setState({
        mediaType: _.attributes.mediaType,
        articleType: _.attributes.articleType,
        content: _.attributes.content,
        attributes: mergeDefaultAttributes(objectToKeyNameValue(_.attributes)),

        hasLicense: license,
        licenseType: licenseType || LicenseTypes[0],
        pricing: {
          price: {
            amount: license && license.pricingPriceAmount,
            currency: license && license.pricingPriceCurrency
          },
          frequency: license && license.pricingFrequency
        }

      })
    })
  }
}

