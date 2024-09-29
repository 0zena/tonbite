import './App.css'

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Header } from './components/header';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json">
      <Header />
    </TonConnectUIProvider>
  )
}

export default App
