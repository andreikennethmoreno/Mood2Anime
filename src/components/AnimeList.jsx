import Button from  "../components/Button"

export default function AnimeList({ animeList, loading, error, page, handlePreviousPage, handleNextPage, hiddenAnime, handleHideClick }) {
  const filteredAnimeList = animeList.filter((anime) => !hiddenAnime.has(anime.mal_id));

  const handleCopyTitle = (title) => {
    navigator.clipboard.writeText(title)
      .then(() => {
        alert(`${title} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy title: ", err);
      });
  };

  return (
    <>      
          {loading && <span className="loading loading-spinner loading-lg"></span>}

          <div className="card bg-slate-100/5 my-6 center-container card-compact bg-base-100 shadow-xl">
            {/* Anime Trailer */}
            {filteredAnimeList.length === 0 ? (
              <div className="p-5">
                <p>This Anime is Hidden</p>
                <div className="flex justify-between">
                <Button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  text="⬅️ Back"
                />

                <Button
                  text="Next ➡️"
                  onClick={handleNextPage}
                />
                </div>

              </div>
                             
            ) : (
                filteredAnimeList.map((anime, index) => (
                    <div key={index}>
                        <figure className="w-full max-w-5xl rounded-t-2xl mx-auto aspect-[16/9]">
                        {anime.trailer?.embed_url ? (
                            <iframe
                             className="w-full h-full"
                              width="1044"
                              height="587"
                              src={anime.trailer.embed_url}
                              title={`${anime.title} Trailer`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <>
                              <p className="px-2 text-lg font-thin">Trailer Not <br></br> Available</p>
                              <img
                                src={anime.images.jpg.image_url}
                                alt={`${anime.title} Poster`}
                                className="w-60 h-auto rounded"
                              />
                            </>
                          )}
                          </figure>
                        {/* ++ text-left */}
                        <div className="card-body text-left">
                            <h2
                              className="font-bold card-title cursor-pointer"
                              onClick={() => handleCopyTitle(anime.title)} // Trigger the copy function on click
                            >
                              {anime.title}
                            </h2>

                            <p className="text-lg font-thin">
                            {anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A'}
                            &nbsp;  · &nbsp;  {anime.episodes ?? 'N/A'} ep 
                            &nbsp;  · ⭐{anime.score}
                            &nbsp;  · 🏆top {anime.popularity}
                            </p>

                            <div className="flex space-x-2">
                                {anime.genres?.map((genre, index) => (
                                    <div key={index} className="badge badge-secondary badge-outline">
                                        {genre.name}
                                    </div>
                                )) || <div className="badge badge-secondaary badge-outline">N/A</div>}
                            </div>


                            <p className="mt-3 font-thin">{anime.synopsis.split('.')[0] + '.'}</p>

                            <div className="flex justify-between">
                              <Button
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                                text="⬅️ Back"
                              />
                               {!hiddenAnime.has(anime.mal_id) && (
                                  <Button
                                    text="🙈 Hide"
                                    onClick={() => handleHideClick(anime.mal_id)}
                                  />
                                )}
                              <Button
                                text="Next ➡️"
                                onClick={handleNextPage}
                              />
                             
                            </div>

                          </div>
                    </div>
                ))
            )}
        </div>

            


    
    
    </>


  );
}
