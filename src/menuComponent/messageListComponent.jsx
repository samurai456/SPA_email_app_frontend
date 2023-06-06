import './static/hoverOver.css'
import { useNavigate } from 'react-router-dom'
import { MessagesContext } from '../contexts/contexts.jsx'
import { useContext } from 'react'
import { dateFormat, shorten } from '../tools/tools.js'

function MessageList({searchFor}){
    const navigate = useNavigate();
    const {messages} = useContext(MessagesContext);
    const myNickname = sessionStorage.nickname;
    const msgs = searchFor? 
        messages.filter(i=>i.theme.includes(searchFor) || i.msg.includes(searchFor)):
        messages;


    function handleClick(id){
        navigate(`/message/${id}`);
    }

    return (
        <div className="pt-2 ps-3 d-flex flex-column overflow-y-auto overflow-x-hidden">
            {msgs.map(i=>(
                <div 
                    key={i.id} 
                    className="row hover-over justify-content-between 
                    align-items-center fs-5 py-2 border-bottom border-1"
                    onClick={()=>handleClick(i.id)}
                >
                    <div className="col-md-2 col-11">
                        {i.src===myNickname? 
                            <span>sent to: <span className="fs-4">
                                {shorten(i.dst, 12)}
                            </span></span>: 
                            <span>from: <span className="fs-4">
                                {shorten(i.src, 12)}
                            </span></span>
                        }
                    </div>
                    <div className="col-md-7 col-12">
                        <b>{shorten(i.theme, 10)}</b>
                        <span className="ms-1">
                            {shorten(i.msg, 20)}
                        </span>
                    </div>
                    <div className="col-md-3 col-12 pe-4 text-end">{dateFormat(i.date)}</div>
                </div>
            ))}
        </div>
    )
}

export { MessageList }