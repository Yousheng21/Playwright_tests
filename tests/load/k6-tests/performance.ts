import { check, sleep } from 'k6'
import http from 'k6/http'
import { Rate } from 'k6/metrics'

import { pagesUrl } from '../../../constants/pagesUrl'

const failureRate = new Rate('failed_requests')

export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Разогрев до 20 пользователей
    { duration: '3m', target: 20 }, // Удержание нагрузки
    { duration: '1m', target: 0 }, // Плавное снижение до 0
  ],
  thresholds: {
    failed_requests: ['rate<0.1'], // Менее 10% ошибок
    http_req_duration: ['p(95)<500'], // 95% запросов быстрее 500ms
  },
}

export default function () {
  const checkLoadPage = (urls: string[]) => {
    for (const url of urls) {
      const response = http.get(`${__ENV.BASE_URL}${url}`)

      check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
      })

      failureRate.add(response.status !== 200)

      sleep(1)
    }
  }

  checkLoadPage(pagesUrl)
}
