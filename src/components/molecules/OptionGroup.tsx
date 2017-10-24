import * as React from 'react'
import * as classNames from 'classnames'
import { ClassNameProps } from 'poet-js'

export interface OptionGroupProps extends ClassNameProps {
  readonly selectedId: any;
  readonly onOptionSelected: (id: any) => void;
}

export class OptionGroup extends React.Component<OptionGroupProps, undefined> {
  render() {
    return (
      <ol className={classNames(this.props.className)} >
        { React.Children.map(this.props.children, this.renderOption.bind(this)) }
      </ol>
    )
  }

  private renderOption(child: any, index: number) { // TODO: child should be of type React.ReactChild or ReactElement<P>
    return (
      React.cloneElement(child, {
        onClick: () => { this.props.onOptionSelected(child.props.id) },
        isSelected: child.props.id === this.props.selectedId
      })
    )
  }
}

export interface OptionProps {
  readonly id: any;
  readonly isSelected?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
}

export class Option extends React.Component<OptionProps, undefined> {
  click = () => {
    if (!this.props.disabled) {
      this.props.onClick()
    }
  }
  render() {
    return (
      <li key={this.props.id} className={classNames(this.props.isSelected && 'selected', this.props.disabled && 'disabled')} onClick={this.click}>
        {this.props.children}
      </li>
    )
  }
}