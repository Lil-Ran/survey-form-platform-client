import api from "@Api"
import { useNavigate } from "react-router"
import { showNotification } from '@mantine/notifications'

const useUser = () => {
  const navigate = useNavigate()

  const {
    data: user,
    error,
    mutate,
  } = api.account.useAccountProfileList({
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onErrorRetry: () => {
      void mutate(undefined, false)
      void navigate('/')
      showNotification({
        color: 'red',
        message: '未登录或登录已过期',
      })
    },
  })

  return { user, error, mutate }
}

export default useUser
