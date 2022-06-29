import { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
	background: rgba(100, 100, 100, 0.8);
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

const ModalBody = styled.div`
	background: rgba(255, 255, 255, 1);
	margin: 10% auto;
	padding: 20px;
	width: 50%;
	border-radius: 5px;
	z-index: 2;
	.closeButton {
		float: right;
	}
`;

const Modal = ({ children }) => {
	const [shouldShow, setShouldShow] = useState(false);

	return (
		<>
			<button onClick={() => setShouldShow(true)}>
				Show Information
			</button>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
				nostrum sint ex adipisci praesentium cumque necessitatibus
				magnam animi dolores beatae harum tenetur, porro modi aliquid
				quia dolorem architecto assumenda cupiditate.
			</p>
			{shouldShow && (
				<ModalBackground onClick={() => setShouldShow(false)}>
					<ModalBody onClick={(e) => e.stopPropagation()}>
						<button
							className="closeButton"
							onClick={() => setShouldShow(false)}
						>
							X
						</button>
						{children}
					</ModalBody>
				</ModalBackground>
			)}
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
				nostrum sint ex adipisci praesentium cumque necessitatibus
				magnam animi dolores beatae harum tenetur, porro modi aliquid
				quia dolorem architecto assumenda cupiditate.
			</p>
		</>
	);
};

export default Modal;
