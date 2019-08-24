import moment from 'moment'
import React, { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { ApiContext } from 'providers/ApiProvider'
import { useBrowserRouterContext } from 'providers/BrowserRouterProvider'

import { Main } from 'components/templates/Main'
import { Sidebar } from 'components/shared/Sidebar'
import { Tabs, Tab } from 'components/shared/Tabs'
import { Graph } from 'components/shared/ClaimGraph'

import { IPFS, Bitcoin, QuillS3 } from 'Images'

import classNames from './Work.scss'

export const WorkById = ({ id, uri }) => {
  const { api, poetNodeApi } = useContext(ApiContext)
  const [work, setWork] = useState()
  const [graphEdges, setGraphEdges] = useState([])

  useEffect(() => {
    if (api && id) api.workGetById(id).then(setWork)
    else if (!id) setWork()
  }, [api, id])

  useEffect(() => {
    if (poetNodeApi) {
      poetNodeApi.graph.get(encodeURIComponent(id ? `poet:claims/${id}` : uri)).then(graphEdges => {
        if (graphEdges?.length) {
          setGraphEdges(graphEdges)
        } else if (work) {
          setGraphEdges([{ origin: `poet:claims/${work?.id}`, target: work?.claim?.archiveUrl }])
        }
      })
    }
  }, [poetNodeApi, work])

  return (
    <Main>
      {
        !work && !uri && !graphEdges
          ? <NoWork />
          : <Work work={work} uri={uri} graphEdges={graphEdges} />
      }
    </Main>
  )
}

const NoWork = () => (
  <section className={classNames.noWork}>
    <div>Work not found? It can take some time for a new claim to sync across nodes, so check back soon!</div>
  </section>
)

const Work = ({ work, uri, graphEdges }) => {
  const { history } = useBrowserRouterContext()
  const claimUri = work && `poet:claims/${work.id}`

  const onNodeSelected = (node) => {
    if (node.startsWith('poet:claims/'))
      history.push(`/works/${node.split('/')[1]}`)
    else
      history.push(`/archives/${encodeURIComponent(node)}`)
  }

  const workIsNotAboutClaim = !work?.claim?.about?.[0].startsWith('poet:claims/')

  return (
    <section className={classNames.work}>
      <Sidebar invertScroll>
        <Fragment>
          <header className={classNames.sidebarHeader}>
            { work && <Overview work={work} /> }
            <MakeClaimButton claimId={work?.id} />
          </header>
          <Tabs>
            { (uri || workIsNotAboutClaim) && (
              <Tab label='Content'>
                <ContentTab work={work} uri={uri} />
              </Tab>
            ) }
            <Tab label='Linked Claims'>
              <LinkedClaimsTab />
            </Tab>
            {
              !uri && <Tab label='Technical'>
                <TechnicalTab work={work} />
              </Tab>
            }
          </Tabs>
        </Fragment>
        <UriGraph edges={graphEdges} selectedNode={claimUri || uri} onNodeSelected={onNodeSelected}>
          <h1>{work?.claim?.name}</h1>
          <div>{work?.claim?.author}</div>
        </UriGraph>
      </Sidebar>
    </section>
  )
}

const Overview = ({ work }) => {
  const formatDate = date => date && moment(date).format('MMMM Do, YYYY')
  const formatFieldName = fieldName => (
    fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')
  )

  const info = {
    author: work?.claim.author,
    timestamp: formatDate(work?.claim.datePublished),
    // TODO: Follow up whether these should be included
    claimMadeBy: <Issuer issuer={work?.issuer} />,
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

const MakeClaimButton = ({ claimId }) => {
  const href = `/new-claim?about=${encodeURIComponent('poet:claims/' + claimId)}`

  return (
    <Link to={href}>
      <button className={classNames.makeClaimButton}>
        Make a claim
      </button>
    </Link>
  )
}

const ContentTab = ({ work, uri }) => (
  <>
    <Content archiveUrl={work?.claim?.archiveUrl || work?.claim?.about?.[0] || uri}/>
    { !uri && <AuthenticationBadgePreview workId={work?.id} date={work?.issuanceDate}/> }
    { !uri && <Links
      bitcoinLink={bitcoinLink(work?.anchor?.transactionId)}
      ipfsLink={ipfsLink(work?.anchor?.ipfsFileHash)}
    />}
  </>
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
    <section className={classNames.linkedClaims}>
      <h1>This claim references</h1>
      <LinkedClaimsList linkedClaims={originOfClaims} />
      <h1>Referenced by</h1>
      <LinkedClaimsList linkedClaims={targetOfClaims} />
    </section>
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
  <section>
    <Metadata work={work} />
  </section>
)

const Metadata = ({ work }) => (
  <section className={classNames.metadata}>
    <h1>Metadata</h1>
    <pre>
      { JSON.stringify(work, null, 2)}
    </pre>
  </section>
)

const UriGraph = ({ children, edges, selectedNode, onNodeSelected }) => (
  <section className={classNames.graph}>
    <figcaption>
      { children }
    </figcaption>
    <Graph edges={edges} selectedValue={selectedNode} onNodeSelected={onNodeSelected} />
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
