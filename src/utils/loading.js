import store from '../store'

export function startLoading () {
  store.state.loading = true
}

export function closeLoading () {
  store.state.loading = false
}
