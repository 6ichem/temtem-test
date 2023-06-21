// Logic to count how many stars to display based on the voteAverage
export const countStars = (voteAverage: number): number => {
  // Assuming a maximum rating of 10 and a maximum star count of 5
  const maxRating: number = 10;
  const maxStars: number = 5;

  // Calculate the number of stars based on the ratio between voteAverage and maxRating
  const starCount: number = Math.round((voteAverage / maxRating) * maxStars);

  return starCount;
};

// Extract the release year from the release date
export const extractReleaseYear = (releaseDate: string) => {
  const releaseYear = parseInt(releaseDate.split("-")[0], 10);

  return releaseYear;
};

// This converts the duration received from TheMovieDB API (in minutes) to a string in the format of "Xh Ymin"
export const convertToReadableTime = (runtime: number): string => {
  const hours: number = Math.floor(runtime / 60);
  const minutes: number = runtime % 60;

  return `${hours}h ${minutes}min`;
};
