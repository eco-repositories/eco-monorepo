import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from './store/store.ts'
import { Home } from './modules/home/home.tsx'
import { PageNotFound } from './modules/page-not-found/page-not-found.tsx'
import { Loader } from './modules/common/loader/loader.tsx'

export const App: React.FC = () => {
  const isLoading = useSelector((state) => state.app.loading)

  if (isLoading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
