import dateFormat from 'dateformat';

import { FORMAT, TimeValues, StateValues } from './constants';

export { FORMAT };

export function getStatusFromTime(diff: number): string {
  if (diff >= TimeValues.DAY) {
    return StateValues.STATIC;
  }

  if (diff >= TimeValues.HOUR) {
    return StateValues.PER_HOUR;
  }

  if (diff >= TimeValues.MINUTE) {
    return StateValues.PER_MINUTE;
  }

  return StateValues.FRESH;
}

export function getTimeoutFromStatus(status: string): number {
  switch (status) {
    default:
    case StateValues.PER_MINUTE: {
      return TimeValues.MINUTE;
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

    case StateValues.PER_MINUTE: {
      return Math.round(dayDiff / TimeValues.HOUR / TimeValues.MINUTE);
    }

    case StateValues.PER_HOUR: {
      return Math.floor(dayDiff / TimeValues.HOUR);
    }
  }
}

export function getTextFromTimeAndStatus(
  diff: number,
  time: number,
  format?: string
): Function {
  return function(): string {
    const coeff = getCoefficientFromTime(status, diff);

    switch (status) {
      default:
      case StateValues.FRESH: {
        return 'just now';
      }

      case StateValues.PER_MINUTE: {
        if (coeff === 1) {
          return `${coeff} minute ago`;
        }

        return `${coeff} minutes ago`;
      }

      case StateValues.PER_HOUR: {
        if (coeff === 1) {
          return `${coeff} hour ago`;
        }

        return `${coeff} hours ago`;
      }

      case StateValues.STATIC: {
        return dateFormat(time, format);
      }
    }
  };
}

export function setDiff(timeValue: number): Function {
  return function(): number {
    return Date.now() - timeValue;
  };
}
