import React from 'react';
import { withBaseLayout } from './../Hoc/BaseLayout';

function ChatCreateView() {
  return (
    <>
        <h1></h1>
    </>
  );
}

export default withBaseLayout(ChatCreateView, {canGoBack: true})