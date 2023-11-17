import { ChakraProvider, } from '@chakra-ui/react'
import { Suspense, useMemo, } from 'react'
import { useNavigate, useLocation, Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import HomeView from './views/HomeView'
import customTheme from './styles/Themes'

const RouteAdapter = ({ children }: { children: any }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const adaptedHistory = useMemo(
    () => ({
      replace(location: any) {
        navigate(location, { replace: true, state: location.state })
      },
      push(location: any) {
        navigate(location, { replace: false, state: location.state })
      },
    }),
    [navigate],
  )
  return children({ history: adaptedHistory, location })
}

function App() {
  return (
    <ChakraProvider theme={customTheme}>

      <Suspense fallback="">

        <QueryParamProvider adapter={RouteAdapter as any}>
          <Routes>

            <Route caseSensitive path="/" element={<HomeView />} />

          </Routes>
        </QueryParamProvider>

      </Suspense>

    </ChakraProvider>
  )
}

const ContainerApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default ContainerApp
