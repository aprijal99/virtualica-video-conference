import {Button} from '@mui/material';

const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');

const Room = () => {
  conn.onmessage = (ev) => {
    console.log(JSON.parse(ev.data));
  }

  const handleSendButton = () => {
    conn.send(JSON.stringify({ message: 'Signal', }));
  }

  return (
    <>
      <div>Room</div>
      <Button variant='contained'>Send Signal</Button>
    </>
  );
}

export default Room;
