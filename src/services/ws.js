// import { useWebSocketApi } from '../composables/useWebSocketApi'
// import { fromSatoshi } from '../utils'
// import { useMessagesStore } from '../store/messages'
//
// const lexicon = {
//   main: 'mainBalance',
//   available: 'availableBalance',
//   trading: 'tradeBalance',
//   trading_available: 'tradingAvailable'
// }
//
// const updateProfit = (referrals, id, newProfit) => {
//   for (const referral of referrals) {
//     if (referral.id === id) {
//       referral.profit = newProfit
//       return true // Найден и обновлён, выходим
//     }
//
//     if (
//       referral.referrals?.length &&
//       updateProfit(referral.referrals, id, newProfit)
//     ) {
//       return true // Если нашли в глубине, прекращаем поиск
//     }
//   }
//
//   return false // ID не найден
// }
//
// export function useWebSockets() {
//   const userStore = useUserStore()
//   const signalsStore = useSignalsStore()
//   const messagesStore = useMessagesStore()
//   const wsApi = useWebSocketApi()
//   const subNotifications = (obj) => {
//     if (obj?.balance) {
//       const balance = obj.balance
//
//       userStore[lexicon[balance.balanceType]] = balance.balance
//     }
//
//     if (obj?.referral) {
//       const res = obj.referral
//
//       updateProfit(userStore.referrals, res.id, res.profit)
//     }
//
//     if (obj?.proposal) {
//       const res = obj.proposal
//
//       if (res.updateType === 'new') {
//         signalsStore.proposedSignals.push({
//           id: res.id,
//           code: res.code,
//           risk: res.risk,
//           profitability: res.profitability,
//           estimatedTime: res.estimatedTime,
//           amount: res.amount
//         })
//       }
//
//       if (res.updateType === 'delete') {
//         signalsStore.proposedSignals = signalsStore.proposedSignals.filter(
//           (item) => item.id !== res.id
//         )
//       }
//     }
//
//     if (obj?.signal) {
//       const res = obj.signal
//
//       if (res.updateType === 'new') {
//         signalsStore.workingSignals.push({
//           id: res.id,
//           code: res.code,
//           signalId: res.signalId,
//           risk: res.risk,
//           profitability: res.profitability,
//           estimatedTime: res.estimatedTime,
//           amount: res.amount,
//           progress: res.progress
//         })
//       }
//
//       if (res.updateType === 'update') {
//         signalsStore.workingSignals = signalsStore.workingSignals.map(
//           (item) => {
//             if (item.id === res.id) {
//               return {
//                 id: item.id,
//                 code: item.code,
//                 signalId: item.signalId,
//                 risk: item.risk,
//                 profitability: item.profitability,
//                 estimatedTime: item.estimatedTime,
//                 amount: item.amount,
//                 progress: res.progress
//               }
//             } else {
//               return item
//             }
//           }
//         )
//       }
//
//       if (res.updateType === 'delete') {
//         signalsStore.workingSignals = signalsStore.workingSignals.filter(
//           (item) => item.id !== res.id
//         )
//
//         messagesStore.systemNotificationModal(fromSatoshi(res.profit))
//       }
//     }
//   }
//
//   async function subscribeNotifications() {
//     wsApi.subscribe(subNotifications)
//   }
//
//   async function unsubscribeNotifications() {
//     wsApi.unsubscribe(subNotifications)
//   }
//
//   return { subscribeNotifications, unsubscribeNotifications }
// }
