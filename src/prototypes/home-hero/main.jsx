import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomeHeroPrototype } from './HomeHeroPrototype';
import './home-hero-prototype.css';

createRoot(document.getElementById('home-hero-prototype-root')).render(
  <React.StrictMode>
    <HomeHeroPrototype />
  </React.StrictMode>,
);
