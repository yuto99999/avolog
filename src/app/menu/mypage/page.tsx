"use client";

import Announce from "@/app/components/Menu/Mypage/announce";
import Mypage from "@/app/components/Menu/Mypage/mypage";
import { useAuthContext } from "@/app/provider/authProvider";

export default function Home() {
  const { user } = useAuthContext();

  return <>{user ? <Mypage /> : <Announce />}</>;
}
