import { useState, useEffect } from 'react';

function useFetchBalance(accountId: string) {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      const url = `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}`;

      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const balance = Number((data?.balance?.balance || 0) / (10 ** 9)).toFixed(2);

        setBalance(`${balance} HBAR`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (accountId) {
      fetchBalance();
    }
  }, [accountId]);

  return { balance, loading, error };
}

export default useFetchBalance;
