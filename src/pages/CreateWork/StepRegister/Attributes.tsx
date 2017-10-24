import * as React from 'react';
import * as classNames from 'classnames';
import { ClassNameProps } from 'poet-js';

import { Attribute, AttributeData } from './Attribute';

import './Attributes.scss';

interface AttributesProps extends ClassNameProps {
  readonly attributes: ReadonlyArray<AttributeData>;
  readonly onChange: (attributes: ReadonlyArray<AttributeData>) => void;
  readonly displayErrors: boolean;
}

export class Attributes extends React.Component<AttributesProps, undefined> {
  private attributes?: Attribute[] = [];

  render() {
    return (
      <section className={classNames('attributes', this.props.className)}>
        <h2>Attributes</h2>
        <main>
          { this.props.attributes.map(this.renderAttribute) }
        </main>
        <button
          onClick={this.onAddAttribute}
          className="button-secondary">Add Field</button>
      </section>
    )
  }

  private renderAttribute = (attribute: AttributeData, index: number) => {
    return <Attribute
      key={index}
      keyName={attribute.keyName}
      value={attribute.value}
      optional={attribute.optional}
      keyNameReadOnly={attribute.keyNameReadOnly}
      onKeyChange={this.onKeyChange.bind(this, index)}
      onValueChange={this.onValueChange.bind(this, index)}
      onRemove={this.onRemoveAttribute.bind(this, index)}
      ref={attribute => this.attributes[index] = attribute}
      displayErrors={this.props.displayErrors}
    />
  };

  private onValueChange(index: number, value: string) {
    const attributes = [ ...this.props.attributes ];
    attributes[index] = { ...attributes[index], value };
    this.props.onChange(attributes);
  }

  private onKeyChange(index: number, keyName: string) {
    const attributes = [ ...this.props.attributes ];
    attributes[index] = { ...attributes[index], keyName };
    this.props.onChange(attributes);
  }

  private onAddAttribute = () => {
    if (!this.props.attributes[this.props.attributes.length - 1].keyName) {
      this.attributes[this.attributes.length - 1].focus();
      return;
    }

    this.props.onChange([...this.props.attributes, {
      keyName: '',
      value: '',
      optional: true,
      keyNameReadOnly: false
    }]);

  };

  private onRemoveAttribute(index: number) {
    this.props.onChange(this.props.attributes.filter((el, idx) => idx !== index))
  }
}
