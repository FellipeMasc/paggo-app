import "./styles.scss";
import Loading from "../../components/Loading";
import { useGet } from "../../utils/request";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Documents } from "./Documents";


const ProgressLive = ({ total, docs_with_explanation } : { total: number, docs_with_explanation : number }) =>
{
	const percentage = Math.trunc((docs_with_explanation / total) * 100);
	console.log(total, docs_with_explanation, percentage);
	return (
		<div className="d-flex flex-column flex-fill">
			<div className=" d-flex justify-content-between f12 fw-500">
				<p className="grayaf m-0">Documentos com explicação {docs_with_explanation}/{total}</p>
				<p className="purple mb-0">{percentage}%</p>
			</div>
			<ProgressBar now={percentage} striped animated />
		</div>
	);
};



export function CardAccount()
{
	const {isLoading, data} : {isLoading : boolean, data? : Documents[]} = useGet("user/documents", {retry: false});
	return (
		<Loading isLoading={isLoading} skeleton={{ height: 200 }}>
			{data && <section className="card-welcome teste-card bg-blue28 mt-4">
				<article className="d-flex w-100">
					<div>

					</div>
					<div className="d-flex flex-column align-items-center">
					</div>
					<div className="d-flex flex-column  flex-1 ps-2" style={{ width: 100 }}>
						<div className="">
							<span className="f18 fw-500 white text-start one-liner w-100 d-block">
								Bem vindo<span className="f12"></span>, <span className="blue">Membro da Paggo</span>!
							</span>
						</div>
						<span className="f12 grayaf fw-400 text-start">
						</span>
						<div className="d-flex align-item-center justify-content-start gap-3">
							<div className="d-flex align-items-center gap-1 ">
								<span className="f12 fw-400 grayf0 text-start mt-1">
								</span>
							</div>

							<div className="d-flex align-items-center gap-1">
								<span className="f12 fw-400 yellow mt-1">
								</span>
							</div>
						</div>
					</div>
				</article>
				<ProgressLive total={data?.length} docs_with_explanation={data?.filter(d => d.llmExplanation != null).length} />
			</section>}
		</Loading>
	);
};
