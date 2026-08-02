import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArticleHeaderPrototype } from './ArticleHeaderPrototype';
import './article-header-prototype.css';

createRoot(document.getElementById('article-header-prototype-root')).render(
  <React.StrictMode>
    <ArticleHeaderPrototype />
  </React.StrictMode>,
);
