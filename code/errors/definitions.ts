import Kink from '@termsurf/kink'

const host = '@termsurf/fuel'

type Base = {}

let CODE_INDEX = 1

const CODE = {
  // abort_error: CODE_INDEX++,
}

type Name = keyof Base

Kink.code(host, (code: number) => code.toString(16).padStart(4, '0'))

// Kink.base(host, 'abort_error', (take: Base['abort_error']['take']) => ({
//   code: CODE.abort_error,
//   note: 'Call aborted.',
//   link: take.link,
// }))

export default function kink<N extends Name>(
  form: N,
  link?: Base[N]['take'],
  siteCode?: number,
) {
  const kink = Kink.make(host, form, link)
  if (siteCode) {
    kink.siteCode = siteCode
  }
  return kink
}
