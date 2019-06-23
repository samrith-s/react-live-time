# react-live-time

> A component to display real-time for posts, notifications, messages, feeds, etc.

[![NPM](https://img.shields.io/npm/v/react-live-time.svg)](https://www.npmjs.com/package/react-live-time) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-live-time
```

or

```bash
yarn add react-live-time
```

## Usage

```javascript
import React from 'react';

import ReactLiveTime from 'react-live-time';

class MyApp extends React.Component {
  render() {
    return <ReactLiveTime time={Date.now()} />;
  }
}
```

## License

GPL-3.0-or-later © [samrith-s](https://github.com/samrith-s)
