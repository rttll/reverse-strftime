# Reverse strftime

Strftime directives on the command line. Pass in a date, get back a strftime string.

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

In the console, input your desired date format:

`strftime [date string] (options)`

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

### Locale

By default, the input string is parsed using the system locale. See the `<locale>` and `<auto>` options below for using locales other than your own.

```bash
# System locale: es-MX
strftime Thursday, 20 May 2021 01:20:12
# ➜ %A, %d %B %Y %H:%M:%S
```

## Options

### \<locale\>

**(Requires Node > v12)**

Indicate if your input order differs from the system locale's. e.g. You're in the US, but are putting the day first.

`strftime [datestring] -l --locale`

```bash
# System locale => en-US (M/D/YYYY)

# Let's generate a string for en-GB (D/MM/YYYY)
strftime Mon. 31/12/1999 -l en-GB
# ➜ %a. %d/%m/%Y

# Same input without padding a locale will give incorrect output.
strftime Mon. 31/12/1999
# ➜ %a. %m/%d/%Y (Nope)

```

### <auto\>

Auto generate strftime string.
Optionally pass in a locale (see above) to generate for another locale.

`strftime -a --auto`

```bash
# locale: en-US

strftime -a
# ➜ %A, %B %d, %Y at %H:%M:%S %p
# ➜ Monday, May 17, 2021 at 23:34:26 PM

# Let's autogenerate for another locale

strftime -a -l en-GB
# ➜ %A, %d %B %Y at %H:%M:%S
```

### \<auto>\<short>

When autogenerating, prefer short-format.

`strftime -a -s --short`

```bash
strftime -a -s
# ➜ %m/%d/%y, %H:%M %p
```

## Reference

Use the reference command to log all the strftime keys.

`strftime reference|ref`

```bash
strftime ref

# Logs:

# ➜ Weekday
# %A Sunday
# %a Sun
#
# ➜ Month
# %B August
# %b Aug
# %m 08

...
```

## Usage Notes

### Option condensing

As usual, you can combine commands

```bash
strftime -asl en-GB
# ➜ %d/%m/%Y, %H:%M
```

### Format-focused

The date does not have to be accurate, only recognizable. i.e. you don't have to think about the date (just the format).

```bash
# New Year's Eve in 1999 was actually a Friday,
# but this still prints the correct strftime:

strftime Sunday December 31, 1999
# ➜ %A %B %d, %Y

```

### Full dates / order

reverse-strftime mostly expects full dates, or at least partial dates in order.

```bash
# This is fine

strftime June 1
# ➜ %B %e

# But it'll bonk if time is added and
# year is skipped:

strftime June 1 4pm
# ➜ %B %e %y%P
```
