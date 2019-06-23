import dateFormat from 'dateformat';

import { FORMAT, TimeValues, StateValues } from './constants';

export { FORMAT };

export function getStatusFromTime(diff: number, showSeconds?: boolean): string {
  if (diff >= TimeValues.DAY) {
    return StateValues.STATIC;
  }

  if (diff >= TimeValues.HOUR) {
    return StateValues.PER_HOUR;
  }

  if (diff >= TimeValues.MINUTE) {
    return StateValues.PER_MINUTE;
  }

  return showSeconds ? StateValues.PER_SECOND : StateValues.FRESH;
}

export function getTimeoutFromStatus(status: string): number {
  switch (status) {
    default:
    case StateValues.PER_MINUTE: {
      return TimeValues.MINUTE;
    }

    case StateValues.PER_SECOND: {
      return TimeValues.SECOND;
    }

    case StateValues.PER_HOUR: {
      return TimeValues.HOUR;
    }
  }
}

export function getCoefficientFromTime(status: string, diff: number): number {
  const dayDiff = diff % TimeValues.DAY;

  switch (status) {
    default:
    case StateValues.FRESH: {
      return 0;
    }

    case StateValues.PER_SECOND: {
      return Math.floor(
        ((dayDiff % TimeValues.HOUR) % TimeValues.MINUTE) / TimeValues.SECOND
      );
    }

    case StateValues.PER_MINUTE: {
      return Math.floor((dayDiff % TimeValues.HOUR) / TimeValues.MINUTE);
    }

    case StateValues.PER_HOUR: {
      return Math.floor(dayDiff / TimeValues.HOUR);
    }
  }
}

export function textSetter(
  diff: number,
  time: Date | number,
  status: string,
  format?: string
): string {
  const coeff = getCoefficientFromTime(status, diff);

  switch (status) {
    default:
    case StateValues.FRESH: {
      return 'just now';
    }

    case StateValues.PER_SECOND: {
      return pluralize(coeff, 'second', 'ago');
    }

    case StateValues.PER_MINUTE: {
      return pluralize(coeff, 'minute', 'ago');
    }

    case StateValues.PER_HOUR: {
      return pluralize(coeff, 'hour', 'ago');
    }

    case StateValues.STATIC: {
      return dateFormat(time, format);
    }
  }
}

export function timeValueSetter(time: Date | number): number {
  try {
    return new Date(time).getTime();
  } catch (e) {
    throw new Error(e);
  }
}

export function diffSetter(time: Date | number): number {
  const timeValue: number = timeValueSetter(time);
  return Date.now() - timeValue;
}

function pluralize(value: number, text: string, rest: string): string {
  return [value, value === 1 ? text : text + 's', rest].join(' ');
}
