import CollectionList from '../components/CollectionList'
import { useCollection } from '../context/CollectionContext'

const Collection = () => {
  const { collection } = useCollection()

  return (
    <div>
      {collection.length > 0 ? (
        <CollectionList />
      ) : (
        <p className="text-center text-white">Your collection is empty. Add some Pokemon!</p>
      )}
    </div>
  )
}

export default Collection
