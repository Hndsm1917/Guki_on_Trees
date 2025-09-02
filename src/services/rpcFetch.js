import fetchClient from '@/composables/useFetchClient'
import { BASE_URL } from '@/configs/global.js'

const RPC_BASE_URL = BASE_URL + '/call/client'

// ========== User ==========

// export async function getProfile(): Promise<UserProfile> {
//   const userStore = useUserStore()
//   const res = await fetchClient({
//     baseUrl: RPC_BASE_URL,
//     endpoint: '/getProfile'
//   })
//
//   userStore.profile = res.data
//
//   return res.data
// }
