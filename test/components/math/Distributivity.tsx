import ArrowDown from '../svg/ArrowDown'
import Equal from '../svg/Equal'
import Plus from '../svg/Plus'
import Times from '../svg/Times'

export function LeftDistributivity() {
  return (
    <div className="flex gap-16 relative flex-col items-center">
      <div className="flex gap-16 items-center">
        <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
          a
        </div>
        <Times
          width={32}
          height={32}
          className="fill-gray-300"
        />
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-600 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            b
          </div>
          <Plus
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-400 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            c
          </div>
        </div>
      </div>
      <ArrowDown
        width={32}
        height={32}
      />
      <div className="flex gap-16 items-center">
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            a
          </div>
          <Times
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-600 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            b
          </div>
        </div>
        <Plus
          width={32}
          height={32}
          className="fill-gray-300"
        />
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            a
          </div>
          <Times
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-400 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            c
          </div>
        </div>
      </div>
    </div>
  )
}

export function RightDistributivity() {
  return (
    <div className="flex gap-16 relative flex-col items-center">
      <div className="flex gap-16 items-center">
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            a
          </div>
          <Plus
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-600 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            b
          </div>
        </div>
        <Times
          width={32}
          height={32}
          className="fill-gray-300"
        />
        <div className="rounded-sm bg-gray-400 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
          c
        </div>
      </div>
      <ArrowDown
        width={32}
        height={32}
      />
      <div className="flex gap-16 items-center">
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            a
          </div>
          <Times
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-600 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            c
          </div>
        </div>
        <Plus
          width={32}
          height={32}
          className="fill-gray-300"
        />
        <div className="flex gap-16 p-8 bg-gray-200 items-center">
          <div className="rounded-sm bg-gray-900 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            b
          </div>
          <Times
            width={32}
            height={32}
            className="fill-gray-400"
          />
          <div className="rounded-sm bg-gray-600 w-64 h-64 text-gray-50 text-32 justify-center items-center flex">
            c
          </div>
        </div>
      </div>
    </div>
  )
}
