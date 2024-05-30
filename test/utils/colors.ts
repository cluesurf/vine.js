import colorConvert from 'color-convert'

const colors = {
  blue50: h([239, 246, 255]),
  blue100: h([219, 234, 254]),
  blue200: h([191, 219, 254]),
  blue300: h([147, 197, 253]),
  blue400: h([96, 165, 250]),
  blue600: h([37, 99, 235]),
  blue500: h([59, 130, 246]),
  blue700: h([29, 78, 216]),
  blue800: h([30, 64, 175]),
  blue900: h([30, 58, 138]),
  blue950: h([23, 37, 84]),
  violet50: h([245, 243, 255]),
  violet100: h([237, 233, 254]),
  violet200: h([221, 214, 254]),
  violet300: h([196, 181, 253]),
  violet400: h([167, 139, 250]),
  violet500: h([139, 92, 246]),
  violet600: h([124, 58, 237]),
  violet800: h([91, 33, 182]),
  violet900: h([76, 29, 149]),
  violet950: h([46, 16, 101]),
  emerald100: h([209, 250, 229]),
  emerald200: h([167, 243, 208]),
  emerald300: h([110, 231, 183]),
  emerald500: h([16, 185, 129]),
  emerald700: h([4, 120, 87]),
  red500: h([239, 68, 68]),
  yellow500: h([234, 179, 8]),
  slate950: h([2, 6, 23]),
  slate900: h([15, 23, 42]),
  slate800: h([30, 41, 59]),
  slate600: h([71, 85, 105]),
  slate500: h([100, 116, 139]),
  slate400: h([148, 163, 184]),
  slate300: h([203, 213, 225]),
  slate200: h([226, 232, 240]),
  slate100: h([241, 245, 249]),
  slate50: h([248, 250, 252]),
  gray50: h([249, 250, 251]),
  gray100: h([243, 244, 246]),
  gray200: h([229, 231, 235]),
  gray300: h([209, 213, 219]),
  gray400: h([156, 163, 175]),
  gray500: h([107, 114, 128]),
  gray600: h([75, 85, 99]),
  gray700: h([55, 65, 81]),
  gray800: h([31, 41, 55]),
  gray900: h([17, 24, 39]),
  gray950: h([3, 7, 18]),
}

console.log(colors)

export default colors

function h(rgb: [number, number, number]) {
  return '#' + colorConvert.rgb.hex(rgb)
}
