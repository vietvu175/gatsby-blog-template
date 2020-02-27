import React from 'react'
import { FacebookProvider, Comments } from 'react-facebook'

const CommentsBlock = ({ url, facebookAppId }) => {
    return (
        <>
            <strong>Bình luận:</strong>
            <FacebookProvider appId={facebookAppId}>
                <Comments href={url} width='100%' />
            </FacebookProvider>
        </>
    )
}

export default CommentsBlock
