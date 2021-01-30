/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */

import { useState, useEffect, useRef } from 'react'

const golfsprite = '/404/images/golfsprite.png'
const audio_swing = '/404/sound/golfswing.wav'
const audio_splash = '/404/sound/plons.wav'

import { arrSwearWords_orig, sentences } from './content'

// import BlinkText from './components/BlinkText'
import BackgroundAudio from './components/BackgroundAudio'
import AnimatingBalls from './components/AnimatingBalls'
import BottomInfo from './components/BottomInfo'
import Swearing from './components/Swearing'
import { useAnimationFrame, animateAnyBalls } from './helpers/animationHelpers'

import { SceneDimensions, GolferState, AnimatingBall, Word } from './interfaces'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import { pickSwearWord, soundEffect } from './helpers'
import Scene from './components/Scene'
import updateSceneDimensions from './helpers/updateSceneDimensions'
import BlinkingTextModal from './components/BlinkingTextModal'

export const BG_ratio = 384 / 201
export const ball_height = 20
export const boat_height = 112
export const golfer_height = 400
export const BALL_ANIMATION_DURATION = 3600
export const SWING_HIT_DELAY = 460
export const SWEAR_DELAY = BALL_ANIMATION_DURATION + SWING_HIT_DELAY // == ball landing? == animation duration ??

const NotFound = (): JSX.Element => {
	const [state, setState] = useState<SceneDimensions>({
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
	const [showDialog, toggleDialog] = useState(false)
	const [volume, setVolume] = useLocalStorage('volume', 0.35)
	const [golferState, setGolferState] = useState<GolferState>({
		isAnimating: false,
	})
	const [ballsArr, setBallsArr] = useState<AnimatingBall[]>([])
	const [words, setWords] = useState<Word[]>([])
	// Todo: Censor -> funnier?
	const [arrSwearWords_In, setArrSwearWords_In] = useState<string[]>(arrSwearWords_orig.slice())

	const audio_swing_ref = useRef(null)
	const audio_splash_ref = useRef(null)

	// update state dimensions on load and resize
	useEffect(() => {
		updateSceneDimensions(state, setState)
		window.addEventListener('resize', updateSceneDimensions.bind(null, state, setState))
		// Spawn dialog
		setTimeout(() => {
			toggleDialog(true)
		}, 2000)

		return window.removeEventListener('resize', updateSceneDimensions.bind(null, state, setState))
	}, [])

	// Handle ball animation
	useAnimationFrame(() => {
		animateAnyBalls(setBallsArr, BALL_ANIMATION_DURATION, SWING_HIT_DELAY)
	})

	return (
		<div className="pixelgolf">
			<audio ref={audio_swing_ref} src={audio_swing}></audio>
			<audio ref={audio_splash_ref} src={audio_splash}></audio>

			<Scene {...state} />

			<BackgroundAudio volume={volume} userMediaApproved={userMediaApproved} />

			<AnimatingBalls balls={ballsArr} scene_scale={state.scene_scale} />

			<div
				id="golfer"
				className={`${golferState.isAnimating && 'golfer-animation'}`}
				onClick={() => {
					if (userMediaApproved == false) setUserMediaApproved(true)

					setGolferState({ isAnimating: false })
					setTimeout(() => {
						setGolferState({ isAnimating: true })
					}, 10)

					const rand_end = Math.floor((Math.random() * state.scene_height) / 5)
					const rand_bezier = {
						x: Math.floor((Math.random() - 0.5) * 2 * state.scene_height * 0.2),
						y: Math.floor((Math.random() - 0.5) * 2 * state.scene_height * 0.2),
					}

					const newBall = {
						startTime: performance.now(),
						controlPointNudge: rand_bezier,
						progress: 0,
						position: {
							draw: state.ballPositions.start,
							start: state.ballPositions.start,
							end: {
								x: state.ballPositions.end_water.x - rand_end,
								y: state.ballPositions.end_water.y + rand_end / 2,
							},
						},
					}

					setBallsArr([...ballsArr, { ...newBall, isShadow: true }, newBall])

					pickSwearWord({
						setWords,
						setArrSwearWords_In,
						arrSwearWords_In,
						scene_scale: state.scene_scale,
						scene_width: state.window_width,
					})

					setTimeout(() => {
						soundEffect({ name: 'swing', ref: audio_swing_ref, volume })
					}, 200)

					setTimeout(() => {
						setBallsLost((balls) => balls + 1)
						soundEffect({
							name: 'splash',
							ref: audio_splash_ref,
							volume: 0.33 * volume,
						})
					}, SWEAR_DELAY)
				}}
				style={{
					backgroundImage: `url(${golfsprite})`,
					transform: `scale(${state.scene_scale})`,
					top: state.golfer_y,
				}}
			></div>

			<Swearing words={words} golfer_top={state.golfer_y} />
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
