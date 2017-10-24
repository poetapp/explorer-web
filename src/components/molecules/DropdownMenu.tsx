import * as React from 'react';
import * as classNames from 'classnames';
import { ClassNameProps } from 'poet-js';

export interface DropdownMenuProps extends ClassNameProps {
  readonly openClassName?: string;
}

export interface DropdownState {
  open: boolean
}

export class DropdownMenu extends React.Component<DropdownMenuProps, DropdownState> {
  private wrapper: HTMLDivElement;

  static defaultProps = {
    openClassName: 'open'
  };

  constructor() {
    super(...arguments);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div
        className={classNames(this.props.className, this.state.open && this.props.openClassName)}
        ref={wrapper => this.wrapper = wrapper}
        onClick={() => this.toggle()}
      >
        { this.props.children }
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  private hide() {
    this.setState({ open: false })
  }

  private toggle() {
    this.setState(state => ({ open: !state.open }));
  }

  private onClickOutside = (event: any) => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.hide();
    }
  }
}