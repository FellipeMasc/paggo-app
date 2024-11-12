import Modal from "react-bootstrap/Modal"

export const ModalDescricao = ({ show, onHide, explanation, extractedText, document_id } : { show: boolean; onHide: () => void ; explanation : string; extractedText : string; document_id : number}) => {
		return (
			<Modal show={show} onHide={onHide} centered>
				<Modal.Body className="modal-descricao">
								<div className="d-flex align-items-center w-10 gap-1 justify-content-center">
									<button className="btn-modal bg-blue  white w-50 mt-4" onClick={onHide}>
										Baixe o documento original
									</button>
									<button className="btn-modal bg-blue  white w-50 mt-4" onClick={onHide}>
										Baixe o documento com as suas consultas
									</button>
								</div>
								<div className="d-flex align-items-center w-10 justify-content-center">
									<div className="text-scrollable">
										<span className=" f14 fw-400 blue text-start">Texto Extraído <br></br> {extractedText}</span>
									</div>
									<div className="text-scrollable">
										<span className="f14 fw-400 blue text-start">Explicação <br></br> {explanation ? explanation : "Solicite uma explicação no botão embaixo de upload" }</span>
									</div>
								</div>
					<button className="btn-modal bg-blue  white w-50 mt-4" onClick={onHide}>
						OK
					</button>
				</Modal.Body>
			</Modal>)
}

// type useModalTitleProps = {
//   onHide: () => void
//   image: string
//   title: string

//   color: string
// }

// function UseModalTitle({ image, title, color, onHide }: useModalTitleProps) {
//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center">
//       <img src="/assets/close.svg" width={12} className="btn-modal-close" onClick={onHide} />
//       <img src={`/assets-v1/modal/${image}.svg`} alt="" />
//       <span className={`f16 fw-500 ${color}`}>{title}</span>
//     </div>
//   )
// }
