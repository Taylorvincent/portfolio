const BG_land = '/404/images/BG_land_pano.png'
const BG_vijver = '/404/images/BG_vijver.png'
const BG_sea = '/404/images/BG_sea.png'
const BG_clouds = '/404/images/BG_clouds.png'
const boatsprite = '/404/images/boatsprite.png'

import { SceneDimensions } from '../interfaces'

const Scene = (props: SceneDimensions): JSX.Element => {
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
				<div
					className="boatsprite"
					style={{
						backgroundImage: `url(${boatsprite})`,
						transform: `scale(${props.scene_scale})`,
					}}
				></div>
			</div>
			<div className="BG BG-3 BG-animated" style={{ backgroundImage: `url(${BG_land})` }}></div>

			<div
				className="poshelper"
				style={{
					position: 'absolute',
					left: props.ballPositions.end_hole.x,
					top: props.ballPositions.end_hole.y,
					backgroundColor: 'red',
					padding: 2,
				}}
			></div>
		</div>
	)
}

export default Scene
