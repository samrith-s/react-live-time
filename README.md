# React Live-Time 🖖🏼

A simple time-ago component for React, build entirely on Hooks!

[![NPM](https://img.shields.io/npm/v/react-live-time.svg)][npm] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)][js-std]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Date Formats](#date-formats)
- [Examples](#examples)

## <a name="installation"></a>Installation

Using NPM:

```bash
npm i react-live-time
```

Using Yarn:

```bash
yarn add react-live-time
```

## <a name="usage"></a>Usage

```javascript
import React from 'react';
import ReactLiveTime from 'react-live-time';

function MyApp() {
  return <ReactLiveTime time={Date.now()} />;
}
```

## <a name="props"></a>Props

| Name        | Type            | Default       | Description                                                                                           |
| ----------- | --------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| time        | `Date`/`Number` | `undefined`   | The value to be converted into timeago.                                                               |
| format      | `String`        | `isoDateTime` | The format of the displayed date. This is only valid for dates 24-hours and over.                     |
| showSeconds | `Boolean`       | `false`       | Controls whether to show `x seconds ago..` and maintain a timer for it.                               |
| renderer    | `Function`      | `undefined`   | A custom renderer, which gets all the following data as render props: `{time, status, text, format }` |

## <a name="date-formats"></a>Date Formats

The `format` props supports a large number of date formats. It relies on [`dateformat`](https://www.npmjs.com/package/dateformat) package. You can find the list of [mask options][df-mo] and the predefined [named formats][df-nf].

## <a name="examples"></a>Examples

There is a basic example up and running on the [GitHub pages][gh-pages]

## <a name="license"></a>License

GPL-3.0-or-later © [samrith-s](https://github.com/samrith-s)

[gh-pages]: https:///samrith0s.github.io/react-live-time
[npm]: https://www.npmjs.com/package/react-live-time
[js-std]: https://standardjs.com
[df]: https://www.npmjs.com/package/dateformat
[df-mo]: https://github.com/felixge/node-dateformat#mask-options
[df-nf]: https://github.com/felixge/node-dateformat#named-formats
