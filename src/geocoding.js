export const getGeoCoding = async (zip) => {
  const url = import.meta.env.VITE_ZIPFETCH;
  const result = await fetch(`${url}${zip}`);

  const geoPosition = await result.json();
  // console.log("GEOPOSITION");
  // console.log(apikey);
  // console.log(geoPosition.results[zip][0]);
  // console.log(geoPosition);

  return geoPosition.results[zip][0];
  // return geoPosition;
  // return result;
};

// module.exports = { getGeoCoding };
