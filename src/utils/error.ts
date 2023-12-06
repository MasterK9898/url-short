export const handleError = (error: Error) => {
  if (error.message !== "canceled") {
    // currently this is enough
    console.error(error);
    alert(error.message);
  } else {
    console.log("Request canceled");
  }
};
