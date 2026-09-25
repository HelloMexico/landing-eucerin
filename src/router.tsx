import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import Landing from './routes/Landing.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Landing
      },
      {
        path: 'about',
        Component: () => <div>About</div>
      }
    ]
  }
])
