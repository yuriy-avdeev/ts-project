import Vue from 'vue'
import Vuex, { StoreOptions, GetterTree, ModuleTree } from 'vuex'
import avatar from '../assets/images/avatar.png'
import { apiModule, apiState } from './apiModule'

Vue.use(Vuex)

type LinkType = {
  name: string
  routeName: string
}

type UserDataType = {
  name: string
  avatar: string
  level: string
}

export type State = {
  // apiModule: apiState
  messages: string[]
  isLaptopScreen: boolean
  linkList: LinkType[]
  user: UserDataType
}


const store: StoreOptions<State> = ({
  modules: <ModuleTree<State>> { apiModule },

  state: ()  => ({
    messages: ['first', 'second'],
    isLaptopScreen: true,

    linkList: [
      {
        name: 'My teams',
        routeName: 'main-route',
      },
      {
        name: 'About',
        routeName: 'about',
      },
    ],

    user: {
      name: 'RichyRich',
      avatar,
      level: 'Level 5',
    },
  }),

  mutations: {
    handleChangingScreen(state, isUsedLaptop) {
      state.isLaptopScreen = isUsedLaptop
    },
  },

  getters: <GetterTree<State, State>> {
    userData: (state) => state.user,
    messagesNumber: (state) => state.messages.length,
    isLaptopScreen: (state) => state.isLaptopScreen,
    linkList: (state) => state.linkList,
  },
})

export default new Vuex.Store(store)
