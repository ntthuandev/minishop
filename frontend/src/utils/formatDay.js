export const formatDay = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const day = date.getDate();
  const result = `${day}/${month}/${year}`;
  return result;
};
