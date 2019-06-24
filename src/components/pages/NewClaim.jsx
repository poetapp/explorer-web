import { pipe } from 'ramda'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'
import { parseJwt } from 'helpers/jwt'
import { ContentType, ContentTypeSchemas, labelToString } from 'helpers/schema.org'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './NewClaim.scss'

export const NewClaim = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [createdWork, setCreatedWork] = useState(null)
  const tokens = useApi('getTokens')
  const [account] = useContext(SessionContext)
  const token = selectToken(tokens, account.email)

  const claimWithFile = async (claim, file) => {
    const response = await api.postArchive(file, token)

    const { archiveUrl, hash } = response?.[0] || {}

    if (!archiveUrl || !hash)
      throw new Error('Unexpected response from POST /archives.')

    return {
      ...claim,
      archiveUrl,
      hash,
    }
  }

  const onSubmit = async (claim, file) => {
    const claimToUse = !file? claim : await claimWithFile(claim, file)
    api.createClaim(claimToUse, token).then(setCreatedWork)
  }

  useEffect(() => {
    console.log('Using token for claim creation', token, token && parseJwt(token))
  }, [token])

  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        { !token && tokens?.apiTokens && <h3>You need a mainnet <Link to="/tokens">API Token</Link> in order to create works.</h3> }
        { !createdWork
          ? <FormAndBanner onSubmit={onSubmit} isBusy={isBusy} disabled={!token} poeAddressVerified={account.poeAddressVerified} />
          : <Done workId={createdWork.workId}/> }
      </section>
    </Main>
  )
}

const FormAndBanner = ({ onSubmit, isBusy, disabled, poeAddressVerified }) => (
  <section className={classNames.formAndBanner}>
    <Form onSubmit={onSubmit} isBusy={isBusy} disabled={disabled} archiveUploadEnabled={poeAddressVerified} />
    <Banner render={!poeAddressVerified}/>
  </section>
)

const Form = ({ onSubmit, disabled, isBusy, archiveUploadEnabled }) => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const [selectedFile, setSelectedFile] = useState()
  const [contentType, setContentType] = useState(ContentType.Text)
  const [contentTypeSchema, setContentTypeSchema] = useState()
  const [contentTypeProperties, setContentTypeProperties] = useState()
  const [customFields, setCustomFields] = useState([])
  const contentInput = useRef()

  const submitButtonText = isBusy ? 'Please wait...' : 'Submit'

  const onSubmitWrapper = event => {
    event.preventDefault()

    const context = customFields.reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.label]: currentValue.id,
    }), {})

    const fields = customFields.reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.label]: currentValue.value,
    }), {})

    const claim = {
      '@context': context,
      name,
      datePublished: date,
      dateCreated: date,
      author,
      tags,
      content,
      ...fields,
    }

    onSubmit(claim, selectedFile)
  }

  useEffect(() => {
    contentInput.current.setCustomValidity(!content && !selectedFile ? 'Either the content or a file must be provided.' : '')
  }, [selectedFile, content])

  useEffect(() => {
    fetch(ContentTypeSchemas[contentType])
      .then(_ => _.json())
      .then(setContentTypeSchema)
  }, [contentType])

  useEffect(() => {
    setContentTypeProperties(
      contentTypeSchema?.['@graph']
        .filter(_ => _['@type'] === 'rdf:Property')
        .map(({ '@id': id, 'rdfs:label': rawLabel }) => ({ id, rawLabel }))
        .map(({ id, rawLabel }) => ({
          id,
          label: labelToString(rawLabel),
        }))
    )
  }, [contentTypeSchema])

  return (
    <form onSubmit={onSubmitWrapper} disabled={disabled || isBusy}>
      <label htmlFor="name">Title</label>
      <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} required />
      <label htmlFor="contentType">Content Type</label>
      <ContentTypeSelect value={contentType} onChange={setContentType} />
      <label htmlFor="author">Author Name</label>
      <input type="text" id="author" value={author} onChange={pipe(eventToValue, setAuthor)} required />
      <label htmlFor="content">Content</label>
      <textarea id="content" value={content} onChange={pipe(eventToValue, setContent)} ref={contentInput} disabled={!!selectedFile} />
      <FileInput render={archiveUploadEnabled} onFileSelected={setSelectedFile} />
      <label htmlFor="tags">Tags</label>
      <input type="text" id="tags" value={tags} onChange={pipe(eventToValue, setTags)} />
      <label htmlFor="date">Date Created</label>
      <input type="text" id="date" value={date} onChange={pipe(eventToValue, setDate)} required />
      <CustomFields
        contentTypeProperties={contentTypeProperties}
        fields={customFields}
        onChange={setCustomFields}
      />
      <button type="submit" disabled={disabled || isBusy}>{submitButtonText}</button>
    </form>
  )
}

