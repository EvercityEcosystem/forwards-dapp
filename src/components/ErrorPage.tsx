import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-cyan-300 via-orange-200 to-fuchsia-400 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-large bg-black px-8 pb-10 pt-6 shadow-large">
        <section className="bg-black">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-3xl text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-white-900 md:text-4xl text-gray-400">Something's missing.</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
              <Button
                href="/app"
                as={Link}
                color="primary"
                variant="solid"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ErrorPage;