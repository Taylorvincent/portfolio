/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from 'react'
import useLocalStorage from '../../utils/hooks/useLocalStorage'
import AnimatingBalls from './components/AnimatingBalls'
// import BlinkText from './components/BlinkText'
import BackgroundAudio from './components/BackgroundAudio'
import BlinkingTextModal from './components/BlinkingTextModal'
import BottomInfo from './components/BottomInfo'
import Golfer from './components/Golfer'
import Scene from './components/Scene'
import Swearing from './components/Swearing'
import { BALL_ANIMATION_DURATION, SWING_HIT_DELAY } from './constants'
import { sentences } from './content'
import { animateAnyBalls, useAnimationFrame } from './helpers/animationHelpers'
import updateSceneDimensions from './helpers/updateSceneDimensions'
import { AnimatingBall, BallEndDestination, GolferState, SceneDimensions, Word } from './interfaces'

import { SWEAR_DELAY, audio_splash, audio_swing } from './constants'
import { arrSwearWords_orig } from './content'
import { pickSwearWord, soundEffect } from './helpers'
import { getNewBall, getNewDestination } from './helpers/gameLogic'

const NotFound = (): JSX.Element => {
	const [sceneState, setSceneState] = useState<SceneDimensions>({
		window_width: 0,
		window_height: 0,
		scene_scale: 0,
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
	const [ballsArr, setBallsArr] = useState<AnimatingBall[]>([])
	const [words, setWords] = useState<Word[]>([])

	// Todo: Censor -> funnier?

	const audio_splash_ref = useRef<HTMLAudioElement>(null)
	const audio_swing_ref = useRef<HTMLAudioElement>(null)

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

	// Handle ball animation
	useAnimationFrame(() => {
		animateAnyBalls(setBallsArr, BALL_ANIMATION_DURATION, SWING_HIT_DELAY)
	})

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

		const newBall = getNewBall(sceneState, destination)

		setBallsArr((ballsArr) => [...ballsArr, { ...newBall, isShadow: true }, newBall])
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
				scene_scale: sceneState.scene_scale,
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
			<audio ref={audio_swing_ref} src={audio_swing}></audio>
			<audio ref={audio_splash_ref} src={audio_splash}></audio>

			<Scene sceneState={sceneState} />

			<BackgroundAudio volume={volume} userMediaApproved={userMediaApproved} />

			<AnimatingBalls balls={ballsArr} scene_scale={sceneState.scene_scale} />

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
								// startAudio again if not playing
								// let volume slider blink
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
