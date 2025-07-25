export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();
  let targetDate: Date;

  if (!date.includes("T")) {
    targetDate = new Date(`${date}T00:00:00`);
  } else {
    targetDate = new Date(date);
  }

  // Handle invalid dates
  if (isNaN(targetDate.getTime())) {
    return "Invalid date";
  }

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

export function formatDateISO(date: string): string {
  const targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) {
    return "";
  }
  return targetDate.toISOString();
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
