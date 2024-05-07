import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { currentUser } from '@/app/data/auth';
import { signOut } from '@/actions/auth';

export default async function Header() {
  const user = await currentUser();
  return (
    <header className="h-16 border-b gap-3 px-6 flex items-center">
      <Button asChild variant="ghost" className="font-bold text-xl">
        <Link href="/">LOGO</Link>
      </Button>
      <Button asChild variant="ghost" className='font-bold'>
        <Link href="/items">商品一覧</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/mypage">マイページ</Link>
      </Button>

      <span className="flex-1"></span>

      {user ? (
        <form action={signOut}>
          <Button variant={'outline'}>ログアウト</Button>
        </form>
      ): (
        <Button asChild variant={'outline'}>
          <Link href="/login">ログイン</Link>
        </Button>
      )}
    </header>
  );
}
