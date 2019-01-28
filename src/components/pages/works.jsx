import React from 'react'
import { Link } from 'react-router-dom'

import { Main } from 'components/templates/Main'

const workIds = [
  'fbc3a2049526d2c043144979adabfee66eac1580d351d95022bbc1031f40a163',
  'a5e4ea55420c8695975758f59f520c360631afb952a842d25932f7deedcd547a',
  '3775b047e6f173e73960f69c2351e2b9a042ef67eeed346f17728d1f92af9ffb',
  'c6a63d3ebadd60c69a0f477bf7b675b5275f356b7e2e5ac8018e57935f79bd5f',
  '17ab649b08ac87e805d7ecc4ba6649bb46efcbc13f8463d4c0385ccdf58ab14e',
]

const links = workIds.map(id => `/works/${id}`)

const LinkListItem = ({ link }) => <li><Link to={link}>{link}</Link></li>

const Links = () => links.map(link => <LinkListItem link={link} key={link} />)

export const Works = () => (
  <Main>
    <h1>You can navigate works:</h1>
    <ul>
      <Links />
    </ul>
  </Main>
)
