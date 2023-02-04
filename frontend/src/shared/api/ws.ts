import io from 'socket.io-client'

const wsApiURL = 'ws://' + __API__.replace('http://', '')
const websocket = io(wsApiURL);

console.log(wsApiURL)
export const wsMessageAccept = <T extends object>(callback: (data: T) => void) => {
    websocket.on('message', message => {
        const data = JSON.parse(message);
        callback(data)
    })
}