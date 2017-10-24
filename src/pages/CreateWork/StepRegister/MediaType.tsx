import * as React from 'react'
import * as classNames from 'classnames'
import { ClassNameProps } from 'poet-js'

import { OptionGroup, Option } from '../../../components/molecules/OptionGroup'

import './MediaType.scss';

export interface MediaTypeProps extends ClassNameProps {
  readonly onMediaTypeSelected?: (mediaType: string) => void;
  readonly onArticleTypeSelected?: (articleType: string) => void;
  readonly mediaType: string;
  readonly articleType: string;
}

export class MediaType extends React.Component<MediaTypeProps, undefined> {

  render() {
    return (
      <section className={classNames('media-type', this.props.className)}>
        <h2>Media Type</h2>
        <OptionGroup
          className="tab-option-group"
          selectedId={this.props.mediaType}
          onOptionSelected={this.props.onMediaTypeSelected}
        >
          <Option id="article">Article</Option>
          <Option id="document">Document</Option>
          <Option id="audio" disabled>Audio</Option>
          <Option id="video" disabled>Video</Option>
          <Option id="image" disabled>Image</Option>
        </OptionGroup>
        { this.props.mediaType === "article" &&
        <OptionGroup
          className="panel-option-group"
          selectedId={this.props.articleType}
          onOptionSelected={this.props.onArticleTypeSelected}
        >
          <Option id="news-article">News Article</Option>
          <Option id="report">Report</Option>
          <Option id="scholarly">Scholarly</Option>
          <Option id="technical">Technical</Option>
        </OptionGroup>
        }
      </section>
    )
  }

}