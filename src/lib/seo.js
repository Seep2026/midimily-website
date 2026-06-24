import { organization, siteUrl } from '../data/geoContent';

const ROUTE_SCHEMA_SCRIPT_ID = 'midimily-route-jsonld';

function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

function setMetaByName(name, content) {
  if (!content) {
    return;
  }

  let meta = document.head.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  if (!content) {
    return;
  }

  let meta = document.head.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) {
    return;
  }

  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function updateDocumentSeo({ title, description, canonicalPath = '/', jsonLd = [] }) {
  if (title) {
    document.title = title;
    setMetaByProperty('og:title', title);
  }

  if (description) {
    setMetaByName('description', description);
    setMetaByProperty('og:description', description);
  }

  const canonicalUrl = absoluteUrl(canonicalPath);
  setLink('canonical', canonicalUrl);
  setMetaByProperty('og:url', canonicalUrl);
  setMetaByProperty('og:type', 'website');

  const schemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd].filter(Boolean);
  const existingScript = document.getElementById(ROUTE_SCHEMA_SCRIPT_ID);

  if (schemas.length === 0) {
    existingScript?.remove();
    return;
  }

  const script = existingScript || document.createElement('script');
  script.id = ROUTE_SCHEMA_SCRIPT_ID;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': schemas,
    },
    null,
    2,
  );

  if (!existingScript) {
    document.head.appendChild(script);
  }
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    description: organization.description,
    sameAs: organization.sameAs,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: organization.name,
    description: organization.description,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq = []) {
  if (!faq.length) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({ name, description, path, audience = [], provider = `${siteUrl}/#organization` }) {
  return {
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      '@id': provider,
    },
    audience: audience.map((name) => ({
      '@type': 'Audience',
      audienceType: name,
    })),
  };
}

export function articleSchema({ title, description, path, datePublished, dateModified }) {
  return {
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@id': `${siteUrl}/#organization`,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

export function collectionPageSchema({ name, description, path }) {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}
