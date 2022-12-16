import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useAsyncFn, useLocalStorage } from 'react-use';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Icon, Card, DateSelect } from '~/components';

export const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const [auth, setAuth] = useLocalStorage('auth', {});

  const [{ value: user, loading, error }, fetchPredictions] = useAsyncFn(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${params.username}`
    });

    const predictions = res.data.predictions.reduce((acc, prediction) => {
      acc[prediction.gameId] = prediction;
      return acc;
    }, {});

    return {
      ...res.data,
      predictions
    };
  });

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    });

    return res.data;
  });

  const logout = () => {
    setAuth({});
    navigate('/login');
  };

  const isLoading = games.loading || loading;
  const hasError = games.error || error;
  const isDone = !isLoading && !hasError;

  useEffect(() => {
    fetchPredictions();
  }, []);

  useEffect(() => {
    fetchGames({ gameTime: currentDate });
  }, [currentDate]);

  return (
    <>
      <header className="bg-red-500 text-white">
        <div className="container max-w-3xl p-4 flex justify-between items-center">
          <img src='./imgs/logo-fundo-vermelho.svg' className="w-28 md:w-40" />

          {auth?.user?.id && (
            <div onClick={logout} className='p-2 cursor-pointer'>
              Log out
            </div>
          )}
        </div>
      </header>

      <main className='space-y-6'>
        <section id='header' className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-2 p-4">
            <a href="/dashboard">
              <Icon name='backArrow' className='w-10' />
            </a>

            <h3 className='text-2xl font-bold'>{user?.name}</h3>
          </div>
        </section>

        <section id='content' className='container max-w-3xl p-4 space-y-4'>
          <h2 className='text-red-500 text-xl font-bold'>Your predictions</h2>

          <DateSelect currentDate={currentDate} onChange={setDate} />

          <div className='space-y-4'>
            {isLoading && 'Loading games...'}
            {hasError && 'Oops! Something went wrong...'}

            {isDone && games.value?.map(game => (
              <Card
                key={game.id}
                gameId={game.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                gameTime={format(new Date(game.gameTime), 'H:mm')}
                homeTeamScore={user?.predictions?.[game.id]?.homeTeamScore || ''}
                awayTeamScore={user.predictions?.[game.id]?.awayTeamScore || ''}
                disabled={true}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};