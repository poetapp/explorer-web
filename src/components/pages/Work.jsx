import moment from 'moment'
import React, { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { ApiContext } from 'providers/ApiProvider'

import { Main } from 'components/templates/Main'
import { Sidebar } from 'components/shared/Sidebar'
import { Tabs } from 'components/shared/Tabs'
import { ClaimGraph } from 'components/shared/ClaimGraph'

import { IPFS, Bitcoin, QuillS3 } from 'Images'

import classNames from './Work.scss'

export const WorkById = ({ id }) => {
  const { useApiWithDeps, poetNodeApi } = useContext(ApiContext)
  const [workId, setWorkId] = useState(id)
  const [claims, setClaims] = useState([])
  const work = useApiWithDeps([workId], 'workGetById', workId)

  useEffect(() => {
    if (poetNodeApi) {
      poetNodeApi.graph.get(encodeURIComponent(`poet:claims/${id}`)).then((claims) => {
        if (claims?.length) {
          setClaims(claims)
        } else if (work) {
          setClaims([{ origin: `poet:claims/${work?.id}`, target: work?.claim?.archiveUrl }])
        }
      })
    }
  }, [poetNodeApi, work])

  return (
    <Main>
      {
        !work
          ? <NoWork />
          : <Work work={work} claims={claims} setWorkId={setWorkId} />
      }
    </Main>
  )
}

const NoWork = () => (
  <section className={classNames.noWork}>
    <div>Work not found? It can take some time for a new claim to sync across nodes, so check back soon!</div>
  </section>
)

const Work = ({ work, claims, setWorkId }) => {
  const { claim: { name, author, datePublished, tags, dateCreated, archiveUrl, hash, ...customFields }, issuer } = work

  return (
    <section className={classNames.work}>
      <Sidebar invertScroll>
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
          <Tabs initialTab={2}>
            <ContentTab label='Content' work={work} />
            <LinkedClaimsTab label='Linked Claims' />
            <TechnicalTab label='Technical' work={work} />
          </Tabs>
        </Fragment>
        <Graph claims={claims} currentClaim={work} setWorkId={setWorkId} />
      </Sidebar>
    </section>
  )
}

const Overview = ({ name, author, issuer, datePublished, tags, customFields }) => {
  const formatDate = date => date && moment(date).format('MMMM Do, YYYY')
  const formatFieldName = fieldName => (
    fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')
  )

  const info = {
    author,
    timestamp: formatDate(datePublished),
    // TODO: Follow up whether these should be included
    // claimMadeBy: <Issuer issuer={issuer} />,
    // tags: tags,
    // ...customFields,
  }

  return (
    <section className={classNames.overview}>
      <h1>{name}</h1>

      <table>
        <tbody>
          {Object.entries(info).map(([fieldName, fieldValue], key) => (
            <tr key={key}>
              <th>{formatFieldName(fieldName)}</th>
              <td>{fieldValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <h1>Links</h1>
    <main>
      <a href={ipfsLink} target="_blank">
        <img src={IPFS} />View on IPFS</a>
      <a href={bitcoinLink} target="_blank">
        <img src={Bitcoin} />View on BTC
      </a>
    </main>
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
    <section className={classNames.badgePreview}>
      <h1>Badge Info</h1>
      <BadgeUrl workId={workId} date={formatDate(date)} />
      <Badge date={formatDate(date)}/>
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

const LinkedClaimsTab = ({ claims }) => {
  const originOfClaims = [
    {name: 'Baz', date: 'July 19th 2019'},
    {name: 'Qux', date: 'July 19th 2019'},
  ]

  const targetOfClaims = [
    {name: 'Foo', date: 'July 19th 2019'},
    {name: 'Bar', date: 'July 19th 2019'},
  ]

  return (
    <article className={classNames.linkedClaims}>
      <h1>This claim references</h1>
      <LinkedClaimsList linkedClaims={originOfClaims} />
      <h1>Referenced by</h1>
      <LinkedClaimsList linkedClaims={targetOfClaims} />
    </article>
  )
}

const LinkedClaimsList = ({ linkedClaims }) => (
  <ul>
    {linkedClaims.map(({ name, date }, key) => (
      <li key={key}>
        <a href='#'>{name}</a>
        <time>{date}</time>
      </li>
    ))}
  </ul>
)

const TechnicalTab = ({ work }) => (
  <article>
    <Metadata work={work} />
  </article>
)

const Metadata = ({ work }) => (
  <section className={classNames.metadata}>
    <h1>Metadata</h1>
    <pre>
      {JSON.stringify(work, null, 2)}
    </pre>
  </section>
)

const Graph = ({ claims, currentClaim, setWorkId }) => (
  <section className={classNames.graph}>
    <ClaimGraph claims={claims} currentClaim={currentClaim} setWorkId={setWorkId} />
  </section>
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
