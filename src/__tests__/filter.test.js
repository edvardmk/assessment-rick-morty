import { mount } from '@vue/test-utils'
import App from '../App.vue'

jest.mock('../api/characters')

let wrapper

beforeEach(async () => {
  wrapper = mount(App)
})

test('Overview is unfiltered on startup', async () => {
  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names.length).toEqual(100)
})

test('Overview can be filtered', async () => {
  const characterName = 'Rick Sanchez'
  await wrapper.get('.controls__filter .controls__selector').setValue(characterName)

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names.length).toEqual(1)
  expect(names[0]).toEqual(characterName)
})

test('Overview filter can be revoked', async () => {
  const characterName = 'Rick Sanchez'
  await wrapper.get('.controls__filter .controls__selector').setValue(characterName)

  // revokes filter
  await wrapper.get('.controls__filter-active + label').trigger('click')

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names.length).toEqual(100)
})
