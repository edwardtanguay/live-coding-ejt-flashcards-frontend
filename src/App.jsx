import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Modal from './components/Modal';

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
            <Modal>
                <h2>Information</h2>
                <section className="modalContent">
                    This is the information.
                </section>
            </Modal>
        </div>
    );
}

export default App;
