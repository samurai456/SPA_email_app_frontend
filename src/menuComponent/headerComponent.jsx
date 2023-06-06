import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WsContext, MessagesContext } from '../contexts/contexts.jsx'

function Header({searchFor, setSearchFor}){
    const navigate = useNavigate();
    const ws = useContext(WsContext);
    const {setMessages} = useContext(MessagesContext);
    const nick = sessionStorage.nickname;

    function handleLogout(){
        delete sessionStorage.nickname;
        ws.send({type: 'logout'});
        setMessages([]);
        navigate('/sign-in');
    }

    function handleBack(){
        setSearchFor('');
    }

    return (
        <div className="py-2 end-0 start-0 top-0
        border-bottom row justify-content-between
        align-items-center bg-white">
            <div className="col-sm-1 col-5 ms-4">
                <h3>{nick.length>12? nick.slice(0,10)+'...': nick}</h3>
            </div>
            <div className="col-lg-5 col-sm-7 col-12 my-1 
            row justify-content-center 
            align-items-center form-group">
                <div className="col-9 col-sm-10 pe-1">
                    <input 
                        value={searchFor} 
                        onChange={e=>setSearchFor(e.target.value)} 
                        className="col-10 form-control" 
                    />
                </div>
                <button
                    className="col-2 btn btn-primary"
                    onClick={handleBack}
                >
                    {searchFor? 'Back': 'Seach'}
                </button>
            </div>
            <div className="col-xl-1 col-sm-2 col-12 me-4 
            row justify-content-end">
                <button className="col-sm-12 col-3 
                btn btn-primary text-nowrap"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export { Header }