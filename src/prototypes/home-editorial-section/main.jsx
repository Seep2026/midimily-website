import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomeEditorialSectionPrototype } from './HomeEditorialSectionPrototype';
import './home-editorial-section-prototype.css';

createRoot(document.getElementById('home-editorial-section-prototype-root')).render(
  <React.StrictMode>
    <HomeEditorialSectionPrototype />
  </React.StrictMode>,
);
