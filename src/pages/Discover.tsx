import { useEffect, useRef } from 'react'
import { useInfinitePokemon } from '../hooks/useInfinitePokemon'
import PokemonCard from '../components/PokemonCard'

export interface Pokemon {
  name: string
  url: string
}

const Discover = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfinitePokemon()
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [fetchNextPage, hasNextPage])

  if (isLoading) return <p>Loading...</p>

  return (
  <div className="w-full flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 p-4 w-full max-w-[1000px] place-items-center">
      {data?.pages
        .map(page =>
          page.results.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))
        )
        .flat()}
      <div ref={loaderRef} className="h-10 flex justify-center items-center col-span-full">
        {isFetchingNextPage && <p>Loading more Pokemon...</p>}
      </div>
    </div>
  </div>
)
}

export default Discover
