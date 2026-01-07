import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from './store/store.js'
import { Home } from './modules/home/home.lazy.js'
import { PageNotFound } from './modules/page-not-found/page-not-found.lazy.js'
import { Loader } from './modules/common/loader/loader.js'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Navigate to='/' replace />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])

export const App: React.FC = () => {
  const isLoading = useSelector((state) => state.app.loading)

  if (isLoading) {
    return <Loader />
  }

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
