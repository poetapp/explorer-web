import * as React from 'react';
import { ClassNameProps } from 'poet-js';

export interface ImageUploadProps extends ClassNameProps {
  readonly onChange?: (imageDataUrl: string) => void;
  readonly buttonClassName?: string;
  readonly fileSizeLimit?: number;
  readonly imageWidthLimit?: number;
  readonly imageHeightLimit?: number;
  readonly imageData?: string;
  readonly spinnerUrl?: string;
}

export interface ImageUploadState {
  readonly isLoading?: boolean;
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
  public static defaultProps: ImageUploadProps = {
    imageWidthLimit: 128,
    imageHeightLimit: 128,
    spinnerUrl: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    fileSizeLimit: Math.pow(1024, 2) // 1 MB
  };

  state = {
    isLoading: false
  };

  private fileInput: HTMLInputElement;

  render() {
    return (
      <section className={this.props.className} >
        <input
          type="file"
          ref={fileInput => this.fileInput = fileInput}
          onChange={this.onFileChange.bind(this)}
          accept="image/*"
          style={{'display': 'none'}}
        />
        <img
          src={this.state.isLoading ? this.props.spinnerUrl : this.props.imageData}
          className="rounded-circle"
          onClick={this.onImageClick.bind(this)}
        />
        <button onClick={this.onImageClick.bind(this)} className={this.props.buttonClassName}>Upload Image</button>
      </section>
    )
  }

  private onImageClick(event: Event) {
    event.preventDefault();
    this.fileInput.click();
  }

  private onFileChange(event: Event) {
    event.preventDefault();

    const file = this.fileInput.files[0];

    if (!file) {
      return;
    }

    if (file.size > this.props.fileSizeLimit) {
      console.log('Size is too big');
      return;
    }

    this.setState({
      isLoading: true
    });

    const imageObjectUrl = URL.createObjectURL(file);

    this.imageDataUrlToCanvas(imageObjectUrl).then((canvas: HTMLCanvasElement) => {
      URL.revokeObjectURL(imageObjectUrl);
      const croppedImage = this.cropImageIntoSquareFromCenter(canvas);
      const resizedImage = this.resizeImage(croppedImage, this.props.imageWidthLimit, this.props.imageHeightLimit);
      const imageDataUrl = resizedImage.toDataURL("image/png");

      this.setState({
        isLoading: false
      });

      this.props.onChange(imageDataUrl);
    })
  }

  private imageDataUrlToCanvas(imageDataUrl: string): Promise<HTMLCanvasElement> {
    return new Promise<HTMLCanvasElement>((resolve, reject) => {
      const image = new Image();
      image.src = imageDataUrl;

      image.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(image, 0, 0);

        resolve(canvas);
      };

      image.onerror = function(error: ErrorEvent) {
        reject(error);
      }
    });
  }

  /**
   * Takes a canvas with an image drawn on it and returns a new canvas with the resized image.
   * The original canvas is left unmodified.
   */
  private resizeImage(image: HTMLCanvasElement, maxWidth: number, maxHeight: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    const { width: newWidth, height: newHeight } = this.scaleDownSize(image.width, image.height, maxWidth, maxHeight);

    canvas.width = newWidth;
    canvas.height = newHeight;

    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(image, 0, 0, newWidth, newHeight);

    return canvas;
  }

  /**
   * Takes a canvas with an image drawn on it and returns a new canvas with the cropped image.
   * The original canvas is left unmodified.
   */
  private cropImageIntoSquareFromCenter(image: HTMLCanvasElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    const newSize = Math.min(image.width, image.height);

    canvas.width = newSize;
    canvas.height = newSize;

    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(
      image,
      newSize < image.width ? (image.width - newSize) / 2 : 0,
      newSize < image.height ? (image.height - newSize) / 2 : 0,
      newSize,
      newSize,
      0,
      0,
      newSize,
      newSize);

    return canvas;
  }

  private scaleDownSize(width: number, height: number, maxWidth: number, maxHeight: number): {width: number, height: number} {
    if (width <= maxWidth && height <= maxHeight)
      return { width, height };
    else if (width / maxWidth > height / maxHeight)
      return { width: maxWidth, height: height * maxWidth / width};
    else
      return { width: width * maxHeight / height, height: maxHeight };
  }

}