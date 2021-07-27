import popularData from '../popularData';

export const pagination = () => {
  const itemsPerPage = 3;
  const pages = popularData.length / itemsPerPage;
  const newItems = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return popularData.slice(start, start + itemsPerPage);
  });
  return newItems;
};
