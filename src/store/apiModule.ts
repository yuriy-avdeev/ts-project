import { ActionContext, Module } from 'vuex'
import axios from 'axios'
import { State } from './index'
import {TeamType} from '../types/types'

export type apiState = {
  teamsList: TeamType[]
  isLoading: boolean
  token: string
}

export const apiModule: Module<apiState, State> = {
  namespaced: true,

  state: (): apiState => ({
    teamsList: [],
    isLoading: false,
    token: 'ef80523b-0474-4104-8fe6-fe92f8360b28',
  }),

  mutations: {
    setLoading(state: apiState, isLoading: boolean): void {
      state.isLoading = isLoading
    },

    setTeamsList(state: apiState, list: TeamType[]): void {
      list.sort((a, b) => {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      })
      state.teamsList = [...list]
    },

    handleSubscription(state: apiState, updatedCard: TeamType): void {
      const idx = state.teamsList.findIndex((c) => c.id === updatedCard.id)
      state.teamsList.splice(idx, 1, updatedCard)
    },
  },

  actions: {
    async fetchTeamsList(context: ActionContext<apiState, State>) {
      try {
        context.commit('setLoading', true) // <- todo: add handler when "isLoading"
        const res = await axios.get(`https://run.mocky.io/v3/${context.state.token}`)
        context.commit('setTeamsList', res.data)
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('setLoading', false)
      }
    },

    async updateCard(context: ActionContext<apiState, State>, updatedCard: TeamType) {
      try {
        context.commit('setLoading', true)
        // mock ->
        return new Promise((resolve) => {
          setTimeout(() => {
            context.commit('handleSubscription', updatedCard)
            resolve('success')
          }, 500)
        })
      } catch (e) {
        console.log(e)
      } finally {
        context.commit('setLoading', false)
      }
    },
  },

  getters: {
    teamsList: (state: apiState) => state.teamsList,
    myTeamsList: (getters) => {
      return getters.teamsList.filter((team: TeamType) => team.is_following)
    },
    isLoading: (state: apiState) => state.isLoading,
  },
}
