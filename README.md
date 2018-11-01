# Votebox.io

## VoteBox.io Token Document Binary File Format

| Length | Description                                |
| ------ | ------------------------------------------ |
| 1 byte | Type of vote, 0x00=public, 0x01=private    |
| var    | Title of issue to vote on, 0-terminated    |
| 1 byte | number of issue choices (up to 255)        |
| var    | string array, 0-terminated                 |
| int64  | end of voting time (local time zone?)      |

## Types of voting

### Public Voting (0x00)

Public voting is completely transparent.  The voting token document is published on-chain and contains the issue description and issue choices.  Voting addresses are deterministically created using issue choice index and the expiration time for the voting (i.e., `<choice-index> OP_DROP <timelock> OP_CHECKTIMELOCKVERIFY`).

### Private Voting (0x01)

Private voting means that the voting document details are not published to the blockchain which is ideal for voting in private companies.  It is the responsibility of the voting host/authority to distribute the voting token document to the voters off-chain.  The voters will then need to load this voting document into the Votebox.io software in order to participate in the vote.  The addresses used for private voting are derived in the same way public voting is derived.

## Installation

1. Download dependencies: `yarn`
2. Run project: `yarn start`
