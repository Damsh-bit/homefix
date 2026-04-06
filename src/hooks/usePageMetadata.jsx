import { useEffect } from 'react'

const DEFAULT_META = {
  description: 'FixMyHome LLC designs and builds premium patios, pergolas, outdoor kitchens, and home renovations across Houston, Cypress, Katy, and surrounding areas.',
  image: '/assets/materials/gable-roof.jpg',
  url: 'https://fixmyhomellc.com'
}

function setOrCreateMeta(selector, attr, value) {
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    if (attr === 'name') {
      element.setAttribute('name', selector.match(/\[name="([^"]+)"\]/)[1])
    } else {
      element.setAttribute('property', selector.match(/\[property="([^"]+)"\]/)[1])
    }
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export function usePageMetadata({ title, description, image, url }) {
  useEffect(() => {
    if (title) {
      document.title = title
      setOrCreateMeta('meta[property="og:title"]', 'property', title)
      setOrCreateMeta('meta[name="twitter:title"]', 'name', title)
    }

    const metaDescription = description || DEFAULT_META.description
    setOrCreateMeta('meta[name="description"]', 'name', metaDescription)
    setOrCreateMeta('meta[property="og:description"]', 'property', metaDescription)
    setOrCreateMeta('meta[name="twitter:description"]', 'name', metaDescription)

    const pageUrl = url || DEFAULT_META.url
    setOrCreateMeta('meta[property="og:url"]', 'property', pageUrl)

    const imageUrl = image || DEFAULT_META.image
    setOrCreateMeta('meta[property="og:image"]', 'property', imageUrl)
    setOrCreateMeta('meta[name="twitter:image"]', 'name', imageUrl)
    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
  }, [title, description, image, url])
}
