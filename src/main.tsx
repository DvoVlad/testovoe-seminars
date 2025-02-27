import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.tsx'
import { RootStoreContext } from './service/root-store-context.ts'
import { RootStore } from './service/root-store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreContext.Provider value={new RootStore()}>
      <App />
    </RootStoreContext.Provider>
  </StrictMode>,
)
