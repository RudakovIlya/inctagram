import 'app/styles/index.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { appWithTranslation } from 'next-i18next'
import AdminMenu from 'shared/ui/AdminMenu/AdminMenu'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { type ReactElement, useState } from 'react'
import { type NextPage } from 'next'
import { QueryClient } from '@tanstack/query-core'
import { useLoader } from 'app/hooks/use-loader'
import 'app/styles/nprogress.scss'
import { AuthRedirect } from 'features/authorization'

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App ({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = useState(() => new QueryClient())
    useLoader()

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {getLayout(
                    <AuthRedirect>
                        <AdminMenu/>
                        <Hydrate state={pageProps.dehydrateState}>
                            <Component {...pageProps} />
                        </Hydrate>
                    </AuthRedirect>
                )}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default appWithTranslation(App)
