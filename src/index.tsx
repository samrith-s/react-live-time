import React, { FunctionComponent, useState, useEffect } from 'react';

import LOCALIZATION from './localization';
import { ReactLiveTimeProps, Localization } from './interfaces';

import Formatter from './formatter';

import {
  FORMAT,
  getStatusFromTime,
  getTimeoutFromStatus,
  textSetter,
  diffSetter
} from './util';

function ReactLiveTime(props: ReactLiveTimeProps): FunctionComponent {
  const {
    time,
    format = FORMAT,
    showSeconds = false,
    renderer,
    id,
    className,
    style,
    prefix,
    suffix
  } = props;
  const setCompText = textSetter(
    Formatter,
    prefix || ReactLiveTime.prefix,
    suffix || ReactLiveTime.suffix,
    ReactLiveTime.localization || LOCALIZATION
  );
  const [diff, setDiff] = useState(diffSetter(time));
  const [status, setStatus] = useState(getStatusFromTime(diff));
  const [text, setText] = useState(setCompText(diff, time, status, format));

  useEffect(() => setDiff(diffSetter(time)), [time, showSeconds]);
  useEffect(() => setStatus(getStatusFromTime(diff, showSeconds)), [
    diff,
    showSeconds
  ]);
  useEffect(() => {
    setText(setCompText(diff, time, status, format));
  }, [status, diff, format]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiff(diffSetter(time));
    }, getTimeoutFromStatus(status));
    return () => clearTimeout(timer);
  }, [diff]);

  return renderer ? (
    renderer({ time, status, diff, format, text })
  ) : (
    <span id={id} className={className} style={style}>
      {text}
    </span>
  );
}

namespace ReactLiveTime {
  export let localization: Localization = LOCALIZATION;
  export let prefix: string = '';
  export let suffix: string = '';
}

export function setLocale(locale: Object) {
  ReactLiveTime.localization = {
    ...LOCALIZATION,
    ...locale
  };
}

export default ReactLiveTime;
