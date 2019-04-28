import { Joke, Jokes } from '../types';

const API_PREFIX = "http://api.icndb.com/jokes";

interface ApiJoke {
  id: number;
  joke: string;
}
interface ApiResponse<T> {
  type: string;
  value: T;
}

const fetchApi = <T>(path: string): Promise<T> =>
  fetch(`${API_PREFIX}${path}`)
    .then(res => res.json())
    .then((response: ApiResponse<T>) => {
      if (response.type === "success") {
        return response.value;
      }
      return Promise.reject(response.value);
    })

const apiJokeToJoke = (joke: ApiJoke): Joke => ({
  id: joke.id,
  text: joke.joke
});

export const fetchRandomJokes = (count: number): Promise<Jokes> =>
  fetchApi<ApiJoke[]>(`/random/${count}`).then(jokes =>
    jokes.map(apiJokeToJoke)
  );

export const fetchJokeById = (jokeId: number): Promise<Joke> =>
  fetchApi<ApiJoke>(`/${jokeId}`).then(joke => apiJokeToJoke(joke));
