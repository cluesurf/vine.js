'use client'

import Associativity from '~/components/math/Associativity'
import Commutativity from '~/components/math/Commutativity'
import {
  LeftDistributivity,
  RightDistributivity,
} from '~/components/math/Distributivity'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-64 gap-16">
      <LeftDistributivity />
      <RightDistributivity />
      <Commutativity />
      <Associativity />
    </main>
  )
}
