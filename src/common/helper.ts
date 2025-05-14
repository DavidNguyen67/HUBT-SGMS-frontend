export const truncateText = (text: string, length: number = 5) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};
