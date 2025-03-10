const Pictures = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg",
  "https://images.pexels.com/photos/30966169/pexels-photo-30966169/free-photo-of-captivating-portrait-of-common-marmosets-in-profile.jpeg",
  "https://images.pexels.com/photos/31005520/pexels-photo-31005520/free-photo-of-elderly-man-in-warm-hat-and-coat-indoors.jpeg",
  "https://images.pexels.com/photos/30994477/pexels-photo-30994477/free-photo-of-silhouette-portrait-of-a-pensive-young-man.jpeg",
  "https://images.pexels.com/photos/30993129/pexels-photo-30993129/free-photo-of-close-up-portrait-with-reflective-mirror.jpeg",
  "https://images.pexels.com/photos/30979047/pexels-photo-30979047/free-photo-of-elegant-black-and-white-portrait-of-a-contemporary-dancer.jpeg",
  "https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg",
  "https://images.pexels.com/photos/5847899/pexels-photo-5847899.jpeg",
];

export default function getProfilePicture(arr = Pictures) {
  if (arr.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
