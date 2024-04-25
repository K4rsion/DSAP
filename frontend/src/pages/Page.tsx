import React from 'react';

interface PageProps {
  pageId: string;
}

export const Page: React.FC<PageProps> = ({ pageId }) => {
  return <div>{pageId}</div>;
};
