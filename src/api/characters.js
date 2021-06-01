import { gql } from '@apollo/client/core'

import client from '../client'

async function getPageOfCharacters(pageNum) {
  const response = await client.query({
    query: gql`
      query ($page: Int) {
        characters(page: $page) {
          results {
            id
            name
            species
            gender
            image
            episode {
              id
              name
              episode
            }
          }
        }
      }
    `,
    variables: {
      page: pageNum,
    },
  })
  return response.data.characters.results
}

async function getCharacters() {
  const results = await Promise.allSettled([
    getPageOfCharacters(1),
    getPageOfCharacters(2),
    getPageOfCharacters(3),
    getPageOfCharacters(4),
    getPageOfCharacters(5),
  ])

  return results.flatMap(r => r.value)
}

export {
  getCharacters,
}
