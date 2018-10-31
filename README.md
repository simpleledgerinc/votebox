# Votebox.io

## Voting Token Document File Format

| Length | Type                       |
| ------ | -------------------------- |
| 1 byte | version, default 0x00      |
| var    | title, 0-terminated        |
| 1 byte | number of choices          |
| var    | string array, 0-terminated |
| int64  | end of voting              |

## Installation

1. Download dependencies: `yarn`
2. Run project: `yarn start`
