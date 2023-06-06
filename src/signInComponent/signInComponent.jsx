import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WsContext } from '../contexts/contexts.jsx'

function SignIn(){
    const ws = useContext(WsContext);
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const adaptive = " col-xl-4 col-lg-4 col-md-5 col-sm-8 col-10 mt-5 ";

    function handleClick(){
        sessionStorage.setItem('nickname', nickname);
        ws.send({type: 'nickname', nickname});
        navigate('/');
    }

    return (
        <div className="d-flex justify-content-center align-items-center text-nowrap mt-5">
            <div className={adaptive + 'row justify-content-center'}>
                <label className="control-label h5">
                    Enter your nickname
                </label>
                <input 
                    className="form-control my-1"
                    value={nickname}
                    onChange={e=>setNickname(e.target.value)}
                />
                <div className="row justify-content-end p-0 ">
                    <button
                        className="btn btn-primary col-5 col-sm-4 col-md-3"
                        onClick={ handleClick }
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export { SignIn }