import * as React from "react";
import * as BG_land from '!file-loader?name=[name].[ext]!../../../images/404/BG_land_pano.png';
import * as BG_vijver from '!file-loader?name=[name].[ext]!../../../images/404/BG_vijver.png';
import * as BG_sea from '!file-loader?name=[name].[ext]!../../../images/404/BG_sea.png';
import * as BG_clouds from '!file-loader?name=[name].[ext]!../../../images/404/BG_clouds.png';
import * as boatsprite from '!file-loader?name=[name].[ext]!../../../images/404/boatsprite.png';

import "../styles.scss";

import { SceneDimensions } from "../interfaces";

const Scene = (props: SceneDimensions) => {
	return (
		<div>
			<style>
			{`.BG{
				height: ${props.window_height}px;
				width: ${props.window_width}px;
			}`}
			</style>
			
			<div className="BG BG-grass"></div>
			<div className="BG BG-sky"></div>
			<div className="BG BG-1" style={{ backgroundImage: `url(${BG_vijver})` }}></div>
			<div className="BG BG-1 BG-clouds" style={{ backgroundImage: `url(${BG_clouds})` }}></div>
			<div className="BG BG-1" style={{ backgroundImage: `url(${BG_sea})` }}></div>
			<div className="boat" style={{ top: props.boat_y }}>
			<div className="boatsprite" 
				style={{ backgroundImage: `url(${boatsprite})`, transform: `scale(${props.scene_scale})` }}>
			</div>
			</div>
			<div className="BG BG-3 BG-animated" style={{ backgroundImage: `url(${BG_land})` }}></div>
			
			<div className="poshelper" style={{
				position: 'absolute',
				left: props.ballPositions.end_hole.x,
				top: props.ballPositions.end_hole.y,
				backgroundColor: 'red',
				padding: 2
				}}>
			</div>
		</div>
		)
	}
	
	export default Scene