import { Theme, Spinner } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import '@radix-ui/themes/styles.css';

export default function LoadingPage() {
  return (
    <Theme>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Spinner size="3" className="w-16 h-16" />
          <h1 className="mt-4 text-3xl font-bold">Loading...</h1>
          <p className="mt-2 text-lg text-gray-400">Please wait while we prepare things for you.</p>
        </motion.div>
      </div>
    </Theme>
  );
}
