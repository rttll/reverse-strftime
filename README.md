# strftime cli

Command line utility for strftime.
Pass in a date, get the corresponding strftime directives.

## Usage

`strftime -d <date> `

```
strftime -d Saturday January 1, 2020
# ➜ %A %B %e %Y

strftime -d Monday Jan 1
# ➜ %A %b %e

strftime -d Sat Jan 01, 20
# ➜ %a %b %d %y

```
