import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

export default function Home() {
  const [auth] = useLocalStorage('auth', {});

  if (auth?.user?.id) {
    return <Navigate to='/dashboard' replace={true} />;
  }

  return (
    <div className="h-screen bg-red-700 text-white flex flex-col items-center p-4 space-y-6">
      {/* p-4 space-y-6 */}
      < header className="container flex justify-center max-w-5xl p-4" >
        <img src='./imgs/logo-fundo-vinho.svg' className="w-40" />
      </header >

      <div className="container max-w-5xl flex-1 p-4 flex flex-col justify-center items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="md:flex-1 flex justify-center">
          <img src="./imgs/photo.png" className="w-full max-w-md" />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-3xl text-center font-bold md:text-left">Make your predictions - Qatar 2022!</h1>

          <a href="/signup" className="text-center text-red-700 bg-white text-xl
          px-8 py-4 rounded-xl">Create an account</a>

          <a href="/login" className="text-center text-white border border-white text-xl px-8 py-4 rounded-xl">Login</a>
        </div>
      </div>
    </div >
  );
}