"use client";

import HomeView from '@/views/home/HomeView';
import { EditorPaneProvider } from '@/views/home/EditorPaneContext';

export default function Home() {
  return (
    <EditorPaneProvider>
      <HomeView />
    </EditorPaneProvider>
  );
}
