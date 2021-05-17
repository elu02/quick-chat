import { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'


const SocketContext = createContext();

const socket = io('http://localhost:3001')

const ContextProvider = ({ children }) => {
    const [ stream, setStream ] = useState()
    const [ client, setClient ] = useState('')
    const [ call, setCall ] = useState({})
    const [ callOngoing, setCallOngoing ] = useState(false)
    const [ name, setName ] = useState('')

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
        
        socket.on('connected', id => setClient(id))
        socket.on('call', ({ signal, from, name}) => {
            setCall({ receiving: true, from, name, signal})
        })
    }, [])

    const answerCall = () => {
        setCallOngoing(true)
        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('answer', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('call', { user: id, signalData: data, from: client, name })
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        socket.on('accepted', (signal) => {
            setCallOngoing(true)
            peer.signal(signal)
        })
    }

    const leaveCall = () => {
        setCallOngoing(false)
        connectionRef.current.destroy()
        window.location.reload()
    }
    
    return (
        <SocketContext.Provider value={{ call, callOngoing, myVideo, userVideo, stream, name, setName, client, callUser, leaveCall, answerCall}}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext}