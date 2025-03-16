import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const Spinner = () => (
  <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
);

export default function LoadingPage() {
  return (
    <Theme>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col items-center animate-fade-in">
          <Spinner />
          <h1 className="mt-4 text-3xl font-bold">Loading...</h1>
          <p className="mt-2 text-lg text-gray-400">Please wait while we prepare things for you.</p>
        </div>
      </div>
    </Theme>
  );
}
