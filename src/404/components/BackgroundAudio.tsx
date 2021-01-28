import * as React from 'react';
import {useRef, useState, useEffect} from 'react';

import { Requests, Sources } from "../interfaces";

import * as audio_wii_preloop from '!file-loader?name=[name].[ext]!../../../images/404/wii_preloop_2.mp3';
import * as audio_wii_loop from '!file-loader?name=[name].[ext]!../../../images/404/wii_loop_2.mp3';
import * as audio_ocean_loop from '!file-loader?name=[name].[ext]!../../../images/404/waves_loop.mp3';

interface Props {
  volume: number
  userMediaApproved: boolean
}

const BackgroundAudio = (props:Props) => {

  const audio_ocean_ref = useRef<HTMLAudioElement>();

  const [playStates, setPlayStates] = useState({
    wii_preloop: false,
    wii_loop: false,
  });

  const [audioCtx, setAudioCtx] = useState<AudioContext>();
  const [wiiLoopLoaded, setWiiLoopLoaded] = useState(false);
  const [wiiPreLoopLoaded, setWiiPreLoopLoaded] = useState(false);
  const [sources, setSources] = useState<Sources>();
  const [requests, setRequests] = useState<Requests>();
  const [gainNode, setGainNode] = useState<GainNode>();


  useEffect(() => {
    if(audio_ocean_ref && audio_ocean_ref.current){
      audio_ocean_ref.current.volume = 0.2 * props.volume;
    }
  }, [audio_ocean_ref, props.volume]);

  useEffect(() => {
    if(audioCtx == undefined){
      setAudioCtx( new AudioContext() );
    } else {
      setSources({
        wii_loop: audioCtx.createBufferSource(),
        wii_preloop: audioCtx.createBufferSource(),
      });
      setGainNode(audioCtx.createGain());
    }
    // return () => {
    //   if(audioCtx){
    //     audioCtx.close()
    //   }
    // }
  }, [audioCtx])

  useEffect(() => {
    if(requests == undefined){
      setRequests( {
        wii_loop: new XMLHttpRequest(),
        wii_preloop: new XMLHttpRequest(),
      });
    } else {
      requests.wii_preloop = new XMLHttpRequest();
      requests.wii_preloop.open('GET', audio_wii_preloop, true);
      requests.wii_preloop.onload = () => setWiiPreLoopLoaded(true);
      requests.wii_preloop.responseType = 'arraybuffer';
      requests.wii_preloop.onerror = (e:any) => console.log( 'e', e );
      requests.wii_preloop.send();
  
      requests.wii_loop = new XMLHttpRequest();
      requests.wii_loop.open('GET', audio_wii_loop, true);
      requests.wii_loop.responseType = 'arraybuffer';
      requests.wii_loop.onload = () => setWiiLoopLoaded(true);
      requests.wii_loop.onerror = (e:any) => console.log( 'e', e );
      requests.wii_loop.send();
    }

    return () => {      
      if (requests) {
        requests.wii_loop.onload = null;
      }
    }
  }, [requests]);
  

  
  useEffect(() => {
    if(audioCtx && gainNode && !isNaN(props.volume)){
      gainNode.gain.setValueAtTime(props.volume, audioCtx.currentTime);
    }
  }, [audioCtx, gainNode, props.volume])

  // When wii music is loaded, start preloop, then start infinite loop
  useEffect(() => {    
    if(wiiLoopLoaded && wiiPreLoopLoaded && props.userMediaApproved ){
      startWiiMusic()
      audio_ocean_ref.current.play()
    }
  }, [wiiLoopLoaded, wiiPreLoopLoaded, props.userMediaApproved])

  const startWiiMusic = () => {
    let audioData = requests.wii_loop.response;
    audioCtx.decodeAudioData(audioData, buffer => {
      sources.wii_loop.buffer = buffer;
      sources.wii_loop.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      sources.wii_loop.loop = true;
  
      audioData = requests.wii_preloop.response;
      audioCtx.decodeAudioData(audioData, buffer => {
        sources.wii_preloop.buffer = buffer;
        sources.wii_preloop.connect(gainNode);
        sources.wii_preloop.addEventListener("ended", () => {
          console.log( 'ended' ); 
          sources.wii_loop.start(0,51.75)
        });
        sources.wii_preloop.start(0)
      })
    }, (e) => { 
      console.log("Error with decoding audio data", e); 
    });
  }
  
  return (
    <div>
      <audio src={audio_ocean_loop} ref={audio_ocean_ref} loop></audio>
    </div>
  );
}

export default BackgroundAudio;
