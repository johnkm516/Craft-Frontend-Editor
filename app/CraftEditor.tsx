'use client';

import { CraftDesigner } from "components/CraftDesigner";

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function CraftEditorClient() {
  return (
    <CraftDesigner/>
  );
}