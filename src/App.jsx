import 'bootstrap/dist/css/bootstrap.min.css'
import { SignIn } from './signInComponent/signInComponent.jsx'
import { Menu } from './menuComponent/menuComponent.jsx'
import { Message } from './messageComponent/messageComponent.jsx'
import { NewMessage } from './newMessageComponent/newMessageComponent.jsx'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { CheckSignIn } from './CheckSignIn.jsx'
import { WsConnection } from './connection/wsConnection.js'
import { MessagesContext, WsContext, ToastContext, SugNicknamesContext } from './contexts/contexts.jsx'
import { ToastComponent } from './toastComponent/ToastComponent.jsx'

function App(){
  const [messages, setMessages] = useState([]);
  const conn = useMemo(()=>new WsConnection(dispatchMessage), []);
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [sugNicknames, setSugNicknames] = useState([]);
  
  function dispatchMessage(m){
    switch(m.type){
      case 'all-messages':
        setMessages(m.messages)
        return
      case 'new-message':
        setMessages(old=>[m.newMessage, ...old]);
        if(m.newMessage.src!==sessionStorage.nickname){
          setToastText(`Received a message from "${m.newMessage.src}"`);
          setShowToast(true);
        }
        return
      case 'sug-nicknames':
        setSugNicknames(m.sugNicknames)
        return
    }
  }

  useEffect(()=>{
    const nickname = sessionStorage.nickname;
    if(nickname){
      conn.send({type: 'nickname', nickname});
    }
  }, []);

  return(
    <div>
      <ToastContext.Provider value={{toastText, setToastText, showToast, setShowToast}}>
        <WsContext.Provider value={conn}>
          <MessagesContext.Provider value={{messages, setMessages}}>
            <Routes>
              <Route path="/sign-in" element={ <SignIn/> } />
              <Route path="/" element={
                <CheckSignIn>
                  <Menu />
                </CheckSignIn> 
              }/>
              <Route path="/new-message" element={ 
                <CheckSignIn>
                  <SugNicknamesContext.Provider value={{ sugNicknames, setSugNicknames }}>
                    <NewMessage />
                  </SugNicknamesContext.Provider>
                </CheckSignIn> 
              }/>
              <Route path="/message/:id" element={
                <CheckSignIn>
                  <Message />
                </CheckSignIn>
              }/>
            </Routes>
            <ToastComponent />
          </MessagesContext.Provider>
        </WsContext.Provider>
      </ToastContext.Provider>
    </div>
  )
}

export default App