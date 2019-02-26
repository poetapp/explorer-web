import { pipe } from 'ramda'
import React, { useState } from 'react'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'

import classNames from './NewClaim.scss'

export const NewClaim = () => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState('')
  const [date, setDate] = useState('')

  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        <form>
          <label for="">Name</label>
          <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} required />
          <label for="">Author Name</label>
          <input type="text" id="author" value={author} onChange={pipe(eventToValue, setAuthor)} required />
          <label for="">Tags</label>
          <input type="text" id="name" value={tags} onChange={pipe(eventToValue, setTags)} required />
          <label for="">Date Created</label>
          <input type="text" id="date" value={date} onChange={pipe(eventToValue, setDate)} required />
          <button type="submit">Submit</button>
        </form>
      </section>
    </Main>
  )
}
