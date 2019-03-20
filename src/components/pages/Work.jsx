import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useWorkById } from 'hooks/useWork'
import { useFetch } from 'hooks/useFetch'
import { ApiContext } from 'providers/ApiProvider'

import { Main } from 'components/templates/Main'

import { IPFS, Bitcoin, Quill } from 'Images'

import classNames from './Work.scss'

export const WorkById = ({ id }) => {
  const work = useWorkById(id)
  const content = useFetch(work && work.claim && work.claim.archiveUrl)

  return (
    <Main>
      <Work work={work} content={content && content.substring(0, 3000)} />
    </Main>
  )
}

const Work = ({ work, content }) => (
  <section className={classNames.work}>
    <header>
      <Overview
        name={work?.claim.name}
        author={work?.claim.author}
        issuer={work?.issuer}
        datePublished={work?.claim.datePublished}
        tags={work?.claim.tags}
      />
      <Links
        bitcoinLink={bitcoinLink(work?.anchor?.transactionId)}
        ipfsLink={ipfsLink(work?.anchor?.ipfsDirectoryHash)}
      />
    </header>
    <main>
      <Content content={content}/>
      <AuthenticationBadgePreview/>
    </main>
  </section>
)

const Overview = ({ name, author, issuer, datePublished, tags }) => {
  const formatDate = date => date && moment(date).format('MMMM Do, YYYY')
  return (
    <section className={classNames.overview}>
      <h1>{name}</h1>
      <ul>
        <li>Author: {author}</li>
        <li>Claim made by: <Issuer issuer={issuer}/></li>
        <li>Date Published: {formatDate(datePublished)}</li>
        <li>Tags: {tags}</li>
      </ul>
    </section>
  )
}

const Issuer = ({ issuer }) => {
  const [api] = useContext(ApiContext)
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

const Content = ({ content }) => (
  <section className={classNames.content}>
    <h1>Content</h1>
    <main>{content}</main>
  </section>
)

const AuthenticationBadgePreview = () => {
  const formatDate = date => moment(date).format('MM-DD-YY [at] h:mm:ss a')
  return (
    <section className={''}>
      <h1>Authentication Badge Preview</h1>
      <p>Embed this iframe to your site so readers can easily verify your timestamp.</p>
      <Badge date={formatDate(new Date())}/>
      <BadgeUrl />
    </section>
  )
}

const Badge = ({ date }) => (
  <section className={classNames.badge}>
    <img src={Quill}/>
    <h1>Licensed via Po.et</h1>
    <span>{date}</span>
  </section>
)

const BadgeUrl = () => (
  <section className={classNames.badgeUrl}>
    <span>
      {
        '<iframe src="">' +
        '<div class="poet-badge" style="script/poetBadge.css" >' +
        '<img src="embed" />' +
        '</div>' +
        '</iframe>'
      }
    </span>
    <button>Copy URL</button>
  </section>
)

const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
