import pino from 'pino';
import env from './env';

const PinoLevelToSeverityLookup = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warning: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
} as Record<string, string>;

const gcpFormatters = {
  level: (label: string, level: number) => ({
    level,
    severity:
      PinoLevelToSeverityLookup[label] || PinoLevelToSeverityLookup.info,
  }),
  log: (message: Record<string, any>) => ({ message }),
};

const logger = pino({
  formatters: env.NODE_ENV === 'production' ? gcpFormatters : {},
  prettyPrint: env.NODE_ENV === 'development',
  messageKey: 'message',
  level: env.getOptional('LOG_LEVEL', 'debug'),
});

export default logger;
