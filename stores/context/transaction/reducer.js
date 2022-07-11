export const defaultNetworkState = {
  network: '',
}

const NetworkReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_TESTNET':
      return {
        ...state,
        network: action.payload
      }

    case 'SWITCH_MAINNET':
      return {
        ...state,
        network: action.payload
      }
  
    default:
      return {
        ...state
      };
  }
}

export default NetworkReducer