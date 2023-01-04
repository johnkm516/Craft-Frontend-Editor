'use client';

//import { CraftDesigner } from "components/CraftDesigner";
import { lazy, Suspense } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

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
        height: '100vh'
      }}
    >
        <ScaleLoader color="rgba(38, 128, 235, 1)" height="35" width="5" />
    </div>
    )}>
      <CraftDesigner/>
    </Suspense>
  );
}