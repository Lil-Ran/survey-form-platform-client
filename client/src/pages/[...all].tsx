import useUser from '@Utils/useUser.tsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate =  useNavigate()
  const {user} = useUser()

  if (user) {
    navigate('/surveymain')
  } else {
    navigate('/login')
  }
}

export default Home
