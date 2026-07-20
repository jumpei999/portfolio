'use client';

import NextError from 'next/error';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
