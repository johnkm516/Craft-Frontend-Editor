'use client';

import { useStyledComponentsRegistry } from '../utils/styled-components';
import { useServerInsertedHTML } from 'next/navigation';

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] =
    useStyledComponentsRegistry();

  useServerInsertedHTML(() => {
    console.log(styledComponentsFlushEffect());
    return <>{styledComponentsFlushEffect()}</>;
  });


  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
}