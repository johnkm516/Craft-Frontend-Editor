'use client';

import React, { useEffect, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  
  useServerInsertedHTML(() => {
    console.log("here");
    const styles = styledComponentsStyleSheet.getStyleElement();
    //@ts-ignore
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });
  
  return (
    typeof window !== 'undefined' ? 
    (<>{domLoaded && children}</>) :
    (<>
      {domLoaded && (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
          {children}
        </StyleSheetManager>
      )}
    </>)

  );
}