export const timeFromNow = time => {
  // Get timestamps
  const unixTime = new Date(time * 1000).getTime();
  if (!unixTime) return;
  const now = new Date().getTime();

  // Calculate difference
  const difference = unixTime / 1000 - now / 1000;

  // Setup return object
  const tfn = {};

  // Check if time is in the past, present, or future
  tfn.when = 'now';
  if (difference > 0) {
    tfn.when = 'future';
  } else if (difference < -1) {
    tfn.when = 'past';
  }

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = 'years';
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.unitOfTime = 'months';
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = 'days';
    tfn.time = Math.floor(difference / (60 * 60 * 24));
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = 'hours';
    tfn.time = Math.floor(difference / (60 * 60));
  } else {
    // Seconds
    tfn.unitOfTime = 'seconds';
    tfn.time = Math.floor(difference);
  }

  return tfn;
};
