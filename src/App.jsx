import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Modal from './components/Modal';

const url = 'http://localhost:3335/flashcards';

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [fieldCategory, setFieldCategory] = useState('');
    const [fieldFront, setFieldFront] = useState('');
    const [fieldBack, setFieldBack] = useState('');

    useEffect(() => {
        (async () => {
            setFlashcards((await axios.get(url)).data);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Flashcards</h1>[{fieldCategory}]
            <p>There are {flashcards.length} flashcards.</p>
            <Modal buttonText="Add New Flashcard">
                <h2>Add Flashcard</h2>
                <form className="modalContent">
                    <div className="row">
                        Category:{' '}
                        <input
                            value={fieldCategory}
                            onChange={(e) => setFieldCategory(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        Front:{' '}
                        <input
                            value={fieldFront}
                            onChange={(e) => setFieldFront(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        Back:{' '}
                        <input
                            value={fieldBack}
                            onChange={(e) => setFieldBack(e.target.value)}
                        />
                    </div>
					<div className="row">
						<button className="saveFlashcard">Save</button>
						</div>
                </form>
            </Modal>
        </div>
    );
}

export default App;
