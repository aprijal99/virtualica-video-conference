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
      <button type='button' onClick={handleSendButton}>Send signal</button>
    </>
  );
}

export default Room;
