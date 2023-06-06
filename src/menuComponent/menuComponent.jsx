import { Header } from './headerComponent.jsx'
import { MessageList } from './messageListComponent.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Menu(){
    const [searchFor, setSearchFor] = useState('');
    
    return (
        <div className="overflow-x-hidden d-flex flex-column flex-shrink-0 position-absolute end-0 start-0 top-0 bottom-0">
            <Header 
                searchFor={searchFor} 
                setSearchFor={setSearchFor}
            />
            <MessageList searchFor={searchFor} />
            <Link
                to="/new-message"
                className="btn fs-5 btn-dark position-fixed p-3 bottom-0 mb-5 end-0 me-5"
            >
                New message
            </Link>
        </div>
    )
}

export { Menu }