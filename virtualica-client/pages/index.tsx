import Head from 'next/head'
import {createRef} from 'react';

type MessageType = {
  event: string,
  data: RTCSessionDescriptionInit | RTCIceCandidate,
}

const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');

export default function Home() {
  const inputMessageRef = createRef<HTMLInputElement>();

  let peerConnection: RTCPeerConnection;
  let dataChannel: RTCDataChannel;

  conn.onopen = () => {
    console.log('Connected to the signaling server');
    initialize();
  }

  conn.onmessage = (ev) => {
    console.log(`Got message: ${ev.data}`);
    const message: MessageType = JSON.parse(ev.data);
    const data = message.data;

    switch (message.event) {
      case 'offer':
        handleOffer(data as RTCSessionDescriptionInit);
        break;
      case 'answer':
        handleAnswer(data as RTCSessionDescriptionInit);
        break;
      case 'candidate':
        handleCandidate(data as RTCIceCandidate);
        break;
      default:
        break;
    }
  }

  const send = (message: MessageType) => conn.send(JSON.stringify(message));

  const initialize = () => {
    let configuration = null;
    peerConnection = new RTCPeerConnection(configuration);

    // Setup ice handling
    peerConnection.onicecandidate = (ev) => {
      if (ev.candidate) send({ event: 'candidate', data: ev.candidate, });
    }

    // Creating data channel
    dataChannel = peerConnection.createDataChannel("dataChannel");

    dataChannel.onerror = () => console.log('Error on datachannel');
    dataChannel.onmessage = (ev) => console.log(`Message: ${ev.data}`);
    dataChannel.onclose = () => console.log('Datachannel is closed');

    peerConnection.ondatachannel = (ev) => dataChannel = ev.channel;
  }

  const createOffer = () => {
    peerConnection.createOffer()
      .then((offer) => {
        send({ event: 'offer', data: offer, });
        peerConnection.setLocalDescription(offer);
      })
      .catch(() => console.log('Error creating an offer'));
  }

  const handleOffer = (offer: RTCSessionDescriptionInit) => {
    peerConnection.setRemoteDescription(offer);

    peerConnection.createAnswer()
      .then((answer) => {
        peerConnection.setLocalDescription(answer);
        send({ event: 'answer', data: answer, });
      })
      .catch(() => console.log('Error creating an answer'));
  }

  const handleCandidate = (candidate: RTCIceCandidate) => {
    peerConnection.addIceCandidate(candidate);
  }

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnection.setRemoteDescription(answer)
      .then(() => console.log('Connection established successfully'));
  }

  const sendMessage = () => {
    if (inputMessageRef.current) {
      dataChannel.send(inputMessageRef.current.value);
      inputMessageRef.current.value = '';
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button type='button' onClick={createOffer}>Create offer</button>
        <input type='text' ref={inputMessageRef} />
        <button type='button' onClick={sendMessage}>Send</button>
      </main>
    </>
  );
}
