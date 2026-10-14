/**
 * Centralized Photo Mapping for Fempreneur Award Winners
 * Maps winner names to their verified local public photo assets.
 * 
 * If a winner's photo is not available in the local directory, 
 * it maps to undefined to ensure that area remains completely blank
 * with no placeholders, initials, or broken images.
 */
export const WINNER_PHOTOS = {
  // 2022 Verified Local Photos (from Desktop/Fempreneur web phpoto)
  'Adv Ashwini C': '/images/winners-2022/adv-ashwini-c.png',
  'Dr. Seema Yadav': '/images/winners-2022/dr-seema-yadav.png',
  'Pallavi Walia Raj': '/images/winners-2022/pallavi-walia-raj.png',
  'Meghana Mojjada': '/images/winners-2022/meghana-mojjada.png',
  'Rutu Sunil Sangani': '/images/winners-2022/rutu-sunil-sangani.png',
  'Nidhi Virmani': '/images/winners-2022/nidhi-virmani.png',
  'Ami Shah': '/images/winners-2022/ami-shah.png',
  'Shikha Mehra': '/images/winners-2022/shikha-mehra.png',
  'Naisargi Shah': '/images/winners-2022/naisargi-shah.png',
  'Shweta Raval': '/images/winners-2022/shweta-raval.png',
  'Ruchi Aggarwal': '/images/winners-2022/ruchi-aggarwal.png',
  'Kanisha patel': '/images/winners-2022/kanisha-patel.png',
  'Kanisha Patel': '/images/winners-2022/kanisha-patel.png',
  'Dr. Ishani Hanspal': '/images/winners-2022/dr-ishani-hanspal.png',
  'Belaa Mitthani': '/images/winners-2022/belaa-mitthani.png',
  'Nancy jain': '/images/winners-2022/nancy-jain.png',
  'Nancy Jain': '/images/winners-2022/nancy-jain.png',
  'Angel Foundation': '/images/winners-2022/angel-foundation.png',
  'Dr. Shalini Guggnani': '/images/winners-2022/dr-shalini-guggnani.png',
  'Rekha Jayesh Saluja': '/images/winners-2022/rekha-jayesh-saluja.png',
  'Namrata shah': '/images/winners-2022/namrata-shah.png',
  'Namrata Shah': '/images/winners-2022/namrata-shah.png',
  'Hema Shantharam': '/images/winners-2022/hema-shantharam.png',
  'Susmita Das Gupta': '/images/winners-2022/susmita-das-gupta.png',
  'Toral Shah': '/images/winners-2022/toral-shah.png',
  'Toral Shah (Cutistic Gifts)': '/images/winners-2022/toral-shah.png',
  'Madhusatta Chaudhury': '/images/winners-2022/madhusatta-chaudhury.png',
  'Vimal S Shah': '/images/winners-2022/vimal-s-shah.png',
  'Janki Raina': '/images/winners-2022/janki-raina.png',

  // 2025, 2024, 2023 Existing Verified Project Photos
  'Ananya Sharma': '/images/entrepreneurs/ananya-sharma.jpg',
  'Priyanshi Shah': '/images/entrepreneurs/priyanshi-shah.jpg',
  'Dr. Ananya Sen': '/images/entrepreneurs/dr-ananya-sen.jpg',
  'Dr. Sunita Rao': '/images/entrepreneurs/dr-sunita-rao.jpg',
  'Sneha Patel': '/images/entrepreneurs/sneha-patel.jpg',
  'Radhika Menon': '/images/entrepreneurs/radhika-menon.jpg',
  'Pooja Mehta': '/images/entrepreneurs/pooja-mehta.jpg',
};

/**
 * Returns the photo URL for a given winner name, or undefined if no photo exists.
 * @param {string} name - Winner name
 * @returns {string|undefined}
 */
export function getWinnerPhoto(name) {
  if (!name) return undefined;
  return WINNER_PHOTOS[name] || WINNER_PHOTOS[name.trim()] || undefined;
}
