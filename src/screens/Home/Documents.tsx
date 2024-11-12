import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useDummyRequest, useGet, useShow } from "../../utils/request";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ModalDescricao } from "../../components/ModalDescricaoDoc";
import { ModalQuery } from "../../components/ModalQuery";
import Axios from "axios";

export interface Documents {
		id: number;
		filename: string;
		llmExplanation: string;
		extractedText: string;
		uploadedAt: string;
}


const ProgressLive = () =>
{

	return (
		<div className="d-flex flex-column flex-fill">
			<div className=" d-flex justify-content-between f12 fw-500">
				<p className="grayaf m-0">Treino 1/5</p>
				<p className="purple mb-0">{20}%</p>
			</div>
			<ProgressBar now={20} striped animated />
		</div>
	);
};

export function Documents() {
	const {isLoading, data} : {isLoading : boolean, data? : Documents[]} = useGet("user/documents", {retry: false});
	console.log(data)
	return (
		<Loading isLoading={isLoading} skeleton={{ height: 200 }}>
			<section className="documents">
				{data && data?.map((item, index) => {
					return (
						<Document extractedText={item.extractedText} explanation={item.llmExplanation} document_id={item.id} uploadedAt={item.uploadedAt} filename={item.filename} key={index} />
					)
				})}
			</section>
		</Loading>
	)
}


const Document = ({explanation, extractedText, document_id, uploadedAt, filename} : {explanation : string, extractedText : string, document_id : number, uploadedAt : string, filename : string}) =>
{
	const { visible, show, hide } = useShow()
	const {visible: visibleQuery, show: showQuery, hide: hideQuery} = useShow()
	const uploadedAtDate = new Date(uploadedAt);
	const isLoading = useDummyRequest();
	const formattedDate = `${uploadedAtDate.getDate().toString().padStart(2, '0')}/${(uploadedAtDate.getMonth() + 1).toString().padStart(2, '0')}/${uploadedAtDate.getFullYear()}`;
	const handleDownload = async () => {
		const file = await Axios.get(`user/download_llm_document/${document_id}`);
		const blob = new Blob([file.data], { type: 'application/pdf' });	
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = "document_llm_appended.pdf";
		document.body.append(link);
		link.click();
		link.remove();
	}
	return (
		<Loading isLoading={isLoading} skeleton={{ height: 200 }}>
			<section className="card-welcome teste-card bg-blue28 mt-4">
				<article className="d-flex w-100">
					<div className="d-flex flex-column  flex-1 ps-2 align-items-center" style={{ width: 100 }}>
						<div className="d-flex w-100 align-items-center justify-content-center gap-3 ">
							<span className="f18 fw-500 white text-start one-liner d-block">
								Documento<span className="f12"></span>: <span className="blue">{filename}</span>
							</span>
							<span className="download-btn" onClick={handleDownload}>
								<span className="material-symbols-outlined">download</span> Download
							</span>
						</div>
						<span className="f12 grayaf fw-400 text-start">
							{formattedDate}	
						</span>
						<div className="d-flex align-items-center justify-content-center mt-2 gap-1">
							<button className="f14 fw-500 blue" onClick={show}>
								Ver detalhes do documento
							</button>
							<button className="f14 fw-500 blue" onClick={showQuery}>
								Realizar alguma consulta no que foi extraído
							</button>
						</div>
							<ModalDescricao show={visible} onHide={hide} explanation={explanation} extractedText={extractedText} document_id={document_id}/>
							<ModalQuery show={visibleQuery} onHide={hideQuery} document_id={document_id}/>
					</div>
				</article>

			</section>
		</Loading>
	);
};
