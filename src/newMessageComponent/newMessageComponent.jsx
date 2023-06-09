import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { WsContext, ToastContext, SugNicknamesContext } from '../contexts/contexts.jsx'
import { CustomAutoComplete } from '../autoCompleteComponent/autoCompleteComponent.jsx';

function NewMessage(){
    const ws = useContext(WsContext);
    const {sugNicknames, setSugNicknames} = useContext(SugNicknamesContext);
    const {setToastText, setShowToast} = useContext(ToastContext);
    const {state} = useLocation();
    const navigate = useNavigate();
    const [theme, setTheme] = useState('');
    const [receiver, setReceiver] = useState((state&&state.sendTo)||'');
    const [message, setMessage] = useState('');

    useEffect(()=>{
        return ()=>setSugNicknames([]);
    }, [])
    
    function handleChange(e){
        if (e.target.value){
            ws.send({type: 'get-sug-nicknames', contain: e.target.value})
        }
        setReceiver(e.target.value);
    }

    function handleClick(){
        if(!message || !receiver) {
            setToastText('fill "send to:" and "message:" fields');
            setShowToast(true);
            return
        }
        const req = {
            type: 'new-message',
            theme, 
            msg: message, 
            src: sessionStorage.nickname, 
            dst: receiver
        };
        ws.send(req);
        navigate('/');
    }
    
    return(
        <div className="m-5">
            <button
                className="btn btn-primary p-3 fs-5 mb-3"
                onClick={()=>navigate(-1)}
            >Go back</button>
            <div className="fs-3 ps-3 pb-3">New message</div>
            <div className="col-lg-5 fs-4 row">
                <label className="control-label">
                    Send to:
                </label>
                <CustomAutoComplete
                    allSuggestions={sugNicknames}
                    value={receiver}
                    onChange={handleChange}
                />
            </div>
            <div className="col-lg-5 fs-4 row">
                <label className="control-label">
                    Theme:
                </label>
                <input 
                    className="form-control my-1 fs-5"
                    value={theme}
                    onChange={e=>setTheme(e.target.value)}
                />
            </div>
            <div className="col-lg-10 fs-4">
                <label className="control-label">
                    Message:
                </label>
                <textarea
                    className="form-control my-1 fs-5"
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                ></textarea>
                <div className="text-end">
                <button 
                    onClick={handleClick}
                    className="btn btn-primary p-3 px-5 fs-5 mt-5"
                >Send</button>
                </div>
            </div>
        </div>
    )
}

export { NewMessage }