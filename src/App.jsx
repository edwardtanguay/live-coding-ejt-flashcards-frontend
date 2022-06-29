import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

const url = 'http://localhost:3335/flashcards';

function App() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        (async () => {
            setFlashcards((await axios.get(url)).data);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Flashcards</h1>
            <p>There are {flashcards.length} flashcards.</p>
        </div>
    );
}

export default App;
