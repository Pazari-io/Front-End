import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AvaxPrice(props) {
  if (!props.usd) {
    const { data, error } = useSWR('/api/ticker', fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
      <div className="flex items-center justify-center font-bold text-gray-400 dark:text-gray-300 ">
        <img
          className="w-6 h-6"
          src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"
        />
        <p className="px-1">${data['data']}</p>
      </div>
    );
  } else {
    const { data, error } = useSWR('/api/ticker/?usd=' + props.usd, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
      <div className="flex items-center justify-center font-bold dark:text-gray-300 ">
        <img
          className="w-4 h-4"
          src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"
        />
        <p className="px-1">{data['data']}</p>
      </div>
    );
  }
}
