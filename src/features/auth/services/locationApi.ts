 export const getLocationName = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await res.json();
  return data.display_name;
};