export default function timeSincePosted(createdAt) {
  // const now = new Date();
  // console.log("createdAt", createdAt)
  if (typeof createdAt === "string") createdAt = new Date(createdAt);
 
  const timeNumber = new Date(createdAt).getTime(); // konversi ke milidetik
  const diff = Date.now() - timeNumber; // selisih dalam milidetik
  const seconds = Math.floor(diff / 1000); // konversi ke detik
  // console.log("createdAt", createdAt)
  const units = [
    ["years", 60 * 60 * 24 * 365],
    ["months", 60 * 60 * 24 * 30],
    ["days", 60 * 60 * 24],
    ["hours", 60 * 60],
    ["minutes", 60],
    ["seconds", 1],
  ];

  // Cari unit waktu yang paling cocok
  for (let [unit, limit] of units) {
    if (seconds >= limit) {
      const value = Math.floor(seconds / limit);
      return `${value} ${unit} ago`;
    }
  }

  return "just now";

  // const past = new Date(createdAt);
  // const seconds = Math.floor((now - past) / 1000);

  // let interval = Math.floor(seconds / 31536000);
  // if (interval > 1) {
  //   return interval + " years ago";
  // }
  // interval = Math.floor(seconds / 2592000);
  // if (interval > 1) {
  //   return interval + " months ago";
  // }
  // interval = Math.floor(seconds / 86400);
  // if (interval > 1) {
  //   return interval + " days ago";
  // }
  // interval = Math.floor(seconds / 3600);
  // if (interval > 1) {
  //   return interval + " hours ago";
  // }
  // interval = Math.floor(seconds / 60);
  // if (interval > 1) {
  //   return interval + " minutes ago";
  // }
  // return "just now";
}
