import React, { useEffect, useRef, useState, useMemo } from 'react'
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
import { pipe, not, flatten, uniq, equals } from 'ramda'

import classNames from './ClaimGraph.scss'
import { ClaimWhite } from 'Images'

const grey = '#969696'
const graphMargin = 24
const nodeSize = 10

export const Graph = ({ edges, selectedValue, onNodeSelected }) => {
  const [dim, setDim] = useState(false)
  const [inner, setInner] = useState(false)
  const figure = useRef(null)

  const graph = useMemo(() => dagreFromEdges(edges), [edges])

  useEffect(() => {
    if (inner && selectedValue) {
      inner.selectAll('g.node').filter(pipe(equals(selectedValue), not)).classed('selected', false)
      inner.selectAll('g.node').filter(equals(selectedValue)).classed('selected', true)
    }
  }, [inner, selectedValue])

  useEffect(() => {
    updateDim({ figure, setDim })
    window.addEventListener('resize', () => updateDim({ figure, setDim })) // TODO: useWindowEventListener hook+unhook
  }, [])

  useEffect(() => {
    setInner(renderGraph({ dim, graph, onNodeSelected }))
  }, [dim, edges])

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

const renderGraph = ({ graph, dim, onNodeSelected }) => {
  if (!dim) return

  const render = dagreD3.render()
  const svg = d3.select('svg')
  const inner = svg.select('g')
  const zoom = d3.zoom()

  svg.call(zoom)
  render(inner, graph)
  scaleGraph(graph, inner, zoom, dim)

  inner.selectAll('g.node').attr('pointer-events', 'all').on('click', onNodeSelected)

  return inner
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
