declare module '@paralleldrive/react-feature-toggles' {
  function Feature(inactiveComponent: any, activeComponent: any, name: string, children?: React.ReactNode): JSX.Element
  export { Feature }

  function FeatureToggles({
    features,
  }?: {
      readonly features?: ReadonlyArray<string>
      readonly children?: React.ReactNode
    }): JSX.Element
  export { FeatureToggles }
  }