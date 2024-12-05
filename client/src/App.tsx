import { Center, Loader, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import 'dayjs/locale/zh'
import { FC, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Login from './pages/login'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

const App: FC = () => {
  // TODO: useBanner()

  // TODO: const { theme } = useCustomTheme()

  return (
    <MantineProvider /* TODO: theme={theme} */>
      {/* TODO: <ErrorBoundary FallbackComponent={ErrorFallback}> */}
      <Notifications zIndex={10000} />
      <DatesProvider settings={{ locale: 'zh' }}>
        <ModalsProvider labels={{ confirm: '确认', cancel: '取消' }}>
          {/* TODO: <SWRConfig
                value={{
                  refreshInterval: 10000,
                  provider: localCacheProvider,
                  fetcher,
                }}
              > */}
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* 其他路由 */}
              {useRoutes(routes)}
            </Routes>
          </Router>
          <Suspense
            fallback={
              <Center h="100vh" w="100vw">
                <Loader />
              </Center>
            }
          >
          </Suspense>
          {/* </SWRConfig> */}
        </ModalsProvider>
      </DatesProvider>
      {/*</ErrorBoundary>*/}
    </MantineProvider>
  )
}

export default App
