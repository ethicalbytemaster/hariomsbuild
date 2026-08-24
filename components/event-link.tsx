'use client';

import Link, { type LinkProps } from 'next/link';
import { track } from '@vercel/analytics';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type EventLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  children: ReactNode;
};

export function EventLink({ event, children, onClick, ...props }: EventLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