const ContentTypeSelect = ({ value, onChange }) => (
  <select id="contentType" value={value} onChange={pipe(eventToValue, onChange)} required >
    <option value={ContentType.Text}>Text</option>
    <option value={ContentType.Audio}>Audio</option>
    <option value={ContentType.Image}>Image</option>
    <option value={ContentType.Video}>Video</option>
  </select>
)

const CustomFields = ({ contentTypeProperties, fields, onChange }) => {
  const setField = (index, updates) => onChange([
    ...fields.slice(0, index),
    {
      ...fields[index],
      ...updates,
    },
    ...fields.slice(index + 1),
  ])

  const onAdd = (event) => {
    event.preventDefault()
    onChange([...fields, { ...contentTypeProperties[0], value: '' }])
  }

  const onPropertyChange = (index) => (id) => setField(index, { id, label: contentTypeProperties.find(_ => _.id === id).label })

  const onValueChange = (index) => (value) => setField(index, { value })

  return (
    <section className={classNames.customFields}>
      { fields.map((field, index) =>
        <CustomFieldType
          key={index}
          contentTypeProperties={contentTypeProperties}
          propertyId={field.id}
          onPropertyChange={pipe(eventToValue, onPropertyChange(index))}
          value={field.value}
          onValueChange={pipe(eventToValue, onValueChange(index))}
        />)
      }
      <button onClick={onAdd}>Add Another Field</button>
    </section>
  )
}

const CustomFieldType = ({ contentTypeProperties, propertyId, onPropertyChange, value, onValueChange }) => (
  <section className={classNames.customFieldType}>
    <select value={propertyId} onChange={onPropertyChange}>
      { contentTypeProperties?.map(({ id, label }) => <option key={id} value={id}>{label}</option> ) }
    </select>
    <input type="text" value={value} onChange={onValueChange} />
  </section>
)

const FileInput = ({ render, onFileSelected }) => {
  const fileInput = useRef()
  const [selectedFile, setSelectedFile] = useState()

  const onFileInputChange = (event) => {
    setSelectedFile(event.currentTarget?.files?.[0])
    onFileSelected(event.currentTarget?.files?.[0])
  }

  const onButtonClick = (event) => {
    event.preventDefault()
    fileInput.current?.click()
  }

  return render ? (
    <section className={classNames.fileInput}>
      <input type="file" ref={fileInput} onChange={onFileInputChange} />
      <button onClick={onButtonClick}>Upload File</button>
      <span>{selectedFile?.name}</span>
    </section>
  ) : null
}

const Banner = ({ render }) => render ? (
  <section className={classNames.banner}>
    <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5cd6d59a3d256b4702ed70b9_icon.svg" />
    <h1>Want to unlock more amazing features?</h1>
    <h2>By proving you have POE in a wallet, you can begin uploading actual media files.</h2>
    <Link to='/settings'>Connect Your Wallet</Link>
  </section>
) : null

const Done = ({ workId }) => (
  <section>
    <p>Thank you! Your submission has been received!</p>
    <p>It will be available at <Link to={`/works/${workId}`}>{`/works/${workId}`}</Link> as soon as it is confirmed on the blockchain.</p>
  </section>
)

const selectToken = (tokens, email) => tokens?.apiTokens?.filter(token => !token.startsWith('TEST_')).map(token => ({
  token,
  parsed: parseJwt(token),
})).filter(({ token, parsed }) => parsed.email === email || !parsed.email)[0]?.token
