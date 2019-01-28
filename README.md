# Explorer Web

[![Join the chat at https://gitter.im/poetapp/Lobby](https://badges.gitter.im/poetapp/Lobby.svg)](https://gitter.im/poetapp/Lobby)

Po.et's web application to view claims on the Po.et Network.

## Development Process
All new features should be merged into master behind a feature toggle with it turned off by default. 

## File Structure

### Components

These are ReactJS components and Sass styles. The components' architecture is inspired by Brad Frost's [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

Most components have a single associated `.scss` file with the same name. There are also a few global styles living in `components/styles`. Styles are bundled and loaded by Webpack's `style-loader`, `css-loader`, `autoprefixer`, `postcss-loader`, and `sass-loader`.

Components are divided in atoms, molecules, organisms, pages and modals. Rule of thumb is: the smaller shouldn't use the larger. That means atoms should have no dependencies on other components, molecules can only depend on atoms and so on.

The root component is [components/Root.jsx](./src/components/Root.jsx) and ReactDOM.render is called in [index.jsx](./src/index.jsx).

## Images

TBD

All images used by the application. They are exposed as `static readonly` elements of a class in [images/Images.tsx](./src/images/Images.tsx), using the File Loader Webpack plugin to load and bundle them.

## Contributing

See [Contributing](https://github.com/poetapp/documentation/blob/master/CONTRIBUTING.md).

## Security

See [Security](https://github.com/poetapp/documentation/blob/master/SECURITY.md).
