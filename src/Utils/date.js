/**
 * Converts unix timestamp into a time ago string like 2 hours ago
 *
 * @param {string} date unix timestamp
 */
export const timeAgo = unixTimestamp => {
  const date = new Date(parseInt(unixTimestamp));

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 12614400);

  if (interval > 1) {
    return interval + 'years ago';
  }

  interval = Math.floor(seconds / 1071360);
  if (interval > 1) {
    return interval + 'months ago';
  }

  interval = Math.floor(seconds / 8760);
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + 'mins ago';
  }

  interval = Math.floor(seconds / 5);
  if (interval > 1) {
    return  'few sec ago';
  }
  return  'just now';
};



/**
 * Converts unix timestamp to current date
 *
 * @param {string} date unix timestamp
 */
export const currentDate = unixTimestamp => {
  const date = new Date(parseInt(unixTimestamp));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return `${month} ${day} ${year} ${time}`;
};
