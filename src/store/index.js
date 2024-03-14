import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    id_user: '',
    // id_user: 'UQAFQORzd2DQQnjCyi13qJg8nkz5U0KE-m0On51Wb4yuzuXM',
    // lang_mode: "ENG"
    transactions: [
      {
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 1000,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'TON',
        type_tr: 'Send',
        adress: 'Hes2...Fe3f',
        count: 30,
        color: '#848484',
        img: 'ton-logo.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },{
        type_coin: 'Open',
        type_tr: 'Receive',
        adress: 'Hes2...Fe3f',
        count: 803.2,
        color: '#04B134',
        img: 'logo-white.svg'
      },
    ],
    tokens_balance: {
      'TON': {
        balance: 1234.3,
        current_USD: 1234.3
      },
      'OPEN': {
        balance: 1234.3,
        current_USD: 1234.3
      }
    },
    messageAuth: ''
  },
  getters: {
    getId(state) {
      return state.id_user;
    },
    getLangMode(state) {
      return state.lang_mode;
    },
    getBalance(state) {
      return state.tokens_balance
      // return open.toLocaleString('ru-RU')
    },
    getTransactions(state) {
      return state.transactions
    }
  },
  mutations: {
    addIdUser(state, id) {
      state.id_user = id
    },
    langModeChange(state) {
      if(state.lang_mode === 'ENG') {
        state.lang_mode = 'RU'
      } else {
        state.lang_mode = 'ENG'
      }
    },
    changeBalance(state, ER_list_tokens) {
      for(let i = 0; i < ER_list_tokens.length; i++) {
        state.tokens_balance[ER_list_tokens[i].name].current_USD = ((state.tokens_balance[ER_list_tokens[i].name].balance * ER_list_tokens[i].cost).toFixed(2)).toLocaleString('ru-RU')
      }
    },
    changeTransactions(state, list_tr) {
      state.transactions = list_tr
    },
    consoleLogCnfToken(state, cnfToken) {
      state.messageAuth = cnfToken
    }
  },
  actions: {
    setIdUser(ctx, id) {
      ctx.commit('addIdUser', id)
    },
    switchLang(ctx) {
      ctx.commit('langModeChange')
    },
    async updateBalance(ctx, list_tokens) {
      let commit = []
      list_tokens.forEach(async function(token, index) {
          if(token.name !== 'TON') {
            const result = await axios.get('https://api.dyor.io/api/v3/analytics?currency=jUSDT&lite=1&page=1&pairs=1151&period=all')
            let price_t = result.data["lastPrices"][token.pairs]["price"]["price"]
            commit.push({
              name: token.name,
              cost: price_t
            })
          } else {
            const result = await axios.get('https://tonapi.io/v2/rates?tokens=ton&currencies=usd')
            let price_t = result.data.rates.TON.prices.USD
            commit.push({
              name: token.name,
              cost: price_t
            })
          }
          if(index === list_tokens.length-1) {
            ctx.commit('changeBalance', commit)
          }
      });
    },
    async updateTransactions(ctx, list_transactions) {
      ctx.commit('changeTransactions', list_transactions)
    },
    async getConfirmToken(ctx, token) {
      let bodyToken = {
          "token": token
      }

      const userAuth = (
        await axios.post('http://localhost:8080/UR/confirmToken', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(bodyToken)
        })
        .then(result => {
          return result.json()
        })
      );

      ctx.commit('consoleLogCnfToken', userAuth)
      return userAuth
    },
  },
  modules: {
  }
})
