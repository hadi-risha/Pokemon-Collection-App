import { createContext, useContext, useEffect, useState } from 'react'
import { getFromStorage, saveToStorage } from '../utils/localStorage'

const CollectionContext = createContext<any>(null)

export const CollectionProvider = ({ children }: any) => {
    const [collection, setCollection] = useState<any[]>(() => {
        const saved = getFromStorage('collection')
        return Array.isArray(saved) ? saved : []
    })


  // save cleaned collection data
  useEffect(() => {
    try {
        console.log('Saving to localStorage:', collection)
        saveToStorage('collection', collection)
    } catch (e) {
        console.error('Error saving to localStorage:', e)
    }
  }, [collection])

  // extract only the required data for storage
  const addToCollection = (pokemon: any) => {
    if (!collection.find(p => p.id === pokemon.id)) {
      const cleaned = {
        id: pokemon.id,
        name: pokemon.name,
        sprites: {
          front_default: pokemon.sprites.front_default
        },
        types: pokemon.types,
        stats: pokemon.stats
      }
      setCollection(prev => [cleaned, ...prev])
    }
  }

  const isInCollection = (id: number) => {
    return collection.some(p => p.id === id)
  }

  const removeFromCollection = (id: number) => {
    // console.log('Removing ID:', id)
    // console.log('current clctn:', collection)
    setCollection(prev => prev.filter(p => Number(p.id) !== Number(id)))
  }

  return (
    <CollectionContext.Provider
      value={{
        collection,
        addToCollection,
        removeFromCollection,
        setCollection,
        isInCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollection = () => useContext(CollectionContext)
