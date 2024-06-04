'use client'

import Tree from '~/components/tree/Tree'

const TreeNodeRenderer = (data: any) => {
  return data.name
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-64">
      <Tree
        showNumbers
        nodeRenderer={TreeNodeRenderer}
        data={[
          {
            data: { name: 'form' },
            children: [
              { data: { name: 'foo' } },
              { data: { name: 'bar' } },
            ],
          },
        ]}
      />
    </main>
  )
}
