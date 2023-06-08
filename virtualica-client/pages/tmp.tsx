import {useEffect, useState} from 'react';
import {Button} from '@mui/material';

const Tmp = () => {
  const [peer, setPeer] = useState<RTCPeerConnection[]>([]);

  useEffect(() => console.log(peer[0]), [peer]);

  const addPeer = () => {
    setPeer([new RTCPeerConnection({})]);
  }

  return <Button onClick={addPeer}>Add Peer</Button>;
}

export default Tmp;
