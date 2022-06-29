import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Modal from './components/Modal';

const url = 'http://localhost:3335/flashcards';

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [fieldCategory, setFieldCategory] = useState('');

    useEffect(() => {
        (async () => {
            setFlashcards((await axios.get(url)).data);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Flashcards</h1>
            [{fieldCategory}]
            <p>There are {flashcards.length} flashcards.</p>
            <Modal buttonText="Add New Flashcard">
                <h2>Add Flashcard</h2>
                <form className="modalContent">
                    Category: <input value={fieldCategory} onChange={(e) => setFieldCategory(e.target.value)}/> 
                </form>
            </Modal>
        </div>
    );
}

export default App;
