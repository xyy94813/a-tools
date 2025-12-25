export type FileSizeUnitName
  = 'byte'
    | 'kilobyte'
    | 'megabyte'
    | 'gigabyte'
    | 'terabyte'
    | 'petabyte'
    | 'exabyte'
    | 'zettabyte'
    | 'yottabyte'

export type FileSizeUnitAlias
  = 'B'
    | 'KB'
    | 'MB'
    | 'GB'
    | 'TB'
    | 'PB'
    | 'EB'
    | 'ZB'
    | 'YB'

export type FileSizeUnit = FileSizeUnitName | FileSizeUnitAlias

export type System = 'win' | 'mac'

const sysStep: Record<System, number> = {
  mac: 1000,
  win: 1024,
}

const units: Record<FileSizeUnit, number> = {
  byte: 1,
  kilobyte: 2,
  megabyte: 3,
  gigabyte: 4,
  terabyte: 5,
  petabyte: 6,
  exabyte: 7,
  zettabyte: 8,
  yottabyte: 9,
  // alias
  B: 1,
  KB: 2,
  MB: 3,
  GB: 4,
  TB: 5,
  PB: 6,
  EB: 7,
  ZB: 8,
  YB: 9,
}

export function convertFileSize(
  val: number,
  from: FileSizeUnit,
  to: FileSizeUnit,
  sys: 'win' | 'mac' = 'win',
): number {
  if (!Number.isFinite(val))
    return Number.NaN

  const fromExp = units[from]
  const toExp = units[to]
  if (fromExp === undefined)
    throw new Error(`Unknown from unit: ${String(from)}`)
  if (toExp === undefined)
    throw new Error(`Unknown to unit: ${String(to)}`)

  const expDiff = fromExp - toExp // val * (step ** expDiff)

  if (expDiff === 0 || val === 0)
    return val

  const step = sysStep[sys]

  // 使用对数预先判断是否会溢出或下溢（避免直接 Math.pow 产生 Infinity/0）
  const absVal = Math.abs(val)
  // 当 absVal 为 0 时已提前返回
  const log10Step = Math.log10(step)
  const log10Result = Math.log10(absVal) + expDiff * log10Step

  // IEEE-754 double 最大/最小数量级近似值
  const MAX_LOG10 = Math.log10(Number.MAX_VALUE) // ~308.2547
  const MIN_LOG10 = Math.log10(Number.MIN_VALUE) // ~-323.306

  if (log10Result > MAX_LOG10)
    return val > 0 ? Infinity : -Infinity
  if (log10Result < MIN_LOG10)
    return 0

  // 在已知安全范围内使用 Math.pow 进行计算
  const factor = step ** expDiff
  return val * factor
}
