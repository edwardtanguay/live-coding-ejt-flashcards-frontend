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
			const _flashcards = (await axios.get(url)).data;
			_flashcards.forEach((flashcard) => {
				flashcard.editing = false;
				flashcard.originalFlashcard = { ...flashcard };
			});
			setFlashcards(_flashcards);
		})();
	}, []);

	const handleFlashcardSave = (e) => {
		e.preventDefault();
		axios
			.post(url, {
				category: fieldCategory,
				front: fieldFront,
				back: fieldBack,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleDeleteButton = (e, flashcard) => {
		axios
			.delete(url + '/' + flashcard.id)
			.then(function (response) {
				console.log(response);
				const _flashcards = flashcards.filter(
					(m) => m.id !== flashcard.id
				);
				setFlashcards(_flashcards);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleSaveButton = (e, flashcard) => {
		flashcard.editing = !flashcard.editing;
		setFlashcards([...flashcards]);
	};

	const handleEditButton = (e, flashcard) => {
		flashcard.editing = !flashcard.editing;
		setFlashcards([...flashcards]);
	};

	const handleCancelButton = (e, flashcard) => {
		flashcard.category = flashcard.originalFlashcard.category;
		flashcard.editing = !flashcard.editing;
		setFlashcards([...flashcards]);
	};

	const handleChangeCategory = (e, flashcard) => {
		flashcard.category = e.target.value;
		setFlashcards([...flashcards]);
	};

	return (
		<div className="App">
			<h1>Flashcards</h1>
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
						<button
							className="saveFlashcard"
							onClick={(e) => handleFlashcardSave(e)}
						>
							Save
						</button>
					</div>
				</form>
			</Modal>
			<div className="flashcards">
				{flashcards.map((flashcard, i) => {
					return (
						<div key={i} className="flashcard">
							{!flashcard.editing ? (
								<>
									<div className="category">
										{flashcard.category}
									</div>
									<div className="front">
										{flashcard.front}
									</div>
									<div className="back">{flashcard.back}</div>
									<div className="buttonArea">
										<button
											className="delete"
											onClick={(e) =>
												handleDeleteButton(e, flashcard)
											}
										>
											Delete
										</button>
										<button
											className="edit"
											onClick={(e) =>
												handleEditButton(e, flashcard)
											}
										>
											Edit
										</button>
									</div>
								</>
							) : (
								<>
									<input
										value={flashcard.category}
										onChange={(e) =>
											handleChangeCategory(e, flashcard)
										}
									/>
									<div className="buttonArea">
										<button
											className="saveEditFlashcard"
											onClick={(e) =>
												handleSaveButton(e, flashcard)
											}
										>
											Save
										</button>
										<button
											className="cancel"
											onClick={(e) =>
												handleCancelButton(e, flashcard)
											}
										>
											Cancel
										</button>
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
