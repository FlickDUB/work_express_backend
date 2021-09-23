import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../api';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { Link } from "react-router-dom";

export const FilesList = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [hasMore, setHasMore] = useState(true)

    const file = useSelector((state) => state.files)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'CLEAR_FILES' })
        setHasMore(true)
    }, [dispatch, limit, page])

    useEffect(() => {
        let cancel;
        api.get('/file/list', {
            params: { list_size: limit, page: page },
            cancelToken: new axios.CancelToken(c => { cancel = c })
        }).then((res) => {
            if (res.data.length > 0) {
                dispatch({ type: 'ADD_FILES', files: res.data })
            } else {
                setHasMore(false)
            }
        }).catch(function (err) {
            if (axios.isCancel(err)) return
            throw err
            // console.log(err.response?.data.message)
        });
        return () => cancel()
    }, [dispatch, page, limit])
    return (
        <div>
            <pre>{JSON.stringify({ page, limit, total: file.files.length }, null, '\t')}</pre><br /><br />
            <label>Page: </label>
            <input onChange={(e) => setPage(e.currentTarget.value)} placeholder={page} value={page} /><br />
            <label>Limit: </label>
            <input onChange={(e) => setLimit(e.currentTarget.value)} placeholder={limit} value={limit} /><br />
            <ol>
                {file.files.map((el) => {
                    return (<li key={el.id}><Link to={`/file/${el.name}`}>{el.originalname}</Link></li>)
                })}
            </ol>
            <button disabled={+page <= 1} onClick={() => setPage(+page - 1)}>prev page</button>
            <button disabled={!hasMore} onClick={() => setPage(+page + 1)}>next page</button>

        </div>
    )
}

