/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from 'react'
import useLocalStorage from '../../utils/hooks/useLocalStorage'
// import BlinkText from './components/BlinkText'
import BackgroundAudio from './components/BackgroundAudio'
import BlinkingTextModal from './components/BlinkingTextModal'
import BottomInfo from './components/BottomInfo'
import Golfer from './components/Golfer'
import Scene from './components/Scene'
import Swearing from './components/Swearing'
import { sentences } from './content'
import updateSceneDimensions from './helpers/updateSceneDimensions'
import { BallEndDestination, GolferState, SceneState, Word } from './interfaces'

import { SWEAR_DELAY, audio_splash, audio_swing } from './constants'
import { arrSwearWords_orig } from './content'
import { pickSwearWord, soundEffect } from './helpers'
import { getNewDestination } from './helpers/gameLogic'
import AnimatingBalls, { launchBall } from './components/AnimatingBalls'

const NotFound = (): JSX.Element => {
	const [sceneState, setSceneState] = useState<SceneState>({
		window_width: 0,
		window_height: 0,
		scene_scale_x: 0,
		scene_scale_y: 0,
		scene_height: 0,
		boat_y: 0,
		golfer_y: 0,
		ballPositions: {
			start: {
				x: 0,
				y: 0,
			},
			end_water: {
				x: 0,
				y: 0,
			},
			end_hole: {
				x: 0,
				y: 0,
			},
		},
	})
	const [userMediaApproved, setUserMediaApproved] = useState(false)
	const [ballsLost, setBallsLost] = useState(0)
	const [ballsHit, setBallsHit] = useState(0)
	const [showDialog, toggleDialog] = useState(false)
	const [volume, setVolume] = useLocalStorage('volume', 0.35)
	const [golferState, setGolferState] = useState<GolferState>({
		isAnimating: false,
		canClick: true,
	})
	const [words, setWords] = useState<Word[]>([])

	// Todo: Censor -> funnier?

	const audio_splash_ref = useRef<HTMLAudioElement>(null)
	const audio_swing_ref = useRef<HTMLAudioElement>(null)
	const animatingBallsContainer = useRef<HTMLDivElement>(null)

	const [arrSwearWords_In, setArrSwearWords_In] = useState<string[]>(arrSwearWords_orig.slice())

	// update state dimensions on load and resize
	useEffect(() => {
		updateSceneDimensions(setSceneState)
		window.addEventListener('resize', updateSceneDimensions.bind(null, setSceneState))
		// Spawn dialog
		setTimeout(() => {
			toggleDialog(true)
		}, 2000)

		return window.removeEventListener('resize', updateSceneDimensions.bind(null, setSceneState))
	}, [])

	const onClickGolfer = (): void => {
		if (userMediaApproved == false) setUserMediaApproved(true)

		if (!golferState.canClick) {
			return
		}

		const destination = getNewDestination(ballsHit)

		setGolferState({ isAnimating: false, canClick: false })
		setTimeout(() => {
			setGolferState({ isAnimating: true, canClick: true })
		}, 10)

		if (animatingBallsContainer.current) {
			launchBall(animatingBallsContainer.current, destination, sceneState)
		}

		setBallsHit((balls) => balls + 1)
		setTimeout(() => {
			soundEffect({ name: 'swing', ref: audio_swing_ref, volume })
		}, 200)

		if (destination === BallEndDestination.HOLE_IN_ONE) {
			//
		} else {
			pickSwearWord({
				setWords,
				setArrSwearWords_In,
				arrSwearWords_In,
				scene_scale_x: sceneState.scene_scale_x,
				scene_width: sceneState.window_width,
			})

			setTimeout(() => {
				setBallsLost((balls) => balls + 1)
				soundEffect({
					name: 'splash',
					ref: audio_splash_ref,
					volume: 0.33 * volume,
				})
			}, SWEAR_DELAY)
		}
	}

	return (
		<div className="pixelgolf">
			<link rel="stylesheet" type="text/css" href="/404/styles.css" media="screen" />
			<link rel="stylesheet" type="text/css" href="/404/ballflight.css" media="screen" />

			<audio ref={audio_swing_ref} src={audio_swing}></audio>
			<audio ref={audio_splash_ref} src={audio_splash}></audio>

			<Scene sceneState={sceneState} />

			<BackgroundAudio volume={volume} userMediaApproved={userMediaApproved} />

			<AnimatingBalls containerRef={animatingBallsContainer} />

			<Golfer golferState={golferState} sceneState={sceneState} onClickGolfer={onClickGolfer} />

			<Swearing words={words} golfer_top={sceneState.golfer_y} />

			<BottomInfo
				volume={volume}
				setVolume={setVolume}
				balls_lost={ballsLost}
				userMediaApproved={userMediaApproved}
			/>

			{showDialog && (
				<div id="dialog-container">
					<div id="dialog">
						<BlinkingTextModal
							onCloseDialog={() => {
								toggleDialog(false)
								setUserMediaApproved(true)
							}}
							sentences={sentences}
						></BlinkingTextModal>
					</div>
				</div>
			)}
		</div>
	)
}

export default NotFound
