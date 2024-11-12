import { useEffect, useRef, useState } from 'react';
import { useClient, usePost, useShow } from '../../utils/request';
import Axios from "axios";

const FileUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
	const client = useClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      if (selectedFile) {
				console.log(selectedFile);
        formData.append("file", selectedFile);
      }

      const response = await Axios.post(
        "post_documents",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setProgress(percentCompleted);
          },
					headers: { "Content-Type": "multipart/form-data" }
        }
      );

      setUploadStatus("done");
			client.refetchQueries({queryKey: ["user/documents"]});
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Button to trigger the file input dialog */}
      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span> Escolher documento
        </button>
      )}

      {selectedFile && (
        <div className="d-flex flex-column align-items-center w-10 gap-1 justify-content-center mt-4">
          <div className="file-card">
            <span className="material-symbols-outlined icon">description</span>

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
                  <span className="material-symbols-outlined close-icon">
                    close
                  </span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
          </button>
        </div>
      )}
    </div>
  );
};

export const RequestCard = () => {

	return (
		<section className="request-card">
			{/* <UploadForm />
			<RequestFix /> */}
			<FileUpload />
		</section>
	);
}


const UploadForm = () => {

	// const {isLoading, data} = usePost("post_documents", {retry: false});

	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		const types = ['image/png', 'image/jpeg'];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError(null);
		} else {
			setFile(null);
			setError('Please select an image file (png or jpeg)');
		}

		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			// request
			// axios.post('http://localhost:8000/upload', formData).then(() => {
			// 	console.log('file uploaded');
			// });
		}

	};
	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		const types = ['image/png', 'image/jpeg'];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError(null);
		} else {
			setFile(null);
			setError('Please select an image file (png or jpeg)');
		}
	}

	return (
		<>
			<span>Faça upload de algum documento</span>
			<form>
				<input type="file" onChange={handleUpdate}/>
				<div className="output">
					{error && <div className="error">{error}</div>}
				</div>
			</form>
		</>
	);
}

const RequestFix = () => {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { visible, show, hide } = useShow()
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		const types = ['image/png', 'image/jpeg'];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError(null);
		} else {
			setFile(null);
			setError('Please select an image file (png or jpeg)');
		}
	};

	return (
		<>
		 <button className="f14 fw-500 blue mt-2" onClick={show}>
          Solicitar nova explicação de algum documento
      </button>
		</>
	);
}


