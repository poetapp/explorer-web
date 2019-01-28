import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import { workById, workHeader, claimMadeBy, links, contentClass, badge, badgeUrl } from './work.scss'

const avatarUrl = 'https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c0e925ca85aebe5945307ac_Screen%20Shot%202018-12-10%20at%2010.20.23%20AM.png'

const Issuer = ({ issuer, avatarUrl, name }) => (
  <section className={claimMadeBy}>
    <h1>Claim Made By:</h1>
    <Link to={`/issuers/${issuer}`}>
      <img src={avatarUrl} />
      <span>{name}</span>
    </Link>
  </section>
)

const Overview = ({ name, author, datePublished, tags }) => (
  <section className={workHeader}>
    <h1>{name}</h1>
    <ul>
      <li>Author: {author}</li>
      <li>Date Published: {datePublished}</li>
      <li>Tags: {tags}</li>
    </ul>
  </section>
)

const Links = ({ ipfsLink, bitcoinLink }) => (
  <section className={links}>
    <a href={ipfsLink} target="_blank">
      <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c142ac87b45f573f361809f_ipfs.png" />View on IPFS</a>
    <a href={bitcoinLink} target="_blank">
      <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" />View on BTC
    </a>
  </section>
)

const Content = ({ content }) => (
  <section className={contentClass}>
    <h1>Content</h1>
    <main>{content}</main>
  </section>
)

const AuthenticationBadgePreview = ({ date }) => (
  <section className={''}>
    <h1>Authentication Badge Preview</h1>
    <p>Embed this iframe to your site so readers can easily verify your timestamp.</p>
    <Badge date={date}/>
    <BadgeUrl />
  </section>
)

const Badge = ({ date }) => (
  <section className={badge}>
    <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c0fd7884a45850c86a7ca43_poet-quill.svg"/>
    <h1>Licensed via Po.et</h1>
    <span>{date}</span>
  </section>
)

const BadgeUrl = () => (
  <section className={badgeUrl}>
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

const formattedDate = date => moment(date).format('MMMM Do, YYYY')
const formattedDate2 = date => moment(date).format('MM-DD-YY [at] h:mm:ss a')

export const Work = ({ work, content }) => (
  <section className={workById}>
    <header>
      <Overview
        name={work && work.claim && work.claim.name}
        author={work && work.claim && work.claim.author}
        datePublished={work && work.claim && work.claim.datePublished && formattedDate(work.claim.datePublished)}
        tags={work && work.tags && work.claim.tags}
      />
      <Issuer issuer={work && work.issuer} avatarUrl={avatarUrl} name={'Oscar Wilde'} />
      <Links
        bitcoinLink={bitcoinLink(work && work.anchor && work.anchor.transactionId)}
        ipfsLink={ipfsLink(work && work.anchor && work.anchor.ipfsDirectoryHash)}
      />
    </header>
    <main>
      <Content content={content}/>
      <AuthenticationBadgePreview date={formattedDate2(new Date())}/>
    </main>
  </section>
)