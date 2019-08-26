import React, { useEffect, useRef, useState, useMemo } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import { flatten, uniq, equals } from 'ramda'

import classNames from './ClaimGraph.scss'
import { ClaimWhite } from 'Images'

const grey = '#969696'
const graphMargin = 24
const nodeSize = 10

export const Graph = ({ edges, selectedValue, onNodeSelected }) => {
  const [dim, setDim] = useState(false)
  const [selectedNode, setSelectedNode] = useState(false)
  const [inner, setInner] = useState(false)
  const figure = useRef(null)
  // const g = useRef(null)

  const graph = useMemo(() => dagreFromEdges(edges), [edges])

  const onNodeSelectedWrapper = (node, id = selectedValue) => {
    console.log('onNodeSelectedWrapper', node, id)
    setSelectedNode(node)

    if (id !== selectedValue)
      onNodeSelected(id)
  }

  useEffect(() => {
    if (inner && selectedValue)
      setSelectedNode(inner.selectAll('g.node').filter(equals(selectedValue)))
  }, [inner, selectedValue])

  useEffect(() => {
    updateDim({ figure, setDim })
    window.addEventListener('resize', () => updateDim({ figure, setDim })) // TODO: useWindowEventListener hook+unhook
  }, [])

  useEffect(() => {
    renderGraph({ dim, graph, setInner, selectedNode, onNodeSelected: onNodeSelectedWrapper, selectedValue })
  }, [dim, edges])

  useEffect(() => activateSelectedNode({ selectedNode, inner }), [selectedNode])

  return (
    <figure className={classNames.figure} ref={figure}>
      <style>{`
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
      `}</style>

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

const renderGraph = ({ dim, setInner, selectedNode, onNodeSelected, graph, selectedValue }) => {
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
    onNodeSelected(d3.select(this), id)
  })

  if (!selectedNode && !allNodes.empty()) {
    onNodeSelected(inner.selectAll('g.node').filter(equals(selectedValue)))
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
