import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { ToastContainer } from "react-toastify";

const network = process.env.REACT_APP_NETWORK || "devnet";

function App() {
  const endpoint = useMemo(() => clusterApiUrl(network as Cluster), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SlopeWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div
              style={{ height: '100vh' }}
              className="d-flex justify-content-center align-items-center"
            >
              <WalletMultiButton />
            </div>
          </WalletModalProvider>
          <ToastContainer autoClose={1500} />
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
