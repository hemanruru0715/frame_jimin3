import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { ImageResponse } from "@vercel/og";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'MyStats/🔎',
    },
    {
      action: 'link', 
      label: '🔄Share', 
      target: 'https://warpcast.com/~/compose?text=Check your Moxie Stats. Frame created by @hemanruru&embeds[]=https://hemanruru-moxiestat.vercel.app' 
    },
  ],
  image: {
    //src: `${NEXT_PUBLIC_URL}/mainImage.png`,
    src: `${NEXT_PUBLIC_URL}/api/mainog?cache_burst=${Math.floor(Date.now() / 1000)}`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?cache_burst=${Math.floor(Date.now() / 1000)}`,
});


export const metadata: Metadata = {
  title: 'hemanruru-moxiestat.vercel.app',
  description: 'LFG',
  metadataBase: new URL('https://hemanruru-moxiestat.vercel.app'),  // 기본 URL 설정
  openGraph: {
    title: 'hemanruru-moxiestat.vercel.app',
    description: 'Check the MOXIE stats',
     images: [`${NEXT_PUBLIC_URL}/thanksgiving_day.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>hemanruru-moxiestat.vercel.app</h1>
    </>
  );
}
