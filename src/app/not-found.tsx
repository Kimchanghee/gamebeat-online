import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">404: Page not found</h1>
      <p className="mt-4">The page you requested could not be found.</p>
      <Link className="mt-6 underline" href="/">
        Go to homepage
      </Link>
    </main>
  );
}
