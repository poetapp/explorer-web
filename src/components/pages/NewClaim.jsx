import { pipe } from 'ramda'
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './NewClaim.scss'

export const NewClaim = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [createdWork, setCreatedWork] = useState(null)
  const tokens = useApi('getTokens')

  const onSubmit = claim => {
    const mainnetToken = tokens.apiTokens.filter(token => !token.startsWith('TEST_'))[0]
    if (mainnetToken)
      api.createClaim(claim, mainnetToken).then(setCreatedWork)
  }

  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        { !createdWork
          ? <Form onSubmit={onSubmit} disabled={isBusy}/>
          : <Done workId={createdWork.workId}/> }
      </section>
    </Main>
  )
}

const Form = ({ onSubmit, disabled }) => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [date, setDate] = useState(new Date().toISOString())

  const onSubmitWrapper = event => {
    event.preventDefault();
    const claim = {
      name,
      datePublished: date,
      dateCreated: date,
      author,
      tags,
      content,
    }

    onSubmit(claim)
  }

  return (
    <form onSubmit={onSubmitWrapper}>
      <label for="">Name</label>
      <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} required />
      <label for="">Author Name</label>
      <input type="text" id="author" value={author} onChange={pipe(eventToValue, setAuthor)} required />
      <label htmlFor="content">Content</label>
      <textarea id="content" value={content} onChange={pipe(eventToValue, setContent)} required />
      <label for="">Tags</label>
      <input type="text" id="name" value={tags} onChange={pipe(eventToValue, setTags)} required />
      <label for="">Date Created</label>
      <input type="text" id="date" value={date} onChange={pipe(eventToValue, setDate)} required />
      <button type="submit" disabled={disabled}>{ disabled ? 'Please wait...' : 'Submit'}</button>
    </form>
  )
}

const Done = ({ workId }) => (
  <section>
    <p>Thank you! Your submission has been received!</p>
    <p>It will be available at <Link to={`/works/${workId}`}>{`/works/${workId}`}</Link> as soon as it is confirmed on the blockchain.</p>
  </section>
)