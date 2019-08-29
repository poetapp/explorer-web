import moment from 'moment'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { uriToExplorerLink } from 'helpers/links'

import { ApiContext } from 'providers/ApiProvider'
import { useBrowserRouterContext } from 'providers/BrowserRouterProvider'

import { Graph } from 'components/shared/Graph'
import { Main } from 'components/templates/Main'
import { Tabs, Tab } from 'components/shared/Tabs'

import { IPFS, Bitcoin, QuillS3 } from 'Images'

import classNames from './Work.scss'

const urlIsIpfs = url => url.startsWith('https://ipfs.io/ipfs/')

const ipfsUrlToHash = url => url.split('/').reverse()[0]

export const WorkById = ({ id, uri }) => {
  const { api, poetNodeApi } = useContext(ApiContext)
  const [work, setWork] = useState()
  const [graphEdges, setGraphEdges] = useState([])
  const [graphEdgesWithArchiveUrl, setGraphEdgesWithArchiveUrl] = useState([])

  useEffect(() => {
    if (api && id) api.workGetById(id).then(setWork)
    else if (!id) setWork()
  }, [api, id])

  useEffect(() => {
    if (poetNodeApi) {
      poetNodeApi.graph.get(encodeURIComponent(id ? `poet:claims/${id}` : uri))
        .then(graphEdges => graphEdges.filter(({ origin, target }) => origin && target))
        .then(setGraphEdges)
    }
  }, [poetNodeApi])

  useEffect(() => {
    if (work && graphEdges) {
      setGraphEdgesWithArchiveUrl([
        ...graphEdges,
        ...(work?.claim?.archiveUrl ? [{ origin: `poet:claims/${work?.id}`, target: work?.claim?.archiveUrl }] : []),
      ])
    }
  }, [work, graphEdges])

  return (
    <Main scrollDisabled={true}>
      {
        !work && !uri
          ? <NoWork />
          : <Work work={work} uri={uri} graphEdges={graphEdgesWithArchiveUrl} />
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

  return (
    <section className={classNames.work}>
      <aside className={classNames.sidebar}>
        <header className={classNames.sidebarHeader}>
          <Overview work={work} uri={uri} />
          <MakeClaimButton uri={uri || claimUri} />
        </header>
        <Tabs>
          { uri && (
            <Tab label='Content'>
              <ContentTab uri={uri} />
            </Tab>
          ) }
          <Tab label='Linked Claims'>
            <LinkedClaimsTab uri={claimUri || uri} graphEdges={graphEdges}  />
          </Tab>
          { !uri && (
            <Tab label='Technical'>
              <TechnicalTab work={work} />
            </Tab>
          ) }
        </Tabs>
      </aside>
      <UriGraph edges={graphEdges} selectedNode={claimUri || uri} onNodeSelected={onNodeSelected}>
        <GraphAside uri={uri} work={work} />
      </UriGraph>
    </section>
  )
}

const GraphAside = ({ uri, work }) => (
  uri
    ? <GraphAsideUri uri={uri} />
    : <GraphAsideWork work={work} />
)

const GraphAsideUri = ({ uri }) => {
  const isIpfs = urlIsIpfs(uri)
  const title = isIpfs
      ? ipfsUrlToHash(uri)
      : uri

  return (
    <>
      <h1>{isIpfs ? 'HASH:' : uri}</h1>
      { isIpfs && <div>{title}</div> }
      { isIpfs && <div><a href={uri} target="_blank">View Content</a></div> }
    </>
  )
}

const GraphAsideWork = ({ work }) => (
  <>
    <h1>{work?.claim?.name}</h1>
    <div>{work?.claim?.author}</div>
  </>
)

const Overview = ({ work, uri }) => (
  work
    ? <WorkOverview work={work} />
    : <UriOverview uri={uri} />
)

const WorkOverview = ({ work }) => {
  const formatDate = date => date && moment(date).format('MMMM Do, YYYY')
  const formatFieldName = fieldName => (
    fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')
  )

  const {
    author,
    datePublished,
    issuer,
    tags,
    name,
    about,
    hash,
    dateCreated,
    archiveUrl,
    ...customFields
  } = work?.claim

  const info = {
    author,
    timestamp: formatDate(datePublished),
    claimMadeBy: <Issuer issuer={issuer} />,
    tags,
    ...customFields,
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

const UriOverview = ({ uri = '' }) => (
  <section className={classNames.overview}>
    <h1>{ urlIsIpfs(uri) ? ipfsUrlToHash(uri) : uri }</h1>
    <a href={uri} target="_blank">View Content</a>
  </section>
)

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

const ContentTab = ({ uri }) => (
  <section className={classNames.content}>
    <h1>Content Preview</h1>
    <main>
      <iframe sandbox="" src={uri} />
    </main>
  </section>
)

const MakeClaimButton = ({ uri }) => {
  const href = `/new-claim?about=${encodeURIComponent(uri)}`

  return (
    <Link to={href}>
      <button className={classNames.makeClaimButton}>
        Make a claim
      </button>
    </Link>
  )
}

const LinkedClaimsTab = ({ uri, graphEdges }) => {
  const originOfClaims = graphEdges.filter(({ origin }) => origin === uri).map(({ target }) => ({
    uri: target,
    name: target,
    date: 'July 19th 2019',
  }))
  const targetOfClaims = graphEdges.filter(({ target }) => target === uri).map(({ origin }) => ({
    uri: origin,
    name: origin,
    date: 'July 19th 2019',
  }))

  return (
    <section className={classNames.linkedClaims}>
      { originOfClaims?.length > 0 && (
        <>
          <h1>This claim references</h1>
          <LinkedClaimsList linkedClaims={originOfClaims} />
        </>
      )}
      { targetOfClaims?.length > 0 && (
        <>
          <h1>Referenced by</h1>
          <LinkedClaimsList linkedClaims={targetOfClaims} />
        </>
      )}
    </section>
  )
}

const LinkedClaimsList = ({ linkedClaims }) => (
  <ul>
    {linkedClaims.map(({ name, date, uri }, key) => (
      <li key={key}>
        <Link to={uriToExplorerLink(uri)}>{name}</Link>
        <time>{date}</time>
      </li>
    ))}
  </ul>
)

const TechnicalTab = ({ work }) => (
  <section>
    <Links
      bitcoinLink={bitcoinLink(work?.anchor?.transactionId)}
      ipfsLink={ipfsLink(work?.anchor?.ipfsFileHash)}
    />
    <Metadata work={work} />
  </section>
)

const Metadata = ({ work }) => (
  <section className={classNames.metadata}>
    <h1>Metadata Preview</h1>
    <pre>
      { JSON.stringify(work, null, 2)}
    </pre>
  </section>
)

const UriGraph = ({ children, edges, selectedNode, onNodeSelected }) => (
  <section className={classNames.graph}>
    <header>
      <figcaption>
        { children }
      </figcaption>
    </header>
    <Graph edges={edges} selectedValue={selectedNode} onNodeSelected={onNodeSelected} />
  </section>
)

const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
