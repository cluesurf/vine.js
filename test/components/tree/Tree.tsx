import { useMemo } from 'react'

export type TreeNodeData = {
  data?: any
  children?: Array<TreeNodeData>
}

type TreeInput = {
  nodeRenderer: React.FC<any>
  data: Array<TreeNodeData>
  showNumbers?: boolean
}

const Tree: React.FC<TreeInput> = ({
  data,
  nodeRenderer,
  showNumbers,
}) => {
  const { depth, length } = calculateTreeDimensions({ children: data })
  const depthNumbers = useMemo(() => {
    const elements: Array<React.ReactNode> = []
    let i = 0
    while (i < depth) {
      elements.push(
        <div
          key={`x-${i}`}
          className="select-none cursor-default flex items-center pr-12 py-8 w-24 text-gray-400"
        >
          {(i + 1).toString(16)}
        </div>,
      )
      i++
    }
    return elements
  }, [depth])

  return (
    <div className="w-full text-md2">
      {showNumbers && (
        <div className="w-full flex pl-24">{depthNumbers}</div>
      )}
      {data.map((node, i) => (
        <TreeNode
          key={`n-${i}`}
          data={node}
          nodeRenderer={nodeRenderer}
          depth={1}
          row={i + 1}
          maxLength={length}
          showNumbers={showNumbers}
        />
      ))}
    </div>
  )
}

export default Tree

type TreeNodeInput = {
  nodeRenderer: React.FC<any>
  data: TreeNodeData
  depth: number
  maxLength: number
  row: number
  showNumbers?: boolean
}

const TreeNode: React.FC<TreeNodeInput> = ({
  data,
  nodeRenderer,
  depth,
  maxLength,
  row,
  showNumbers,
}) => {
  const NodeRenderer = nodeRenderer

  return (
    <div className="w-full flex flex-col">
      <div className="flex">
        {showNumbers && (
          <div
            className="text-gray-400 select-none cursor-default"
            style={{ width: Math.ceil(maxLength / 10) * 12 }}
          >
            {row}
          </div>
        )}
        <div
          style={{
            paddingLeft: showNumbers
              ? depth * 24 - 12
              : (depth - 1) * 24,
          }}
        >
          <NodeRenderer {...data.data} />
        </div>
      </div>

      {data.children?.map((node, i) => (
        <TreeNode
          key={`n-${i}`}
          data={node}
          nodeRenderer={nodeRenderer}
          depth={depth + 1}
          maxLength={maxLength}
          row={i + 1}
        />
      ))}
    </div>
  )
}

function calculateMaxTreeDepth(data: TreeNodeData, depth = 1) {
  let max = depth
  data.children?.forEach(node => {
    max = Math.max(max, calculateMaxTreeDepth(node, depth + 1))
  })
  return max
}

function calculateMaxTreeLength(data: TreeNodeData) {
  let max = data.children ? data.children.length : 0
  data.children?.forEach(node => {
    max = Math.max(max, calculateMaxTreeLength(node))
  })
  return max
}

function calculateTreeDimensions(data: TreeNodeData) {
  const depth = calculateMaxTreeDepth(data)
  const length = calculateMaxTreeLength(data)
  return { depth, length }
}
