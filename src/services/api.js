const API_URL = 'http://localhost:3001';

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  return response.json();
};

export const getReviews = async () => {
  const response = await fetch(`${API_URL}/reviews`);
  return response.json();
};

export const createReview = async (review) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Add more functions as needed for CRUD operations
