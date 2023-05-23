import { useLocation } from 'react-router-dom'

export const PageNotFound: React.FC = () => {
  const location = useLocation()

  return (
    <span>Error: location {location.pathname} does not exist.</span>
  )
}
