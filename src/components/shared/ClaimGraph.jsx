import React, { useEffect, useRef, useState } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import { flatten, uniq } from 'ramda'

import classNames from './ClaimGraph.scss'
import { ClaimWhite } from 'Images'

const grey = '#969696'
const graphMargin = 24
const nodeSize = 10

const isIPFS = id => id.startsWith('https://ipfs')
const isClaim = id => id.startsWith('claim')
const endsWith = q => str => str.endsWith(q)
const getWorkId = str => str.split('/').pop()

const dagreFromClaims = claims => {
  const graph = new dagreD3.graphlib.Graph()
  const nodes = uniq(flatten(claims.map(Object.values)))

  graph.setGraph({
    rankdir: 'BT',
    marginx: graphMargin,
    marginy: graphMargin,
  })

  graph.setDefaultEdgeLabel(() => ({}))

  nodes.forEach(id => graph.setNode(id, {
    label: '', // id.split('/').pop(),
    width: nodeSize,
    height: nodeSize,
    shape: 'circle',
  }))

  claims.forEach(claim => graph.setEdge(claim.origin, claim.target, {
    minlen: 2,
  }))

  dagreD3.dagre.layout(graph)

  return graph
}

const updateDim = ({ figure, setDim }) => {
  const { offsetHeight, offsetWidth } = figure.current
  setDim({ height: offsetHeight, width: offsetWidth })
}

const activateSelectedNode = ({ selectedNode, inner }) => {
  if (inner) {
    inner.selectAll('g.node').classed('selected', false)
  }

  if (selectedNode) {
    selectedNode.classed('selected', true)
  }
}

const scaleGraph = (graph, svg, zoom, dim) => {
  const graphWidth = graph.graph().width + graphMargin
  const graphHeight = graph.graph().height + graphMargin
  const zoomScale = Math.min(dim.width / graphWidth, dim.height / graphHeight)
  const translateX = (dim.width / 2) - ((graphWidth * zoomScale) / 2)
  const translateY = (dim.height / 2) - ((graphHeight * zoomScale) / 2)
  const transform =  d3.zoomIdentity
    .translate(translateX, translateY)
    .scale(zoomScale)

  svg.attr('transform', transform.toString())
}

const renderGraph = ({ dim, setInner, selectedNode, selectNode, graph, currentId }) => {
  if (!dim) return

  const render = dagreD3.render()
  const svg = d3.select('svg')
  const inner = svg.select('g')
  const zoom = d3.zoom()

  svg.call(zoom)
  render(inner, graph)
  scaleGraph(graph, inner, zoom, dim)
  setInner(inner)

  const allNodes = inner.selectAll('g.node')

  inner.selectAll('g.node').attr('pointer-events', 'all').on('click', function(id, i) {
    selectNode(d3.select(this), id)
  })

  if (!selectedNode && !allNodes.empty()) {
    selectNode(inner.selectAll('g.node').filter(endsWith(currentId)))
  }
}

export const ClaimGraph = ({ claims, currentClaim, setWorkId }) => (
  <div className={classNames.claimGraph}>
    <Figcaption currentClaim={currentClaim} />
    <Figure claims={claims} currentClaim={currentClaim} setWorkId={setWorkId} />
  </div>
)

const Figcaption = ({ currentClaim }) => {
  const { claim: { name, author, hash } } = currentClaim

  return (
    <figcaption className={classNames.figcaption}>
      <h1>{name}</h1>
      <div>{author}</div>
    </figcaption>
  )
}

const Figure = ({ claims, currentClaim, setWorkId }) => {
  const figure = useRef(null)
  const g = useRef(null)
  const graph = dagreFromClaims(claims)
  const [dim, setDim] = useState(false)
  const [selectedNode, setSelectedNode] = useState(false)
  const [inner, setInner] = useState(false)
  const currentId = currentClaim?.id

  const selectNode = (node, id = currentId) => {
    setSelectedNode(node)

    if (id !== currentId && !isIPFS(id)) {
      setWorkId(getWorkId(id))
    }
  }

  useEffect(() => {
    updateDim({ figure, setDim })
    window.addEventListener('resize', () => updateDim({ figure, setDim }))
  }, [])

  useEffect(() => renderGraph({ dim, graph, setInner, selectedNode, selectNode, currentId }), [dim, claims])

  useEffect(() => activateSelectedNode({ selectedNode, inner }), [selectedNode])

  return (
    <figure className={classNames.figure} ref={figure} style={{ pointerEvents: 'none' }}>
      <style>{`
        .node rect,
        .node circle,
        .node ellipse {
          stroke: #333;
          fill: #fff;
          stroke-width: 1px;
          border-radius: ${nodeSize / 2};
        }

        .node.selected circle {
          fill: #abc;
        }

        .edgePath path {
          stroke: #333;
          fill: #333;
          stroke-width: 1.5px;
        }
      `}</style>

      {dim && (
        <svg { ...dim }>
          <g ref={g} />
        </svg>
      )}
    </figure>
  )
}
