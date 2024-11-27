import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { TooltipProvider } from './components/ui/tooltip'
import './App.css'
import './index.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Shipments from './pages/Shipments'
import Locations from './pages/Locations'
import Events from './pages/Events'
import Carrier from './pages/Carrier'
import Users from './pages/Users'
import Prices from './pages/PriceList'
import Units from './pages/Units'
import Providers from './pages/Providers'
import ErrorBoundary from '@/components/ErrorBoundary'
import Receipt from './pages/Receipt'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'shipments',
        element: <Shipments />
      },
      {
        path: 'locations',
        element: <Locations />
      },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'carrier',
        element: <Carrier />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'prices',
        element: <Prices />
      },
      {
        path: 'units',
        element: <Units />
      },
      {
        path: 'providers',
        element: <Providers />
      },
      {
        path: 'receipt',
        element: <Receipt />
      }
    ]
  }
])

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)
