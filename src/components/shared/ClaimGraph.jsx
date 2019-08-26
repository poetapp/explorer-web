import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
import { pipe, not, flatten, uniq, equals } from 'ramda'
import React, { useEffect, useRef, useState, useMemo } from 'react'

import { ClaimWhite } from 'Images'

import classNames from './ClaimGraph.scss'

const grey = '#969696'
const graphMargin = 24
const nodeSize = 10

export const Graph = ({ edges, selectedValue, onNodeSelected }) => {
  const [dim, setDim] = useState(false)
  const [svg, setSvg] = useState(false)
  const figure = useRef(null)

  const graph = useMemo(() => dagreFromEdges(edges), [edges])

  useEffect(() => {
    if (svg && selectedValue) {
      svg.selectAll('g.node').filter(pipe(equals(selectedValue), not)).classed('selected', false)
      svg.selectAll('g.node').filter(equals(selectedValue)).classed('selected', true)
    }
  }, [svg, selectedValue])

  useEffect(() => {
    updateDim({ figure, setDim })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => updateDim({ figure, setDim })) // TODO: useWindowEventListener hook+unhook
  }, [])

  useEffect(() => {
    setSvg(renderGraph({ graph, onNodeSelected }))
  }, [edges])

  useEffect(() => {
    if (dim && svg)
      scaleGraph(graph, svg, dim)
  }, [dim, svg])

  return (
    <figure className={classNames.figure} ref={figure}>
      <GraphStyle nodeSize={nodeSize} />
      <svg>
        <g/>
      </svg>
    </figure>
  )
}

const dagreFromEdges = edges => {
  const graph = new dagreD3.graphlib.Graph()
  const nodes = uniq(flatten(edges.map(Object.values)))

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

  edges.forEach(({ origin, target }) => graph.setEdge(origin, target, {
    minlen: 2,
  }))

  dagreD3.dagre.layout(graph)

  return graph
}

const renderGraph = ({ graph, onNodeSelected }) => {
  const render = dagreD3.render()
  const svg = d3.select('svg')
  const inner = svg.select('g')

  render(inner, graph)

  svg.selectAll('g.node').attr('pointer-events', 'all').on('click', onNodeSelected)

  return svg
}

const scaleGraph = (graph, svg, dim) => {
  const graphWidth = graph.graph().width + graphMargin
  const graphHeight = graph.graph().height + graphMargin
  const zoomScale = Math.min(dim.width / graphWidth, dim.height / graphHeight)
  const translateX = (dim.width / 2) - ((graphWidth * zoomScale) / 2)
  const translateY = (dim.height / 2) - ((graphHeight * zoomScale) / 2)
  const transform =  d3.zoomIdentity
    .translate(translateX, translateY)
    .scale(zoomScale)

  const g = svg.select('svg>g')
  g.attr('transform', transform.toString())
}

const updateDim = ({ figure, setDim }) => {
  const { offsetHeight, offsetWidth } = figure.current
  setDim({ height: offsetHeight, width: offsetWidth })
}

const GraphStyle = ({ nodeSize }) => (
  <style>
    {`
      .node rect,
      .node circle,
      .node ellipse {
        stroke: #333;
        fill: #fff;
        stroke-width: 1px;
        border-radius: ${nodeSize / 2}px;
      }

      .node.selected circle {
        fill: #abc;
      }

      .edgePath path {
        stroke: #333;
        fill: #333;
        stroke-width: 1.5px;
      }
    `}
  </style>
)
