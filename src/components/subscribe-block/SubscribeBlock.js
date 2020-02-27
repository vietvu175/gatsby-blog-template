import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import './SubscribeBlock.css'

const SubscribeBlock = () => {
    const [email, setEmail] = useState('')
    const [disabledSubmit, setDisabledSubmit] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await addToMailchimp(email)
            if (res.result === 'success') {
                setIsSuccess(true)
            }
        } catch (error) {
        }

    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        /* eslint-disable-next-line */
        const parttern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!parttern.test(e.target.value)) {
            setDisabledSubmit(true)
        } else {
            setDisabledSubmit(false)
        }
    }
    return (
        <div className='subscribe-block'>
            <p>Nếu bạn có hứng thú với những bài viết tương tự, hãy để lại email để mình có thể thông báo cho bạn ngay khi có bài viết mới!</p>
            {isSuccess ? 
            <h3>Đăng ký nhận tin thành công!</h3>
            :
            <form onSubmit={handleSubmit}>
                <div className='subscribe-block__action'>
                    <input placeholder='vitcaosu.com@gmail.com' className='subscribe-block__input' value={email} onChange={handleChangeEmail} />
                    <button className='subscribe-block__button' type='submit' disabled={disabledSubmit}>Đăng ký</button>
                </div>
            </form>}
        </div>
    )

}

export default SubscribeBlock
