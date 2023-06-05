import { useLocation } from 'react-router-dom'

export const PageNotFound: React.FC = () => {
  const location = useLocation()

  return (
    <span>
      Error: the path <code>{location.pathname}</code> does not exist.
    </span>
  )
}
