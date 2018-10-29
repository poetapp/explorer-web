export const getParsedForm = (
  form: HTMLFormElement,
): {
  readonly currentData: object
  readonly elements: { readonly [key: string]: HTMLInputElement },
} => {
  const data = new FormData(form)

  const defaultValue = { elements: {}, currentData: {} }
  return [...data.entries()].reduce((acum: any, currentElement: any, index: number) => {
    const input = form.elements[index] as HTMLInputElement
    const value = input.value
    const name = input.name
    const currentData = { ...acum.currentData, ...{ [name]: value } }
    const elements = { ...acum.elements, ...{ [name]: input } }
    return { currentData, elements }
  }, defaultValue)
}
