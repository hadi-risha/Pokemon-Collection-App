import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export const useInfinitePokemon = () => {
  return useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${pageParam}`
      )
      return res.data
    },
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.next
      if (!nextUrl) return undefined

      const offsetParam = new URL(nextUrl).searchParams.get('offset')
      return offsetParam ? Number(offsetParam) : undefined
    },
  })
}
