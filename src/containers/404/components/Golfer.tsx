/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { SceneState, GolferState } from '../interfaces'

const golfsprite = '/404/images/golfsprite.png'

interface Props {
	golferState: GolferState
	sceneState: SceneState
	onClickGolfer: () => void
}

const Golfer = ({ golferState, sceneState, onClickGolfer }: Props): JSX.Element => {
	return (
		<div
			id="golfer"
			className={`${golferState.isAnimating && 'golfer-animation'}`}
			onClick={onClickGolfer}
			style={{
				backgroundImage: `url(${golfsprite})`,
				transform: `scale(${sceneState.scene_scale_x})`,
				top: sceneState.golfer_y,
			}}
		/>
	)
}

export default Golfer
