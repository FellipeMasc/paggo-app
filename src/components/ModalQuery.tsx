import Modal from "react-bootstrap/Modal"
import { usePost } from "../utils/request";

export const ModalQuery = ({ show, onHide, document_id } : { show: boolean; onHide: () => void ; document_id : number}) => {
		const {mutate} = usePost("query_llm", {retry: false});
		const handleQuery = () => {
			const queryText = (document.querySelector(".input-modal") as HTMLTextAreaElement).value;
			mutate({documentId: document_id, query: queryText},
				{
					onSuccess: () => {
						onHide()
					}
				}
			)
			onHide()
		}

		return (
			<Modal show={show} onHide={onHide} centered>
				<Modal.Body className="modal-descricao">
								<div className="d-flex flex-column align-items-center w-10 justify-content-center">
										<span className=" f14 fw-400 blue text-start">Mande sua pergunta:</span>
										<textarea className="input-modal" placeholder="Digite sua pergunta aqui..."></textarea>
								</div>
					<button className="btn-modal bg-blue  white w-50 mt-4" onClick={handleQuery}>
						OK
					</button>
				</Modal.Body>
			</Modal>)
}