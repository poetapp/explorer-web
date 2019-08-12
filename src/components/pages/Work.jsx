import moment from 'moment'
import React, { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { ApiContext } from 'providers/ApiProvider'

import { Main } from 'components/templates/Main'
import { Sidebar } from 'components/shared/Sidebar'
import { Tabs } from 'components/shared/Tabs'

import { IPFS, Bitcoin, QuillS3 } from 'Images'

import classNames from './Work.scss'

setTimeout(() => window.qa(), 1000)

export const WorkById = ({ id }) => {
  const { useApi } = useContext(ApiContext)
  const work = useApi('workGetById', id)

  return (
    <Main>
      {
        !work
          ? <NoWork />
          : <Work work={work} />
      }
    </Main>
  )
}

const NoWork = () => (
  <section className={classNames.noWork}>
    <div>Work not found? It can take some time for a new claim to sync across nodes, so check back soon!</div>
  </section>
)

const Work = ({ work }) => {
  const { claim: { name, author, datePublished, tags, dateCreated, archiveUrl, hash, ...customFields }, issuer } = work

  return (
    <section className={classNames.work}>
      <Sidebar scrollable>
        <Fragment>
          <header className={classNames.sidebarHeader}>
            <Overview
              name={name}
              author={author}
              issuer={issuer}
              datePublished={datePublished}
              tags={tags}
              customFields={customFields}
            />
            <MakeClaimButton
            />
          </header>
          <Tabs>
            <ContentTab label='Content' work={work} />
            <LinkedClaimsTab label='Linked Claims' />
            <TechnicalTab label='Technical' />
          </Tabs>
        </Fragment>
        <Graph />
      </Sidebar>
    </section>
  )
}

const Overview = ({ name, author, issuer, datePublished, tags, customFields }) => {
  const formatDate = date => date && moment(date).format('MMMM Do, YYYY')
  const formatFieldName = fieldName => fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1)

  return (
    <section className={classNames.overview}>
      <h1>{name}</h1>
      <ul>
        <li>Author: {author}</li>
        <li>Claim Made By: <Issuer issuer={issuer}/></li>
        <li>Date Published: {formatDate(datePublished)}</li>
        <li>Tags: {tags}</li>
        { customFields && Object.entries(customFields).map(([key, value]) => <li key={key}>{formatFieldName(key)}: {value}</li>) }
      </ul>
    </section>
  )
}

const Issuer = ({ issuer }) => {
  const { api } = useContext(ApiContext)
  const [account, setAccount] = useState()

  useEffect(() => {
    if (issuer)
      api.accountGet(issuer).then(setAccount)
  }, [issuer])

  return <Link to={`/issuers/${issuer}`}>{account?.name || '...'}</Link>
}

const Links = ({ ipfsLink, bitcoinLink }) => (
  <section className={classNames.links}>
    <a href={ipfsLink} target="_blank">
      <img src={IPFS} />View on IPFS</a>
    <a href={bitcoinLink} target="_blank">
      <img src={Bitcoin} />View on BTC
    </a>
  </section>
)

const Content = ({ archiveUrl }) => {
  return (
    <section className={classNames.content}>
      <h1>Content</h1>
      <main>
        <iframe sandbox="" src={archiveUrl} />
      </main>
    </section>
  )
}

const AuthenticationBadgePreview = ({ workId, date }) => {
  const formatDate = date => moment(date).format('MM-DD-YY [at] h:mm:ss a')
  return (
    <section className={''}>
      <h1>Authentication Badge Preview</h1>
      <p>Embed this html and css to your site so readers can easily verify your timestamp.</p>
      <Badge date={formatDate(date)}/>
      <BadgeUrl workId={workId} date={formatDate(date)} />
    </section>
  )
}

const Badge = ({ date }) => (
  <section className={classNames.badge}>
    <img src={QuillS3}/>
    <h1>Licensed via Po.et</h1>
    <span>{date}</span>
  </section>
)

const BadgeUrl = ({ workId, date }) => {
  const textarea = useRef()
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    textarea.current?.select()
    document.execCommand('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className={classNames.badgeUrl}>
      <textarea value={badgeCode({ workId, date })} readOnly={true} ref={textarea} />
      <button onClick={onCopy}>{!copied ? 'Copy' : 'Copied!'}</button>
    </section>
  )
}

const MakeClaimButton = () => (
  <button className={classNames.makeClaimButton}>Make a claim</button>
)

const ContentTab = ({ work }) => (
  <article>
    <Content archiveUrl={work?.claim?.archiveUrl}/>
    <AuthenticationBadgePreview workId={work?.id} date={work?.issuanceDate}/>
    <Links
      bitcoinLink={bitcoinLink(work?.anchor?.transactionId)}
      ipfsLink={ipfsLink(work?.anchor?.ipfsFileHash)}
    />
  </article>
)

const LinkedClaimsTab = () => (
  <article>
    Linked Claims!
  </article>
)

const TechnicalTab = () => (
  <article>
    Technical!
  </article>
)

const Graph = () => (
  <figure className={classNames.graph}>
    Main graph will go here
  </figure>
)

const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
const baseUrl = 'https://explorer-mainnet.poetnetwork.net'

const badgeCode = ({ workId, date }) => badgeHTML({ workId, date }) + '\n\n' + badgeCSS

const badgeHTML = ({ workId, date }) => (
  `<a href="${baseUrl}/works/${workId}" class="poet-badge" >\n` +
  `  <img src="${QuillS3}" />\n` +
  `  <h1>Licensed via Po.et</h1>\n` +
  `  <span>${date}</span>\n` +
  '</a>'
)

const badgeCSS = `
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');

    .poet-badge {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto;
      grid-column-gap: 8px;
      align-items: center;
      background-color: white;
      padding: 8px 10px;
      border: 1px solid #dfdfdf;
      border-radius: 4px;
      width: 190px;
      margin-bottom: 15px;
      text-decoration: none;
      font-family: "Open Sans";
      color: #333;
    }

    .poet-badge img {
      grid-row: 1 / 3;
      width: 39px;
      margin-right: 8px;
    }

    .poet-badge h1 {
      margin: 0;
      font-size: 12px;
      font-weight: bold;
    }

    .poet-badge span {
      font-size: 10px;
    }
  </style>
`
