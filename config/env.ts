import dotenv from 'dotenv'
import { z } from 'zod'

const output = dotenv.config()

const envSchema = z.object({
  BASE_URL: z.string().url(),
  MAX_WORKERS: z.coerce.number().min(1).max(10),
  TEST_USER_EMAIL: z.string().email(),
  TEST_USER_PASSWORD: z.string().min(8),
  DEFAULT_NAVIGATION_TIMEOUT: z.coerce.number().min(1000).max(30000),
  ALLURE_RESULTS_DIR: z.string().default('./allure-results'),
  PLAYWRIGHT_HTML_REPORT: z.string().default('./playwright-report'),
})

const env = envSchema.parse(output.parsed)

export default env
