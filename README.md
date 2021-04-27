# Reverse strftime

Strftime hints on the command line. Pass in a date, get back the directives.

`4/01/1999 => %m/%d/%Y`

## Installation

Must be installed globally (so it's available from the command line).

```bash
# yarn
yarn global add strftime-cli

# or npm
npm i -g strftime-cli
```

## Usage

Use in the console:

`strftime [date string] `

```bash
strftime Saturday January 1, 2020
# ➜ %A %B %e, %Y

strftime Sat. Jan. 01, 20
# ➜ %a. %b. %d %y

strftime 4/4/21
# ➜ %m/%e/%y

strftime 4-04-2021
# ➜ %m-%d-%Y
```

The date does not have to be accurate, only recognizable.  
You don't have to think about the date! (Just the format)

```bash
strftime Sunday December 31, 1999
# ➜ %A %B %d, %Y
# New Year's Eve in 1999 was a Friday.
```
