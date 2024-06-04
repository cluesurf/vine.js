import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import cx from 'classnames'
import styles from './Tree.module.css'

export type TreeNodeData = {
  data?: any
  children?: Array<TreeNodeData>
}

type TreeInput = {
  nodeRenderer: React.FC<any>
  data: Array<TreeNodeData>
  showNumbers?: boolean
}

export type TreeContext = {
  activeDepth?: number
  setActiveDepth: Dispatch<SetStateAction<number | undefined>>
}

const TreeContext = createContext<TreeContext>({
  activeDepth: undefined,
  setActiveDepth: () => {},
})

const Tree: React.FC<TreeInput> = ({
  data,
  nodeRenderer,
  showNumbers,
}) => {
  const [activeDepth, setActiveDepth] = useState<number>()
  return (
    <TreeContext.Provider value={{ activeDepth, setActiveDepth }}>
      <TreeContent
        data={data}
        nodeRenderer={nodeRenderer}
        showNumbers={showNumbers}
      />
    </TreeContext.Provider>
  )
}

const TreeContent: React.FC<TreeInput> = ({
  data,
  nodeRenderer,
  showNumbers,
}) => {
  const { depth, length } = calculateTreeDimensions({ children: data })
  const { activeDepth, setActiveDepth } = useContext(TreeContext)

  const depthNumbers = useMemo(() => {
    const elements: Array<React.ReactNode> = []
    let i = 0
    while (i < depth - 1) {
      elements.push(render(i))
      i++
    }
    return elements

    function render(i: number) {
      const handleMouseEnter = () => {
        setActiveDepth(i + 1)
      }
      return (
        <div
          onMouseEnter={handleMouseEnter}
          key={`x-${i}`}
          className={cx(
            'hover:text-gray-600 [&>div]:hover:block relative select-none cursor-default flex items-center pr-12 py-8 w-24 text-gray-400',
            activeDepth === i + 1 && `text-gray-600`,
          )}
        >
          <div
            style={{
              left: -8,
            }}
            className={cx(
              styles.node,
              activeDepth === i + 1 && '!block',
            )}
          />
          {(i + 1).toString(16)}
        </div>
      )
    }
  }, [depth, activeDepth])

  const treeNodes = useMemo(() => {
    return data.map((node, i) => (
      <TreeNode
        key={`n-${i}`}
        data={node}
        nodeRenderer={nodeRenderer}
        depth={1}
        row={i + 1}
        maxLength={length}
        showNumbers={showNumbers}
      />
    ))
  }, [data, showNumbers, nodeRenderer, length])

  const handleMouseLeave = () => {
    setActiveDepth(undefined)
  }

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className={cx(
        'w-full text-md2 p-16',
        activeDepth && styles[`highlightDepth${activeDepth}`],
      )}
    >
      {showNumbers && (
        <div className="w-full flex pl-24">{depthNumbers}</div>
      )}
      {treeNodes}
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
  const { setActiveDepth } = useContext(TreeContext)
  const [isActiveRow, setIsActiveRow] = useState(false)

  const children = useMemo(() => {
    return data.children?.map((node, i) => (
      <TreeNode
        key={`n-${i}`}
        data={node}
        nodeRenderer={nodeRenderer}
        depth={depth + 1}
        maxLength={maxLength}
        row={i + 1}
        showNumbers={showNumbers}
      />
    ))
  }, [data.children, maxLength, showNumbers, nodeRenderer, depth])

  const handleMouseEnter = () => {
    setActiveDepth(depth)
    setIsActiveRow(true)
  }

  const handleMouseLeave = () => {
    setIsActiveRow(false)
  }

  return (
    <div className="w-full flex flex-col relative">
      <div
        className="flex relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showNumbers && isActiveRow && (
          <>
            <div className="w-full bg-gray-50 h-full absolute -bottom-2 -top-2 -left-16" />
            <div className="w-full bg-gray-200 h-4 absolute -bottom-2 -left-16" />
          </>
        )}
        {showNumbers && (
          <div
            className={cx(
              'select-none cursor-default',
              isActiveRow ? 'text-gray-600' : 'text-gray-400',
            )}
            style={{
              width: Math.ceil(maxLength / 10) * 12,
              zIndex: 10,
            }}
          >
            {row}
          </div>
        )}
        <div
          className="relative"
          style={{
            marginLeft: showNumbers
              ? depth * 24 - 12
              : (depth - 1) * 24,
          }}
        >
          <NodeRenderer {...data.data} />
        </div>
      </div>

      {showNumbers && (
        <div
          style={{
            left: depth * 24 - 8,
          }}
          className={cx(styles.node, styles[`depth${depth}`])}
        />
      )}

      {children}
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
