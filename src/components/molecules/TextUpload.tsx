import * as React from 'react';
import { ClassNameProps } from 'poet-js';

export interface TextUploadProps extends ClassNameProps {
  readonly text?: string;
  readonly onChange?: (value: string) => void;
  readonly onFileNameChange?: (fileName: string) => void;

  readonly sizeLimit?: number;

  readonly buttonClassName?: string;
  readonly useDefaultStyles?: boolean;
  readonly placeholder?: string;
}

export class TextUpload extends React.Component<TextUploadProps, undefined> {
  public static defaultProps: TextUploadProps = {
    useDefaultStyles: true
  };
  private fileInput?: HTMLInputElement;
  private textArea?: HTMLTextAreaElement;
  private readonly defaultSizeLimit = Math.pow(1024, 2); // 1 MB
  private sizeLimit: number;

  componentWillReceiveProps(props: TextUploadProps) {
    this.sizeLimit = props.sizeLimit || this.defaultSizeLimit;
  }

  render() {
    return this.props.children ? this.renderCustomChildren() : this.renderDefaultChildren();
  }

  private renderDefaultChildren() {
    return (
      <section className={this.props.className} >
        {this.renderFileInput()}
        <div>
          <textarea
            ref={textArea => this.textArea = textArea}
            value={this.props.text}
            onChange={this.onTextAreaChange}
            placeholder={this.props.placeholder} />
        </div>
        <div>
          <button onClick={this.onClick} className={this.props.buttonClassName}>Upload</button>
          <span>acceptable formats: .txt, .md</span>
        </div>
      </section>
    )
  }

  private renderCustomChildren() {
    if (!this.validateChildren())
      throw new Error('TextUpload must have a TextUploadButton child.');

    return (
      <section className={this.props.className} >
        {this.renderFileInput()}
        {React.Children.map(this.props.children, (child: any) => {
          if (child.type === TextUploadButton)
            return React.cloneElement(child, {onClick: this.onClick});
          else
            return child;
        })}

      </section>
    )
  }

  private renderFileInput = () => {
    return <input
      type="file"
      ref={fileInput => this.fileInput = fileInput}
      onChange={this.onFileInputChange}
      accept=".txt, .md"
      style={{'display': 'none'}}
    />;
  }

  private validateChildren = () => {
    const hasButton = () => {
      return React.Children.map(this.props.children, (child: any) => child.type === TextUploadButton).some(el => el);
    };

    return hasButton();
  };

  private onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.fileInput.click();
  };

  private onFileInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = this.fileInput.files[0];

    if (!file) {
      return;
    }

    if (file.size > this.sizeLimit) {
      console.log('Size is too big');
      return;
    }

    const reader = new FileReader();
    reader.onload = this.onFileLoaded;
    reader.readAsText(file);

    this.props.onFileNameChange && this.props.onFileNameChange(file.name);

  };

  private onFileLoaded = (event: any) => {
    this.props.onChange && this.props.onChange(event.target.result);
  };

  private onTextAreaChange = (event: any) => {
    this.props.onChange && this.props.onChange(this.textArea.value);
  };

}

interface TextUploadButtonProps {
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class TextUploadButton extends React.Component<TextUploadButtonProps, undefined> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}