export interface ReactLiveTimeProps {
  time: Date | number;
  format: string = 'D MMM YYY';
  renderer?: Function;
  showSeconds?: boolean;
  prefix: string = '';
  suffix: string = '';
  id?: string;
  className?: string;
  style?: object;
}

export interface Localization {
  justNow: string;
  seconds: string;
  minutes: string;
  hours: string;
  days: string[];
  months: string[];
  meridians: string[];
}
