import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from './store'
import { Home } from './modules/home'
import { PageNotFound } from './modules/page-not-found'
import { Loader } from './modules/common/loader/loader'

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
