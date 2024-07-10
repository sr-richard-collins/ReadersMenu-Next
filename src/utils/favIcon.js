// utils.js
import { IMAGE_BASE_URL } from '../config/';
import { DEFAULT_FAVICON } from '../config/constant';

export const updateFavicon = (faviconUrl) => {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = faviconUrl ? IMAGE_BASE_URL + faviconUrl : DEFAULT_FAVICON;
    document.head.appendChild(newLink);
  } else {
    link.href = IMAGE_BASE_URL + faviconUrl;
  }
};
