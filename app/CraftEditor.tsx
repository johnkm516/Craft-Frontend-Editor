'use client';

//import { CraftDesigner } from "components/CraftDesigner";
import { lazy, Suspense } from "react";
import RingLoader from "react-spinners/RingLoader";

const CraftDesigner = lazy(() => import('components/CraftDesigner'));

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function CraftEditorClient() {

  return(
    <Suspense fallback={(<div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
        <RingLoader color="hsla(222, 100%, 42%, 1)" />
    </div>
    )}>
      <CraftDesigner/>
    </Suspense>
  );
}