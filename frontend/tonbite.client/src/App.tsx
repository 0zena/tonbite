import "./App.scss"

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { NextUIProvider } from "@nextui-org/react";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";

function App() {
  return (
      <AuthProvider>
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json">
            <NextUIProvider>
                <AppRouter />
            </NextUIProvider>
        </TonConnectUIProvider>
      </AuthProvider>
  )
}

export default App
