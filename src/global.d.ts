import type sharedMessages from "./messages/shared.json"
import type localizedMessages from "./messages/ja.json"

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof sharedMessages & typeof localizedMessages
  }
}
