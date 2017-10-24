/**
 * DEPRECATED
 * Use molecules/DropdownMenu instead.
 */

import * as React from 'react'
import * as classNames from 'classnames'
import { ClassNameProps } from 'poet-js'

export interface DropdownMenuProps extends ClassNameProps {
  options: string[];
  onOptionSelected: (option: string) => void;
}

export interface DropdownState {
  open: boolean
}

export class DropdownMenu extends React.Component<DropdownMenuProps, DropdownState> {
  private wrapper: HTMLDivElement;

  constructor() {
    super(...arguments);
    this.state = {
      open: false
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    return (
      <div className={classNames(this.props.className)} ref={wrapper => this.wrapper = wrapper}>
        <button onClick={this.toggle.bind(this)}
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
        >
          { this.props.children }
        </button>
        { this.state.open && <ul className="dropdown">
          { this.props.options.map(option =>
            <li
              key={option}
              onClick={this.selected.bind(this, option)}
              className="dropdown-item" >
                {option}
            </li>
          )
          }
        </ul> }
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private toggle() {
    this.setState(state => ({ open: !state.open }))
  }

  private hide() {
    this.setState({ open: false })
  }

  private selected(option: string) {
    this.hide();
    this.props.onOptionSelected(option)
  }

  private handleClickOutside(event: any) {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.hide();
    }
  }
}