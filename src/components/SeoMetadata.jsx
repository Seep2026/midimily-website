import { useEffect } from 'react';
import { updateDocumentSeo } from '../lib/seo';

export function SeoMetadata({ title, description, canonicalPath, jsonLd }) {
  useEffect(() => {
    updateDocumentSeo({ title, description, canonicalPath, jsonLd });
  }, [canonicalPath, description, jsonLd, title]);

  return null;
}
