import { Center, Loader, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import 'dayjs/locale/zh'
import { FC, Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'
import { useRoutes } from 'react-router-dom'
// import { SWRConfig } from 'swr'
import routes from '~react-pages'
// import ErrorFallback from '@Components/ErrorFallback'
// import { useCustomTheme } from '@Utils/ThemeOverride'
// import { useBanner, localCacheProvider } from '@Utils/useConfig'
// import { fetcher } from '@Api'
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
          <Suspense
            fallback={
              <Center h="100vh" w="100vw">
                <Loader />
              </Center>
            }
          >
            {useRoutes(routes)}
          </Suspense>
          {/* </SWRConfig> */}
        </ModalsProvider>
      </DatesProvider>
      {/*</ErrorBoundary>*/}
    </MantineProvider>
  )
}

export default App