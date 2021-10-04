/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { SceneDimensions, GolferState } from '../interfaces'

const golfsprite = '/404/images/golfsprite.png'

interface Props {
	golferState: GolferState
	sceneState: SceneDimensions
	onClickGolfer: () => void
	// volume: number
	// userMediaApproved: boolean
	// setUserMediaApproved: Dispatch<SetStateAction<Props['userMediaApproved']>>
	// ballsHit: number
	// setBallsHit: Dispatch<SetStateAction<number>>
	// setBallsArr: Dispatch<SetStateAction<AnimatingBall[]>>
	// setGolferState: Dispatch<SetStateAction<GolferState>>
	// setBallsLost: Dispatch<SetStateAction<number>>
	// setWords: Dispatch<SetStateAction<Word[]>>
}

const Golfer = ({ golferState, sceneState, onClickGolfer }: Props): JSX.Element => {
	return (
		<div
			id="golfer"
			className={`${golferState.isAnimating && 'golfer-animation'}`}
			onClick={onClickGolfer}
			style={{
				backgroundImage: `url(${golfsprite})`,
				transform: `scale(${sceneState.scene_scale})`,
				top: sceneState.golfer_y,
			}}
		/>
	)
}

export default Golfer
