import { Localization } from './interfaces';
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
  formatter: Function,
  prefix: string,
  suffix: string,
  locale: Localization
) {
  return function(
    diff: number,
    time: Date | number,
    status: string,
    format: string
  ): string {
    const coeff = getCoefficientFromTime(status, diff);
    const pluralize = pluralizer(prefix, suffix);

    switch (status) {
      default:
      case StateValues.FRESH: {
        return locale.justNow;
      }

      case StateValues.PER_SECOND: {
        return pluralize(coeff, locale.seconds);
      }

      case StateValues.PER_MINUTE: {
        return pluralize(coeff, locale.minutes);
      }

      case StateValues.PER_HOUR: {
        return pluralize(coeff, locale.hours);
      }

      case StateValues.STATIC: {
        return formatter(locale, time, format);
      }
    }
  };
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

function pluralizer(prefix: string = '', suffix: string = ''): Function {
  return function(value: number, text: string): string {
    return [prefix, value, value === 1 ? text : text + 's', suffix].join(' ');
  };
}
