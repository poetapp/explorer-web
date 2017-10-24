import * as React from 'react';

import '../Layout.scss';
import './Content.scss';

import { TextUpload } from '../../../components/molecules/TextUpload';

export interface ContentProps {
  readonly content: string;
  readonly onChange?: (content: string) => void;
  readonly onFileNameChange?: (fileName: string) => void;
}

export class Content extends React.Component<ContentProps, undefined> {

  render() {
    return (
      <section className="content">
        <h2>Content</h2>
        <form>
          <TextUpload
            className="text-upload"
            buttonClassName="button-secondary"
            placeholder="Content"
            text={this.props.content}
            onChange={this.props.onChange}
            onFileNameChange={this.props.onFileNameChange} />
        </form>
      </section>
    )
  }

}
