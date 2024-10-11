// src/components/ConnectWallet.jsx
import React, { useState, useEffect } from 'react';
import { FaWallet, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ConnectWallet = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [principal, setPrincipal] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Check if Plug is installed and auto-connect if possible
  useEffect(() => {
    if (window.ic && window.ic.plug) {
      // Optional: Auto-connect logic
      // Uncomment the following lines if you want to auto-connect on load
      /*
      window.ic.plug.requestConnect({ whitelist: [] })
        .then(() => window.ic.plug.getPrincipal())
        .then(principalId => {
          setPrincipal(principalId.toText());
          setWalletConnected(true);
        })
        .catch(err => {
          console.error('Auto-connect failed:', err);
        });
      */
    }
  }, []);

  const connectWallet = async () => {
    if (window.ic && window.ic.plug) {
      try {
        // Request connection to Plug Wallet
        await window.ic.plug.requestConnect({ whitelist: [] }); // Add canisters if needed
        const principalId = await window.ic.plug.getPrincipal();
        setPrincipal(principalId.toText());
        setWalletConnected(true);
        setError('');
      } catch (err) {
        console.error('Connection failed:', err);
        setError('Failed to connect wallet. Please try again.');
        setShowError(true);
      }
    } else {
      setError('Plug Wallet is not installed. Please install it from https://plugwallet.ooo/');
      setShowError(true);
    }
  };

  const disconnectWallet = () => {
    if (window.ic && window.ic.plug) {
      window.ic.plug.disconnect();
      setWalletConnected(false);
      setPrincipal('');
    }
  };

  const handleCloseError = () => {
    setShowError(false);
    setError('');
  };

  return (
    <div className="flex flex-col items-center">
      {/* Connect Wallet Button */}
      {!walletConnected ? (
        <button
          onClick={connectWallet}
          className="btn btn-primary flex items-center space-x-2"
        >
          <FaWallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>
      ) : (
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <FaCheckCircle className="w-5 h-5" />
          <span>Connected: {principal}</span>
          <button
            onClick={disconnectWallet}
            className="btn btn-sm btn-outline btn-error ml-2"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* Error Overlay Modal */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 z-60 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Error</h3>
              <button onClick={handleCloseError} className="text-red-500 hover:text-red-700">
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4">{error}</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseError}
                className="btn btn-error btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
