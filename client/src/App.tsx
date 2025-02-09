import { Center, Loader, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import 'dayjs/locale/zh'
import { FC, Suspense} from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'
import { fetcher } from '@Api'
import { SWRConfig } from 'swr'

const App: FC = () => {
  return (
    <MantineProvider>
      <Notifications zIndex={10000} />
      <DatesProvider settings={{ locale: 'zh' }}>
        <ModalsProvider labels={{ confirm: '确认', cancel: '取消' }}>
          <SWRConfig
            value={{
              refreshInterval: 10000,
              fetcher,
            }}
          >
            <Suspense
              fallback={
                <Center h="100vh" w="100vw">
                  <Loader />
                </Center>
              }
            >
              {useRoutes(routes)}
            </Suspense>
          </SWRConfig>
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  )
}

export default App
