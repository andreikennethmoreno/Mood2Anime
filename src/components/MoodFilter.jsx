import moods from '../assets/mood.js';
import Button from './Button.jsx';

export default function MoodFilter({ selectedGenres, toggleGenre }) {
    return (
        <>  
            <h1 className="my-6 mx-auto mood-center-container grid lg:text-5xl text-4xl font-bold">
                Discover top-rated Anime based on your mood
            </h1>
            <p>How are you feeling right now?</p>

            {/* Mood buttons grid */}
            <div className="my-6 mx-auto mood-center-container grid lg:grid-cols-4 grid-cols-3 lg:gap-6 gap-4">
                {Object.entries(moods).map(([mood, genre], index) => (
                    <Button
                        key={index}  // Use index as the unique key
                        textColor={"text-white"}
                        className={`btn-outline btn-lg ${
                            selectedGenres.includes(genre) ? 'bg-blue-500 text-white' : ''
                        }`}
                        text={mood}
                        onClick={() => toggleGenre(mood, genre)}
                    />
                ))}
            </div>
        </>
    );
}
