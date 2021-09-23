import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import fileDownload from 'js-file-download';
import FileUpload from './FileUpload';

const CompareName = () => {
    let { name } = useParams()
    return (
        name === 'upload' ?
            <FileUpload /> :
            <FileInfo />
    )
}


const FileInfo = () => {
    let { name } = useParams()


    const [files, setFiles] = useState({})
    const [info, setInfo] = useState({})

    const sendFile = () => {
        if (files.length > 0) {
            let formData = new FormData();
            formData.append('file', files[0])
            return api.put(`/file/update/${info.name}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((res) => {
                setInfo(res.data)
            })
        }
    }

    // const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        api.get(`/file/${name}`).then(res => {
            setInfo(res.data)
        }).catch(e => {
            console.log(e.response?.data.message)
            throw e;
        })
    }, [name])

    const download = () => {
        api.get(`/file/download/${info.name}`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, info.originalname);
        });
    }

    return (
        <div>
            <pre>{JSON.stringify(info, null, '\t')}</pre><br />
            {Object.keys(info).length !== 0 && (<><button onClick={download}>Download</button><br /><br />
                <label>Update:</label>
                <input type="file" onChange={(e) => setFiles(e.currentTarget.files)} /><br />
                <button onClick={sendFile}>Update File</button></>)
            }
        </div>
    )
}

export default CompareName
