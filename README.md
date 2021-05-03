# Reverse strftime

Strftime hints on the command line. Pass in a date, get back the directives.

<img src="doc/console.jpg" width="500" height="auto">

## Installation

Must be installed globally (so it's available from the command line).

```bash
# yarn
yarn global add reverse-strftime

# or npm
npm i -g reverse-strftime
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

strftime Mon. January 1, 2044 14:40:45
# ➜ %a. %B %e, %Y %H:%M:%S

strftime 4/4/4444 4:40:45 am
# ➜ %m/%e/%Y %l:%M:%S %P

```

The date does not have to be accurate, only recognizable.  
You don't have to think about the date! (Just the format)

```bash
# New Year's Eve in 1999 was a Friday,
# but this still prints the correct strftime:

strftime Sunday December 31, 1999
# ➜ %A %B %d, %Y

```
