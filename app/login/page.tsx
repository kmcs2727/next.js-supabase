import { signIn, signOut } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import React from 'react';
import { currentUser } from '../data/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();

  if(user) {
    redirect("/mypage");
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">LOGIN</h1>

      {user && <p>{JSON.stringify(user)}</p>}

      <form action={signIn}>
        <Button variant={'outline'}>ログイン</Button>
      </form>
    </div>
  )
}

