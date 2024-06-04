import ArrowDown from '../svg/ArrowDown'
import Equal from '../svg/Equal'

export default function Commutativity() {
  return (
    <div className="flex gap-16 relative">
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-16">
          <div className="rounded-sm bg-red-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            3
          </div>
          <div className="rounded-sm bg-blue-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            4
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-violet-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            7
          </div>
        </div>
      </div>
      <div className="py-16 flex flex-col justify-between">
        <Equal
          width={32}
          height={32}
          className="fill-gray-300"
        />

        <Equal
          width={32}
          height={32}
          className="fill-gray-300"
        />
      </div>
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-16">
          <div className="rounded-sm bg-blue-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            4
          </div>
          <div className="rounded-sm bg-red-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            3
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
          x={32}
          y={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-violet-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            7
          </div>
        </div>
      </div>
    </div>
  )
}
