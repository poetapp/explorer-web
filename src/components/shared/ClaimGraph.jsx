import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
import { pipe, map, equals, not, values, flatten, uniq } from 'ramda'
import React, { useEffect, useRef, useState, useMemo } from 'react'

import { ClaimWhite } from 'Images'

import classNames from './ClaimGraph.scss'

const edgesToNodes = pipe(map(values), flatten, uniq)

export const Graph = ({ edges, selectedValue, onNodeSelected, nodeSize = 10, margin = 24 }) => {
  const [figureSize, setFigureSize] = useState(false)
  const [svg, setSvg] = useState(false)
  const figure = useRef(null)

  const graph = useMemo(() => dagreFromEdges(edges, margin, nodeSize), [edges])

  useEffect(() => {
    if (svg && selectedValue) {
      svg.selectAll('g.node').filter(pipe(equals(selectedValue), not)).classed('selected', false)
      svg.selectAll('g.node').filter(equals(selectedValue)).classed('selected', true)
    }
  }, [svg, selectedValue])

  useEffect(() => {
    const updateFigureSize = () => {
      const { offsetHeight, offsetWidth } = figure.current
      setFigureSize({ height: offsetHeight, width: offsetWidth })
    }
    updateFigureSize()
    window.addEventListener('resize', updateFigureSize)
    return () => window.removeEventListener('resize', updateFigureSize)
  }, [])

  useEffect(() => {
    setSvg(renderGraph({ graph, onNodeSelected }))
  }, [edges])

  useEffect(() => {
    if (figureSize && svg)
      scaleGraph(graph, svg, figureSize)
  }, [figureSize, svg])

  return (
    <figure className={classNames.figure} ref={figure}>
      <GraphStyle nodeSize={nodeSize} />
      <svg>
        <g/>
      </svg>
    </figure>
  )
}

const dagreFromEdges = (edges, margin, nodeSize) => {
  const graph = new dagreD3.graphlib.Graph()
  const nodes = edgesToNodes(edges)

  graph.setGraph({
    rankdir: 'BT',
    marginx: margin,
    marginy: margin,
  })

  graph.setDefaultEdgeLabel(() => ({}))

  nodes.forEach(id => graph.setNode(id, {
    label: '',
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

const scaleGraph = (graph, svg, size) => {
  const graphWidth = graph.graph().width
  const graphHeight = graph.graph().height
  const zoomScale = Math.min(size.width / graphWidth, size.height / graphHeight)
  const translateX = size.width / 2 - graphWidth * zoomScale / 2
  const translateY = size.height / 2 - graphHeight * zoomScale / 2
  const transform =  d3.zoomIdentity
    .translate(translateX, translateY)
    .scale(zoomScale)

  const g = svg.select('svg>g')
  g.attr('transform', transform.toString())
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
