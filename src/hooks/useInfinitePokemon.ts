import { useInfiniteQuery } from '@tanstack/react-query'
import type { QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'

export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}

// ✅ Correctly typed fetch function
const fetchPokemon = async ({ pageParam }: QueryFunctionContext): Promise<PokemonListResponse> => {
  const url = typeof pageParam === 'string' ? pageParam : 'https://pokeapi.co/api/v2/pokemon'
  const response = await axios.get(url)
  return response.data
}

// ✅ Correct infinite query hook
export const useInfinitePokemon = () =>
  useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon',
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  })
