export const formatTime = (time) => {
  const getSeconds = time % 60;
  const minutes = Math.floor(time / 60);
  const getMinutes = minutes % 60;
  const getHours = Math.floor(time / 3600);

  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(getHours)} : ${pad(getMinutes)} : ${pad(getSeconds)}`;
};
