import { useState, useEffect } from 'react';

function useFetchBalance(accountId: string) {
  const [balance, setBalance] = useState<{
    hBars: number,
    tokens: object[]
  } | null>(null);
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
        if(!data) {
          throw new Error(`Error loading balance`);
        }
        const balance = Number((data.balance.balance || 0) / (10 ** 9)).toFixed(2);

        setBalance({
          hBars: balance,
          tokens: data.balance.tokens
        });
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
