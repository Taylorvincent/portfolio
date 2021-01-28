import * as React from "react";
import { AnimatingBall } from "../interfaces"

interface Props {
  balls: AnimatingBall[]
  scene_scale: number
}

const AnimatingBalls = ({balls, scene_scale}: Props) => {
  return (
    <div>
      {balls.map((ball) => {
        let scale 
        if (ball.isShadow) {
          scale = scene_scale * (1 - ball.progress*1.4)
          if (scale < scene_scale*0.35){
            scale = scene_scale*0.35
          }
        } else {
          scale = scene_scale * (1 - ball.progress * 0.8)
          if (scale < scene_scale*0.2){
            scale = scene_scale*0.2
          }
        }
        return (
          <div key={ball.isShadow ? ball.startTime: -ball.startTime} className="balldiv-wrapper"
            style={{
              left: ball.position.draw.x,
              top: ball.position.draw.y,
              transform: `scale(${ scale })`
            }}>
            <div className="balldiv"
              style={{
                backgroundColor: ball.isShadow ? "rgba(0,0,0,0.5)" : "#FFF",
              }}>
            </div>
          </div> 
          )
      })}
    </div>
  )
}

export default AnimatingBalls