const API_URL = 'http://localhost:3001';

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  return response.json();
};

export const createMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
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

export const updateReview = async (review) => {
  const response = await fetch(`${API_URL}/reviews/${review.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  return response.json();
};

export const deleteReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
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

export const updateUser = async (user) => {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const users = await getUsers();
  const user = users.find(
    user => user.username === credentials.username && user.password === credentials.password
  );
  return user ? user : null;
};
