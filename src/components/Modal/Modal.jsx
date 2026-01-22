import { useRef, useEffect } from "react";

export default function Modal({ modalInfo, onClose, children }) {

	const dialogRef = useRef(null);

	useEffect(() => {

		const dialog = dialogRef.current;
		if(!dialog) return;

		if(modalInfo.modalOpen) {
			if(typeof dialog.showModal === 'function') {
				dialog.showModal();
			}
		} else {
			dialog.close();
		}

		dialog.addEventListener('cancel', onClose);
		return () => dialog.removeEventListener('cancel', onClose);

	}, [modalInfo, onClose]);

	return (
		<dialog ref={dialogRef}>
			<header>
				<h2>{modalInfo.modalTitle}</h2>
				<button onClick={onClose} aria-label="Close dialog">
					<svg width="18" height="18" viewBox="0 0 20 20">
						<path
							d="M6 6l12 12M18 6L6 18"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</header>
			<main>{children}</main>
		</dialog>
	);
}
