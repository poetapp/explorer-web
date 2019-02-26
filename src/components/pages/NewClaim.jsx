import React from 'react'

import { Main } from 'components/templates/Main'

import classNames from './NewClaim.scss'

export const NewClaim = () => {
  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        <form>
          <label for="">Name</label>
          <input type="text" id="name" />
          <label for="">Author Name</label>
          <input type="text" id="author" />
          <label for="">Tags</label>
          <input type="text" id="name" />
          <label for="">Date Created</label>
          <input type="text" id="date" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </Main>
  )
}
