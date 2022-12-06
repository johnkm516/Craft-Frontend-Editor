import '../styles/app.css';

import CraftEditorClient from "./CraftEditor";

export default async function Page() {
    // Forward fetched data to your Client Component
    return <CraftEditorClient />;
  }