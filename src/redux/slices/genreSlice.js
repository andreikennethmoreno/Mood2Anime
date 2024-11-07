// src/redux/slices/genreSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://graphql.anilist.co';

// Helper function to make a GraphQL request
const fetchGraphQLData = async (query, variables = {}) => {
  const response = await axios.post(baseUrl, {
    query,
    variables,
  });
  return response.data.data;
};

// Fetch genre
export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
  const query = `
    query {
      Genre {
        id
        name
      }
    }
  `;
  
  const data = await fetchGraphQLData(query);
  return data.Genre;
});

// Fetch anime by genre, filter by rating >= 7, and sort by popularity
export const fetchAnimeByGenre = createAsyncThunk(
  'anime/fetchAnimeByGenre',
  async ({ genreId, page = 1, rating = 7, sortBy = 'POPULARITY' }) => {
    const query = `
      query($genreId: Int, $page: Int, $rating: Float) {
        Page(page: $page) {
          media(genre: $genreId, minimumScore: $rating, sort: [$sortBy]) {
            id
            title {
              romaji
              english
            }
            description
            popularity
            score
            coverImage {
              medium
            }
            genres
          }
        }
      }
    `;
    
    const variables = {
      genreId,
      page,
      rating,
      sortBy,
    };

    const data = await fetchGraphQLData(query, variables);
    return {
      animeList: data.Page.media,
      page,
    };
  }
);

const genreSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    animeList: [],
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAnimeByGenre.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnimeByGenre.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) {
          // If it's the first page, replace animeList
          state.animeList = action.payload.animeList;
        } else {
          // Otherwise, append the new results
          state.animeList = [...state.animeList, ...action.payload.animeList];
        }
        state.currentPage = action.payload.page;
      })
      .addCase(fetchAnimeByGenre.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default genreSlice.reducer;
