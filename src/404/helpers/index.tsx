import { SceneDimensions, SoundEffect, PickSwearWord, BallPositions } from "../interfaces";

import { Dispatch, SetStateAction } from "react";

import { arrSwearWords_orig } from "../content";
import { SWEAR_DELAY, BG_ratio, boat_height, golfer_height, ball_height } from "..";

export const updateSceneDimensions = (prevState: SceneDimensions, setState: Dispatch<SetStateAction<SceneDimensions>>) => {
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let scene_scale = window_width/2560;
    
    let boat_y;
    let scene_height
    let golfer_y;
    let ballPositions = {
      start: {x: 0, y:0},
      end_water: {x:0, y:0},
      end_hole: {x:0, y:0},
    };
    
    scene_height = (window_width / BG_ratio)
    if (window_width < window_height) { // portrait
      scene_scale*= 2
      scene_height = (window_width*2 / BG_ratio)
      ballPositions.end_water.x = window_width*0.25
      ballPositions.end_hole.x = window_width*0.375
    }
    else {
      ballPositions.end_water.x = window_width*0.37
      ballPositions.end_hole.x = window_width*0.436
    }
    
    boat_y = (window_height / 2) - scene_height*0.2                   // calculate constant y pos
    boat_y += (boat_height*scene_scale) - boat_height                 // boat scale adjustments
    
    golfer_y = (window_height / 2) + scene_height*0.1
    golfer_y += ((golfer_height*scene_scale) - golfer_height)/2
    
    ballPositions.start.x = window_width*0.5 + golfer_height*scene_scale*0.14
    ballPositions.start.x += ((ball_height*scene_scale) - ball_height)/2
    
    ballPositions.start.y = (window_height / 2) + scene_height*0.37
    ballPositions.start.y += ((ball_height*scene_scale) - ball_height)/2
    
    ballPositions.end_water.y = (window_height / 2) - scene_height*0.03
    ballPositions.end_hole.y = (window_height / 2) - scene_height*0.045
    
    let newState = {
      ...prevState,
      window_width: window_width,
      window_height: window_height,
      scene_height: scene_height,
      scene_scale: scene_scale,
      boat_y: boat_y,
      golfer_y: golfer_y,
      ballPositions: ballPositions
    }
    setState(newState);
  }
  
  export const soundEffect = ({volume, ref}: SoundEffect ) => {
    let cloneAudio = ref.current.cloneNode(true)
    cloneAudio.volume = volume
    cloneAudio.play()
  }
  
  export const pickSwearWord = ({arrSwearWords_In, setArrSwearWords_In, setWords, scene_scale, scene_width}: PickSwearWord) => {
    let random = Math.floor(Math.random() * arrSwearWords_In.length);
    let word = arrSwearWords_In[random];
    let words_in = arrSwearWords_In.slice(0);
    words_in.splice(random, 1);
    if (arrSwearWords_In.length < 5) {
      setArrSwearWords_In(arrSwearWords_orig.slice());
    } else {
      setArrSwearWords_In(words_in);
    }
  
    let rannd_left = (Math.random()*300 - 150)*scene_scale + scene_width/2
    let rand_top = (Math.random()*300 - 150)*scene_scale
  
    setTimeout(() => {
      setWords(oldWords => [
        ...oldWords,
        {
          text: word,
          margin: {
            left: rannd_left, 
            top: rand_top
          }
        }
      ]);
      setTimeout(() => {
        setWords(oldWords => oldWords.slice(1))
      }, 2200);
    }, SWEAR_DELAY);
  }