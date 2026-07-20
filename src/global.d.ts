import type localizedMessages from './messages/ja.json';
import type sharedMessages from './messages/shared.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof sharedMessages & typeof localizedMessages;
  }
}
