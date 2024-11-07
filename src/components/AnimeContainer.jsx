// AnimeContainer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import MoodFilter from './MoodFilter';
import AnimeList from './AnimeList';
import Footer from './Footer';

const AnimeContainer = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showAnimeContent, setShowAnimeContent] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [hiddenAnime, setHiddenAnime] = useState(new Set());



  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
        setGenres(response.data.data);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          order_by: 'popularity',
          sort: 'asc',
          page: page,
          limit: 1,
          unapproved: false,
          min_score: 7.5,
        };

        if (selectedGenres.includes('Highrated Anime this year')) {
          const currentYear = new Date().getFullYear();
          params['start_date'] = `${currentYear}-01-01`;
        } else if (selectedGenres.length > 0) {
          params['genres'] = selectedGenres.join(',');
        }

        const response = await axios.get('https://api.jikan.moe/v4/anime', { params });
        setAnimeList(response.data.data);
      } catch (err) {
        setError('Failed to fetch anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [page, selectedGenres]);

  const toggleGenre = (moodName, genreName) => {
    if (genreName === 'Highrated Anime this year') {
      setSelectedGenres((prev) =>
        prev.includes(genreName) ? prev.filter((item) => item !== genreName) : [...prev, genreName]
      );
    } else {
      const genreId = genres.find((genre) => genre.name === genreName)?.mal_id;
      if (genreId) {
        setSelectedGenres((prev) =>
          prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
        );
      }
    }
    setPage(1);
    setShowAnimeContent(true);
    setSelectedMood(moodName);

  };



  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleBackButtonClick = () => {
    setShowAnimeContent(false);
    setSelectedGenres([]);
    setSelectedMood('');
  };

  const handleHideClick = (animeId) => {
    setHiddenAnime((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(animeId)) {
        updatedSet.delete(animeId); // Show anime if it’s already hidden
      } else {
        updatedSet.add(animeId); // Hide anime if it's not hidden
      }
      return updatedSet;
    });

    // If the hidden anime is the last anime in the list, move to the next page
    if (animeList.length - 1 === Array.from(hiddenAnime).indexOf(animeId)) {
      handleNextPage(); // Go to the next page
    }
  };

  return (
    <>
      <Navbar onBackClick={handleBackButtonClick} selectedMood={selectedMood} />
      
      {!showAnimeContent && <MoodFilter selectedGenres={selectedGenres} toggleGenre={toggleGenre} />}
      
      {showAnimeContent && (
        <>
          <AnimeList
            animeList={animeList}
            loading={loading}
            error={error}
            hiddenAnime={hiddenAnime} 
            handleHideClick={handleHideClick}
            page={page}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />

        </>
      )}

      <Footer />
    </>
  );
};

export default AnimeContainer;
