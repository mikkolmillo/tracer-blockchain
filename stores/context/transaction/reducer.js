export const defaultNetworkState = {
  network: '',
  chain: ''
}

const NetworkReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_TESTNET':
      return {
        ...state,
        network: action.payload.network
      }

    case 'SWITCH_MAINNET':
      return {
        ...state,
        network: action.payload.network
      }

    case 'SWITCH_CHAIN':
      return {
        ...state,
        chain: action.payload.chain
      }

    default:
      return {
        ...state
      };
  }
}

export default NetworkReducer