import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
// shallowMount - монтир. компонент без рендеринга его дочерних компонентов
import UiInput from '@/components/UI/UiInput.vue'
import UiButton from '@/components/UI/UiButton.vue'
import CardSearched from '@/components/CardSearched.vue'
import Vuex from 'vuex'
import { apiModule } from '../../src/store/apiModule'

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('UiInput.vue', () => {
  test('displays message', async () => {
    const wrapper = mount(UiInput)
    const input = wrapper.find('input')
    await input.setValue('+++++')
    const text = wrapper.find('p')
    expect(text.text()).toContain('Invalid characters in the field')
  })
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('UiButton.vue', () => {
  test('displays button-text', () => {
    const wrapper = mount(UiButton, {
      propsData: {
        isActive: false,
      },
    })
    // wrapper.vm.$emit('clickButton', wrapper.vm)
    // console.log(wrapper.emitted().clickButton)
    expect(wrapper.html()).toContain('FOLLOW')
    wrapper.find('button').trigger('click')
  })
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const localVue = createLocalVue()
localVue.use(Vuex)

describe('CardSearched.vue', () => {
  let actions: any
  let store: any

  beforeEach(() => {
    actions = {
      updateCard: jest.fn(),
    }
    
    store = new Vuex.Store({
      modules: {
        apiModule: {
          state: apiModule.state, // работает и без стейта
          actions, // заглушка выше
          getters: apiModule.getters, // работает и без геттера
          namespaced: true // - т.к. модуль
        },
      },
    })
  })

  test('action after click child - UiButton', () => {
    const wrapper = shallowMount(CardSearched, {
      store,
      localVue,
      // propsData: {
      //   card: {
      //     is_following: true,
      //     id: 111,
      //     name: 'cardMock',
      //   },
      // },
    })

    wrapper.findComponent(UiButton).vm.$emit('clickButton')
    expect(actions.updateCard).toHaveBeenCalled()
  })
})
