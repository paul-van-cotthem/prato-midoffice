import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/ThemeProvider'
import { EmployerProvider } from './components/EmployerProvider'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import './i18n'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <EmployerProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </EmployerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
