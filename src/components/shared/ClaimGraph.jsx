import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'

import classNames from './ClaimGraph.scss'
import { ClaimWhite } from 'Images'

const grey = '#969696'

const claims = [
  { origin: 'poet:claims/1', target: 'https://example.com' },
  { origin: 'poet:claims/2', target: 'https://example.com' },
  { origin: 'poet:claims/3', target: 'poet:claims/1' },
  { origin: 'poet:claims/3', target: 'poet:claims/6' },
  { origin: 'poet:claims/4', target: 'poet:claims/1' },
  { origin: 'poet:claims/5', target: 'poet:claims/3' },
]

const claimsToElements = claims => {
  const targetNodes = claims.reduce((memo, claim) => {
    const claimWithTargetAsOrigin = claims.find(({ origin }) => (
      origin === claim.target
    ))

    if (!claimWithTargetAsOrigin) {
      memo.push({ data: { id: claim.target } })
    }

    return memo
  }, [])

  const sourceNodes = claims.map(claim => ({ data: {
    id: claim.origin,
  }}))

  const edges = claims.map(claim => ({ data: {
    id: [claim.origin, claim.target].join('<>'),
    source: claim.origin,
    target: claim.target,
  }}))

  return [ ...targetNodes, ...sourceNodes, ...edges ].map(ele => {
    ele.grabbable = false

    if (ele?.data?.id === 'https://example.com') {
      ele.data.background = ClaimWhite
    }

    return ele
  })
}

const layout = {
  name: 'breadthfirst',
  directed: false,
  roots: ['https://example.com'],
  padding: 50,
}

const style = [{
  selector: 'node[^background][!selected]',
  style: {
    'background-color': 'white',
    'border-width': 2,
    'border-color': grey,
  },
}, {
  selector: 'node[background][!selected]',
  style: {
    'background-image': 'data(background)',
    'width': 40,
    'height': 40,
    'background-fit': 'contain',
    'background-color': '#F5F5F5',
    'shape': 'rectangle',
  },
}, {
  selector: 'node[^background][?selected]',
  style: {
    'background-color': '#36B074',
    'border-width': 2,
    'border-color': grey,
  }
}, {
  selector: 'node[background][?selected]',
  style: {
    'background-image': 'data(background)',
    'width': 60,
    'height': 60,
    'background-fit': 'contain',
    'background-color': '#F5F5F5',
    'shape': 'rectangle',
  },
}, {
  selector: 'edge',
  style: {
    'curve-style': 'straight',
    'width': 2,
    'line-color': grey,
    'target-arrow-color': grey,
    'target-arrow-shape': 'triangle',
    'arrow-scale': '1.5',
    'source-distance-from-node': 12,
    'target-distance-from-node': 12,
  },
}]

export const ClaimGraph = () => (
  <div className={classNames.claimGraph}>
    <Figcaption />
    <Figure />
  </div>
)

const Figcaption = () => (
  <figcaption className={classNames.figcaption}>
    Caption for the figure goes here
  </figcaption>
)

const Figure = () => {
  const figure = useRef(null)
  const [dim, setDim] = useState([window.innerHeight, window.innerWidth])
  const [selectedNode, selectNode] = useState(null)

  useEffect(() => {
    const cy = cytoscape({
      container: figure.current,
      elements: claimsToElements(claims),
      hideLabelsOnViewport: true,
      layout,
      style,
      userPanningEnabled: false,
      userZoomingEnabled: false,
    })

    const rootNode = cy.nodes().getElementById('https://example.com')

    cy.on('click', ({ target }) => {
      selectNode(target)
      cy.nodes().forEach(ele => ele.data('selected', false))
      target.data('selected', true)
      console.log(cy.nodes().first().data())
    })

    if (!selectedNode) rootNode.emit('click')

    // cy.resize() does not play nicely with the flexbox layout
    // We take a performance hit, but the resizing is much more reliable
    cy.on('resize', () => {
      cy.destroy()
      setDim([window.innerHeight, window.innerWidth])
    })
  }, [dim])

  return (
    <figure
      className={classNames.figure}
      ref={figure}
   />
  )
}
