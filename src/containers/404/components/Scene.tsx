/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
const BG_land = '/404/images/BG_land_pano.png'
const BG_vijver = '/404/images/BG_vijver.png'
const BG_sea = '/404/images/BG_sea.png'
const BG_clouds = '/404/images/BG_clouds.png'
const boatsprite = '/404/images/boatsprite.png'

import { SceneState } from '../interfaces'

interface Props {
	sceneState: SceneState
	onClickBoat: (e: any) => void
}

const removeAnimation = (e: any): void => e.currentTarget.classList.remove('jump')

const Scene = ({ sceneState, onClickBoat }: Props): JSX.Element => {
	return (
		<div>
			<style>
				{`.BG{
				height: ${sceneState.window_height}px;
				width: ${sceneState.window_width}px;
			}`}
			</style>

			<div className="BG BG-grass"></div>
			<div className="BG BG-sky"></div>
			<div className="BG BG-1" style={{ backgroundImage: `url(${BG_vijver})` }}></div>
			<div className="BG BG-1 BG-clouds" style={{ backgroundImage: `url(${BG_clouds})` }}></div>
			<div className="BG BG-1" style={{ backgroundImage: `url(${BG_sea})` }}></div>
			<div className="boat" style={{ top: sceneState.boat_y }}>
				<div
					className="boatsprite"
					style={{
						backgroundImage: `url(${boatsprite})`,
					}}
					onClick={onClickBoat}
					onAnimationEnd={removeAnimation}
				></div>
			</div>
			<div className="BG BG-3 BG-animated" style={{ backgroundImage: `url(${BG_land})` }}></div>

			{/* <div
				className="poshelper"
				style={{
					position: 'absolute',
					left: sceneState.ballPositions.end_hole.x,
					top: sceneState.ballPositions.end_hole.y,
					backgroundColor: 'red',
					padding: 2,
				}}
			></div> */}
		</div>
	)
}

export default Scene
