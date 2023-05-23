import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from './store/index.js'
import { Home } from './modules/home/index.js'
import { PageNotFound } from './modules/page-not-found/index.js'
import { Loader } from './modules/common/loader/loader.js'

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
