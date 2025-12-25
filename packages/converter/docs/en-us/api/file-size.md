---
title: convertFileSize
---

# convertFileSize

Provides utilities to convert file size values between common units.
The conversion uses either binary (win, 1024) or decimal (mac, 1000) steps.

## Description

```ts
import { convertFileSize } from '.../packages/converter/src/file-size'

export function convertFileSize(
  val: number,
  from: FileSizeUnit,
  to: FileSizeUnit,
  sys?: System
): number
```

- FileSizeUnit:
  - Names: 'byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte', 'exabyte', 'zettabyte', 'yottabyte'
  - Aliases: 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
- System: `'win'` (1024-step) | `'mac'` (1000-step). Default: `'win'`.

### Parameters

- val: number — source value to convert.
- from: FileSizeUnit — unit of the source value.
- to: FileSizeUnit — desired target unit.
- sys?: System — conversion step system, default `'win'`.

### Return

- number — converted value.
  - Non-finite input returns NaN.
  - Very large results return Infinity or -Infinity.
  - Very small results that underflow to 0 will return 0.

### Throws

- Throws Error if `from` or `to` is an unknown unit.
- Unit names are case-sensitive. Use provided names or exact aliases.

### Behavior notes

- The implementation uses logarithmic checks to avoid intermediate overflow/underflow when computing large powers.
- Does not use BigInt; for extremely large integer-accurate conversions consider a bigint-aware implementation.
- Precision is subject to IEEE-754 double limitations.

### Examples

```ts
// binary (win) system
convertFileSize(1, 'KB', 'B', 'win') // => 1024
convertFileSize(1024, 'B', 'KB', 'win') // => 1
convertFileSize(1, 'MB', 'KB', 'win') // => 1024

// decimal (mac) system
convertFileSize(1, 'KB', 'B', 'mac') // => 1000
convertFileSize(2, 'MB', 'KB', 'mac') // => 2000

// mixed aliases / names
convertFileSize(1.5, 'MB', 'KB', 'win') // => 1.5 * 1024
convertFileSize(-1, 'KB', 'B', 'win') // => -1024
```

### Edge cases & tests

- Non-finite inputs: NaN, Infinity, -Infinity -> returns NaN.
- Unknown unit -> throws.
- Overflow/underflow:
  - Very large conversions return ±Infinity.
  - Very small conversions underflow to 0.

See source and tests:
- Source: packages/converter/src/file-size.ts
- Tests:
