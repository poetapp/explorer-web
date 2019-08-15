import React, { useEffect, useRef, useState } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import { flatten, uniq } from 'ramda'

import classNames from './ClaimGraph.scss'
import { ClaimWhite } from 'Images'

const grey = '#969696'
const graphMargin = 24
const nodeSize = 10

const claims = [
  { origin: 'poet:claims/1', target: 'https://example.com' },
  { origin: 'poet:claims/2', target: 'https://example.com' },
  { origin: 'poet:claims/3', target: 'poet:claims/1' },
  { origin: 'poet:claims/3', target: 'poet:claims/6' },
  { origin: 'poet:claims/4', target: 'poet:claims/1' },
  { origin: 'poet:claims/5', target: 'poet:claims/3' },
]

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
    label: id.split('/').pop(),
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

export const ClaimGraph = () => (
  <div className={classNames.claimGraph}>
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
  const g = useRef(null)
  const graph = dagreFromClaims(claims)
  const [dim, setDim] = useState(null)

  const updateDim = () => {
    const { offsetHeight, offsetWidth } = figure.current
    console.log('updating dimensions')
    setDim({ height: offsetHeight, width: offsetWidth })
  }

  const scaleGraph = (graph, svg, zoom) => {
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

  useEffect(() => {
    updateDim()
    window.addEventListener('resize', updateDim)
  }, [])

  useEffect(() => {
    if (!dim) return

    const render = dagreD3.render()
    const svg = d3.select('svg')
    const inner = svg.select('g')
    const zoom = d3.zoom()

    svg.call(zoom)
    render(inner, graph)
    scaleGraph(graph, inner, zoom)
  }, [dim])

  return (
    <figure className={classNames.figure} ref={figure}>
      <style>{`
        .node rect,
        .node circle,
        .node ellipse {
          stroke: #333;
          fill: #fff;
          stroke-width: 1px;
          border-radius: ${nodeSize / 2};
        }

        .edgePath path {
          stroke: #333;
          fill: #333;
          stroke-width: 1.5px;
        }
      `}</style>

      {dim && (
        <svg>
          <g ref={g} />
        </svg>
      )}
    </figure>
  )
}
