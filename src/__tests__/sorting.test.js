import { mount } from '@vue/test-utils'
import App from '../App.vue'

jest.mock('../api/characters')

let wrapper

beforeEach(async () => {
  wrapper = mount(App)
})

test('Overview shows default sort on startup', async () => {
  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names[0]).toEqual('Rick Sanchez')
  expect(names[names.length - 1]).toEqual('Bubonic Plague')
})

test('Overview can be sorted by ascending name', async () => {
  await wrapper.get('.controls__sort-selector').setValue('name')
  await wrapper.get('#asc').setValue(true)

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names[0]).toEqual('Abadango Cluster Princess')
  expect(names[names.length - 1]).toEqual('Tuberculosis')
})

test('Overview can be sorted by descending name', async () => {
  await wrapper.get('.controls__sort-selector').setValue('name')
  await wrapper.get('#desc').setValue(true)

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names[0]).toEqual('Tuberculosis')
  expect(names[names.length - 1]).toEqual('Abadango Cluster Princess')
})

test('Overview can be sorted by ascending episode', async () => {
  await wrapper.get('.controls__sort-selector').setValue('first episode')
  await wrapper.get('#asc').setValue(true)

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names[0]).toEqual('Rick Sanchez')
  expect(names[names.length - 1]).toEqual('Baby Poopybutthole')
})

test('Overview can be sorted by descending episode', async () => {
  await wrapper.get('.controls__sort-selector').setValue('first episode')
  await wrapper.get('#desc').setValue(true)

  const names = wrapper.findAll('.card__name').map(n => n.text())
  expect(names[0]).toEqual('Alien Googah')
  expect(names[names.length - 1]).toEqual('Davin')
})
