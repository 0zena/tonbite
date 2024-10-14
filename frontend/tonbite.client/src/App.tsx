import './App.scss'

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import AppRouter from "./router/AppRouter.tsx";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json">
        <AppRouter />
    </TonConnectUIProvider>
  )
}

export default App
