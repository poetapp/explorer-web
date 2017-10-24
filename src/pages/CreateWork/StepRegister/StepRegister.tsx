import * as React from 'react';
const bitcore = require('bitcore-lib');

import { wordCount } from '../../../helpers/StringHelper';
import { MediaType } from './MediaType';
import { Attributes } from './Attributes';
import { AttributeData } from './Attribute';
import { Content } from './Content';

import './StepRegister.scss';

export interface StepRegisterData {
  readonly articleType: string;
  readonly mediaType: string;
  readonly content: string;
  readonly attributes: ReadonlyArray<AttributeData>;
}

export interface StepRegisterProps extends StepRegisterData {
  readonly onSubmit: () => void;
  readonly onMediaTypeChange: (_: string) => void;
  readonly onArticleTypeChange: (_: string) => void;
  readonly onContentChange: (_: string) => void;
  readonly onAttributesChange: (_: ReadonlyArray<AttributeData>) => void;
}

interface StepRegisterState {
  readonly displayErrors?: boolean;
}

export class StepRegister extends React.Component<StepRegisterProps, StepRegisterState> {

  constructor() {
    super(...arguments);
    this.state = {
      displayErrors: false
    }
  }

  render() {
    return (
      <section className="step-1-register">
        <MediaType
          mediaType={this.props.mediaType}
          articleType={this.props.articleType}
          onMediaTypeSelected={this.props.onMediaTypeChange}
          onArticleTypeSelected={this.props.onArticleTypeChange}
        />
        <Attributes
          attributes={this.props.attributes}
          onChange={this.props.onAttributesChange}
          displayErrors={this.state.displayErrors}/>
        <Content
          content={this.props.content}
          onChange={this.onContentChange}
          onFileNameChange={this.onContentFileNameChange} />
        <button className="button-primary" onClick={this.onSubmit}>Next</button>
      </section>
    );
  }

  private onContentChange = (content: string) => {
    this.props.onContentChange(content)
    this.contentToAttributes(content);
  }

  private onContentFileNameChange = (fileName: string) => {
    this.contentToAttributes(null, fileName);
  }

  private onSubmit = () => {
    if (this.gotInvalidFields()) {
      this.setState({ displayErrors: true });
      return;
    }

    this.props.onSubmit();
  }

  private contentToAttributes(content?: string, fileName?: string) {
    const attributes = [...this.props.attributes];

    const attributeByKey = (keyName: string) => attributes.find(attribute => attribute.keyName === keyName);
    const updateAttribute = (keyName: string, value: string) => attributeByKey(keyName).value = value;
    const addAttribute = (keyName: string, value: string) => attributes.push({ keyName, value });
    const upsertAttribute = (keyName: string, value: string) => attributeByKey(keyName) ? updateAttribute(keyName, value) : addAttribute(keyName, value);

    if (fileName && !attributeByKey('name') || !attributeByKey('name').value) {
      upsertAttribute('name',  fileName)
    }

    if (content) {
      upsertAttribute('contentHash', new Buffer(bitcore.crypto.Hash.sha256(new Buffer(content))).toString('hex'));
      upsertAttribute('fileSize', '' + content.length);
      upsertAttribute('wordCount', '' + wordCount(content));
      upsertAttribute('dateCreated', '' + new Date().getTime());
    }

    this.props.onAttributesChange(attributes)
  }

  private gotInvalidFields() {
    return this.props.attributes.some(attribute => !attribute.optional && !attribute.value);
  }

}