import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/graphql";

export interface AsteroidDetails {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    feet: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    };
    orbiting_body: string;
  }>;
}

export const fetchAsteroids = async (startDate: string, endDate: string) => {
  const response = await axios.post(API_URL, {
    query: `
      query ($startDate: String!, $endDate: String!) {
        asteroids(startDate: $startDate, endDate: $endDate) {
          id
          name
          absolute_magnitude_h
          is_potentially_hazardous_asteroid
          nasa_jpl_url
        }
      }
    `,
    variables: { startDate, endDate },
  });
  return response.data.data.asteroids;
};

export const fetchAsteroidDetail = async (
  id: string
): Promise<AsteroidDetails> => {
  const response = await axios.post(API_URL, {
    query: `
      query ($id: String!) {
        asteroid(id: $id) {
          id
          name
          nasa_jpl_url
          absolute_magnitude_h
          estimated_diameter {
            kilometers {
              estimated_diameter_min
              estimated_diameter_max
            }
            meters {
              estimated_diameter_min
              estimated_diameter_max
            }
            miles {
              estimated_diameter_min
              estimated_diameter_max
            }
            feet {
              estimated_diameter_min
              estimated_diameter_max
            }
          }
          is_potentially_hazardous_asteroid
          close_approach_data {
            close_approach_date
            close_approach_date_full
            relative_velocity {
              kilometers_per_second
              kilometers_per_hour
              miles_per_hour
            }
            miss_distance {
              astronomical
              lunar
              kilometers
              miles
            }
            orbiting_body
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.data.asteroid;
};
