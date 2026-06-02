import { reactive } from 'vue'
import { retryFailedQueries } from '../services/query-client';

const COLD_DOWN_TIME = 30_000;

export const store = reactive({
  rateLimitReached: false,
  onRateLimitReached(){
    this.rateLimitReached = true;
    setTimeout(() => this.resetRateLimit(), COLD_DOWN_TIME)
  },
  resetRateLimit(){
    this.rateLimitReached = false;
    retryFailedQueries();
  }
})