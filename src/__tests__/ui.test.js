import { mount } from '@vue/test-utils'
import App from '../App.vue'

jest.mock('../api/characters')

let wrapper

beforeEach(async () => {
  wrapper = mount(App)
})

test('Overview is displaying name', async () => {
  const name = wrapper.get('.card__name').text()
  expect(name).toEqual('Rick Sanchez')
})

test('Overview is displaying species', async () => {
  const species = wrapper.get('.card__type').text().toLowerCase()
  expect(species).toContain('human')
})

test('Overview is displaying gender', async () => {
  const gender = wrapper.get('.card__type').text().toLowerCase()
  expect(gender).toContain('male')
})

test('Overview is displaying episodes', async () => {
  const episodes = wrapper.get('.card__episodes').findAll('.card__episode')
  expect(episodes.length).toEqual(41)
  expect(episodes[0].text()).toEqual('S01E01')
})

test('Overview is displaying image', async () => {
  const imageSrc = wrapper.get('.card__image').attributes().src
  expect(imageSrc).toEqual('https://rickandmortyapi.com/api/character/avatar/1.jpeg')
})
