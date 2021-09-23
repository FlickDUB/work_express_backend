import { useState } from "react"
import { useHistory } from "react-router";
import { api } from "../api";

function FileUpload() {
    const [files, setFiles] = useState(null)
    const history = useHistory()

    const sendFile = () => {
        console.log(files)
        if (files.length > 0) {
            let formData = new FormData();
            formData.append('file', files[0])
            return api.post("/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(res => {
                history.push(`${res.data.name}`)
            })
        }
    }
    return (
        <div>
            <label>File:</label>
            <input type="file" onChange={(e) => setFiles(e.currentTarget.files)} /><br />
            <button onClick={sendFile}>Upload</button>

        </div>
    )
}

export default FileUpload
