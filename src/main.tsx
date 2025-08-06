import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CollectionProvider } from './context/CollectionContext' // <- Add this

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CollectionProvider> {/* <-- wrap it here */}
        <App />
      </CollectionProvider>
    </QueryClientProvider>
  </StrictMode>
)
