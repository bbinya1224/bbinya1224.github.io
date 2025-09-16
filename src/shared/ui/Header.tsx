import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-4 px-8 bg-gray-100 border-b'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>My GitHub Blog</h1>
      </Link>
    </header>
  );
}
