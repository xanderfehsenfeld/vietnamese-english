declare module 'react-d3-graph' {
  interface D3Config {
    alphaTarget: number
    gravity: number
    linkLength: number
    linkStrength: number
  }

  interface NodeConfig {
    color: string
    fontColor: string
    fontSize: number
    fontWeight: string
    highlightColor: string
    highlightFontSize: number
    highlightFontWeight: string
    highlightStrokeColor: string
    highlightStrokeWidth: number
    mouseCursor: string
    opacity: number
    renderLabel: boolean
    size: number
    strokeColor: string
    strokeWidth: number
    svg: string
    symbolType: string
    viewGenerator?: ({ hiddenAdjacentNodes, color }: IGraphNode) => JSX.Element
  }

  interface LinkConfig {
    color: string
    fontColor: string
    fontSize: number
    fontWeight: string
    highlightColor: string
    highlightFontSize: number
    highlightFontWeight: string
    labelProperty: string
    mouseCursor: string
    opacity: number
    renderLabel: boolean
    semanticStrokeWidth: boolean
    strokeWidth: number
  }
  export interface IGraphLink {
    source: string
    target: string
  }
  export interface IGraphNode {
    id: string
    hiddenAdjacentNodes?: string[]
    color?: string
  }

  export interface IGraphData {
    links: IGraphLink[]
    nodes: IGraphNode[]
  }
  export interface IReactD3Config {
    automaticRearrangeAfterDropNode: boolean
    collapsible: boolean
    directed: boolean
    focusAnimationDuration?: number
    focusZoom: number
    height: number
    highlightDegree: number
    highlightOpacity: number
    linkHighlightBehavior: boolean
    maxZoom: number
    minZoom: number
    nodeHighlightBehavior: boolean
    panAndZoom: boolean
    staticGraph: boolean
    width: number
    d3: D3Config
    node: NodeConfig
    link: LinkConfig
  }
  export class Graph extends React.Component<{
    onClickNode: (id: string) => void
    id: string
    data: IGraphData
    config: IReactD3Config
  }> {}
}
