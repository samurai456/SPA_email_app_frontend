import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MessagesContext } from '../contexts/contexts.jsx'
import { dateFormat } from '../tools/tools.js'

function Message(){
    const navigate = useNavigate();
    const {id} = useParams();
    const {messages} = useContext(MessagesContext);
    const nick = sessionStorage.nickname;
    const msg = messages.find(i=>i.id===id);

    if(!msg) return
    return(
        <div className="m-5">
            <button 
                className="btn btn-primary p-3 fs-5"
                onClick={()=>navigate(-1)}
            >Go back</button>
            <div className="fs-4 mt-2">
                <div>from: {msg.src}</div>
                <div>to: {msg.dst}</div>
                <div>date: {dateFormat(msg.date, true)}</div>
            </div>
            <div>
                <div className="h1 ps-4 pt-3">{msg.theme}</div>
                <div className="pt-3 fs-5">
                    {msg.msg}
                </div>
            </div>
            <Link
                className="btn fs-5 btn-dark position-fixed p-3 bottom-0 mb-5 end-0 me-5"
                to="/new-message"
                state={{sendTo: msg.src===nick? msg.dst: msg.src}}
            >
                Answer
            </Link>
        </div>
    )
}

export { Message }