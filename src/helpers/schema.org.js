export const ContentType = {
  Text: 0,
  Audio: 1,
  Image: 2,
  Video: 3,
}

export const ContentTypeSchemas = {
  [ContentType.Text]: 'https://schema.org/CreativeWork.jsonld',
  [ContentType.Audio]: 'https://schema.org/AudioObject.jsonld',
  [ContentType.Image]: 'https://schema.org/ImageObject.jsonld',
  [ContentType.Video]: 'https://schema.org/VideoObject.jsonld',
}

export const labelToString = rawLabel =>
  typeof rawLabel === 'string'
    ? rawLabel
    : typeof rawLabel === 'object'
    ? rawLabel['@value']
    : rawLabel.toString()
