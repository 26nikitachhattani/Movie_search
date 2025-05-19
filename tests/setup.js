import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create Vuetify instance for testing
const vuetify = createVuetify({ components, directives })
config.global.plugins = [vuetify]

// 🛑 Prevent Vitest from breaking on CSS imports
vi.mock('vuetify/styles', () => ({}))
vi.mock('vuetify/lib/styles/main.css', () => ({}))

// Optional: Mock CSSStyleSheet (if used by Vuetify internals)
vi.stubGlobal('CSSStyleSheet', class {})
vi.mock('@/path/to/your/css', () => ({}))
