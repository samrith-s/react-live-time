import { Localization } from './interfaces';

export default function Formatter(
  locale: Localization,
  dateValue: string | number | Date,
  format: string
): string {
  const { months, days, meridians } = locale;
  const date: Date = new Date(dateValue);
  const regexp: RegExp = /(Y+)|(M+)|(D+)|(d+)|(h+)|(m+)|(s+)|(a+)|(A+)/g;
  const replaceKeys = replacer(date, months, days, meridians);
  const matches = format.match(regexp) || [];
  const replaced: Object = {};

  const deducedFormat = matches
    .reduce((acc, key, index) => {
      replaced[acc.indexOf(key) + index] = replaceKeys(key);
      return acc.replace(key, '');
    }, format)
    .split('');

  Object.entries(replaced).forEach(
    ([index, value]): void => {
      deducedFormat.splice(parseInt(index, 10), 0, value);
    }
  );

  return deducedFormat.join('');
}

function replacer(
  date: Date,
  months: string[],
  days: string[],
  meridian: string[]
): Function {
  return function(key: string): number | string {
    switch (key) {
      case 'D': {
        return date.getDate().toString();
      }

      case 'DD': {
        return leadingZeros(date.getDate());
      }

      case 'd': {
        return days[date.getDate()].charAt(0);
      }

      case 'dd': {
        return days[date.getDate()].substr(0, 2);
      }

      case 'ddd': {
        return days[date.getDay()].substr(0, 3);
      }

      case 'dddd': {
        return days[date.getDay()];
      }

      case 'M': {
        return date.getMonth().toString();
      }

      case 'MM': {
        return leadingZeros(date.getMonth());
      }

      case 'MMM': {
        return months[date.getMonth()].substr(0, 3);
      }

      case 'MMMM': {
        return months[date.getMonth()];
      }

      case 'YY': {
        return date
          .getFullYear()
          .toString()
          .substring(2);
      }

      case 'YYY': {
        return `'${date
          .getFullYear()
          .toString()
          .substring(2)}`;
      }

      case 'YYYY': {
        return date.getFullYear().toString();
      }

      case 'H': {
        return date.getHours().toString();
      }

      case 'HH': {
        return leadingZeros(date.getHours());
      }

      case 'h': {
        return getTwelveHours(date.getHours());
      }

      case 'hh': {
        return leadingZeros(getTwelveHours(date.getHours()));
      }

      case 'm': {
        return date.getMinutes();
      }

      case 'mm': {
        return leadingZeros(date.getMinutes());
      }

      case 's': {
        return date.getSeconds();
      }

      case 'ss': {
        return leadingZeros(date.getSeconds());
      }

      case 'a': {
        return getMeridian(date, meridian, false);
      }

      case 'A': {
        return getMeridian(date, meridian, true);
      }

      default: {
        return key;
      }
    }
  };
}

function leadingZeros(value: number): string {
  return value < 10 ? `0${value}` : value.toString();
}

function getTwelveHours(value: number): number {
  if (value < 12) {
    return value + 1;
  }

  if (value > 12) {
    return value - 12;
  }

  return value;
}

function getMeridian(date: Date, meridians: string[], isCaps: boolean): string {
  const value = date.getHours() < 12 ? meridians[0] : meridians[1];
  return isCaps ? value.toUpperCase() : value.toLowerCase();
}
