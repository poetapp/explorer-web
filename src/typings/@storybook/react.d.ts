declare module '@storybook/react' {
    const withInfo = (storyFn: any) => any;
    const addWithJSX = (text: string, info: withInfo ) => any;
    export const storiesOf = (title: string, module: object) => ({ addWithJSX: addWithJSX });
}
