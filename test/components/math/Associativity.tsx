import ArrowDown from '../svg/ArrowDown'
import Equal from '../svg/Equal'

// https://blog.scottlogic.com/2015/02/02/svg-layout-flexbox.html
export default function Associativity() {
  return (
    <div className="flex gap-16 relative">
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-16 items-center">
          <div className="flex gap-16 bg-gray-200 rounded-sm p-8">
            <div className="rounded-sm bg-red-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
              2
            </div>
            <div className="rounded-sm bg-blue-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
              3
            </div>
          </div>
          <div className="flex gap-16">
            <div className="rounded-sm bg-yellow-300 w-64 h-64 text-gray-600 text-32 justify-center items-center flex">
              4
            </div>
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-violet-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            5
          </div>
          <div className="rounded-sm bg-yellow-300 w-64 h-64 text-gray-600 text-32 justify-center items-center flex">
            4
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-gray-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            9
          </div>
        </div>
      </div>
      <div className="pb-24 pt-32 flex flex-col justify-between">
        <Equal
          width={32}
          height={16}
          className="fill-gray-300"
        />
        <Equal
          width={32}
          height={16}
          className="fill-gray-300"
        />
        <Equal
          width={32}
          height={16}
          className="fill-gray-300"
        />
      </div>
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-16 items-center">
          <div className="flex gap-16">
            <div className="rounded-sm bg-red-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
              2
            </div>
          </div>
          <div className="flex gap-16 bg-gray-200 rounded-sm p-8">
            <div className="rounded-sm bg-blue-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
              3
            </div>
            <div className="rounded-sm bg-yellow-300 w-64 h-64 text-gray-600 text-32 justify-center items-center flex">
              4
            </div>
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-red-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            2
          </div>
          <div className="rounded-sm bg-emerald-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            7
          </div>
        </div>
        <ArrowDown
          width={32}
          height={32}
        />
        <div className="flex gap-16">
          <div className="rounded-sm bg-gray-500 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            9
          </div>
        </div>
      </div>
    </div>
  )
}
