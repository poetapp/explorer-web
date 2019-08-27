import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
import { pipe, map, equals, not, values, flatten, uniq } from 'ramda'
import React, { useEffect, useRef, useState, useMemo } from 'react'

import { TextDocumentWhite, TextDocumentGreen } from 'Images'

import classNames from './Graph.scss'

const edgesToNodes = pipe(map(values), flatten, uniq)

export const Graph = ({ edges, selectedValue, onNodeSelected, nodeSize = 10, margin = 24 }) => {
  const [graphSize, setGraphSize] = useState(false)
  const [svg, setSvg] = useState(false)
  const figure = useRef(null)

  const graph = useMemo(() => dagreFromEdges(edges, margin, nodeSize), [edges])

  useEffect(() => {
    if (svg && selectedValue) {
      const unselectedNodes = svg.selectAll('g.node').filter(pipe(equals(selectedValue), not))
      const selectedNodes = svg.selectAll('g.node').filter(equals(selectedValue))
      unselectedNodes.classed('selected', false)
      unselectedNodes.select('image').attr('xlink:href', TextDocumentWhite)
      selectedNodes.classed('selected', true)
      selectedNodes.select('image').attr('xlink:href', TextDocumentGreen)
    }
  }, [svg, selectedValue])

  useEffect(() => {
    if (!figure.current)
      return
    const updateFigureSize = () => {
      const { offsetHeight, offsetWidth } = figure.current
      setGraphSize({ height: offsetHeight, width: offsetWidth })
    }
    updateFigureSize()
    window.addEventListener('resize', updateFigureSize)
    return () => window.removeEventListener('resize', updateFigureSize)
  }, [figure.current])

  useEffect(() => {
    setSvg(renderGraph({ graph, onNodeSelected }))
  }, [edges])

  useEffect(() => {
    if (graphSize && svg)
      scaleGraph(graph, svg, graphSize)
  }, [graphSize, svg])

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
  const nodes = edgesToNodes(edges).sort((a, b) => a.localeCompare(b))
  const sortedEdges = edges.sort(compareEdgesAlphabetically)

  graph.setGraph({
    rankdir: 'BT',
    marginx: margin,
    marginy: margin,
  })

  graph.setDefaultEdgeLabel(() => ({}))

  const nodeToGraphNode = node => ({
    label: '',
    width: nodeSize,
    height: nodeSize,
    shape: node.startsWith('poet:') ? 'circle' : 'image',
    imageUrl: TextDocumentWhite,
  })

  nodes.forEach(node => graph.setNode(node, nodeToGraphNode(node)))

  sortedEdges.forEach(({ origin, target }) => graph.setEdge(origin, target, {
    minlen: 2,
  }))

  dagreD3.dagre.layout(graph)

  return graph
}

const compareEdgesAlphabetically = (a, b) => {
  const originComparison = a.origin.localeCompare(b.origin)
  return originComparison !== 0
    ? originComparison
    : a.target.localeCompare(b.target)
}

const renderGraph = ({ graph, onNodeSelected }) => {
  const render = dagreD3.render()
  const svg = d3.select('svg')
  const inner = svg.select('g')

  render.shapes().image = renderImage
  render(inner, graph)

  svg.selectAll('g.node').attr('pointer-events', 'all').on('click', onNodeSelected)

  return svg
}

const renderImage = (parent, bbox, node) => {
  const w = bbox.width
  const h = bbox.height
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: -h },
    { x: 0, y: -h },
  ]
  const shapeSvg = parent.insert("image", ":first-child")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("xlink:href", TextDocumentWhite)
    .attr("transform", "translate(" + (-w / 2) + "," + (-h / 2) + ")")

  node.intersect = point =>
    dagreD3.intersect.rect(node, points);

  return shapeSvg
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
      .node ellipse,
      .node polygon {
        stroke: #333;
        fill: #fff;
        stroke-width: 1px;
        border-radius: ${nodeSize / 2}px;
      }

      .node.selected polygon,
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
