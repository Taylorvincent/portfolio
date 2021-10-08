import { SceneDimensions } from '../interfaces'

import { Dispatch, SetStateAction } from 'react'

import { BG_ratio, boat_height, golfer_height, ball_height } from '../constants'

const updateSceneDimensions = (setState: Dispatch<SetStateAction<SceneDimensions>>): void => {
	setState((prevState) => {
		const window_width = window.innerWidth
		const window_height = window.innerHeight
		let scene_scale = window_width / 2560

		let boat_y
		let scene_height
		let golfer_y
		const ballPositions = {
			start: { x: 0, y: 0 },
			end_water: { x: 0, y: 0 },
			end_hole: { x: 0, y: 0 },
		}

		scene_height = window_width / BG_ratio
		if (window_width < window_height) {
			// portrait
			scene_scale *= 2
			scene_height = (window_width * 2) / BG_ratio
			ballPositions.end_water.x = window_width * 0.25
			ballPositions.end_hole.x = window_width * 0.375
		} else {
			ballPositions.end_water.x = window_width * 0.37
			ballPositions.end_hole.x = window_width * 0.436
		}

		boat_y = window_height / 2 - scene_height * 0.2 // calculate constant y pos
		boat_y += boat_height * scene_scale - boat_height // boat scale adjustments

		golfer_y = window_height / 2 + scene_height * 0.1
		golfer_y += (golfer_height * scene_scale - golfer_height) / 2

		ballPositions.start.x = window_width * 0.5 + golfer_height * scene_scale * 0.14
		ballPositions.start.x += (ball_height * scene_scale - ball_height) / 2

		ballPositions.start.y = window_height / 2 + scene_height * 0.37
		ballPositions.start.y += (ball_height * scene_scale - ball_height) / 2

		ballPositions.end_water.y = window_height / 2 - scene_height * 0.03
		ballPositions.end_hole.y = window_height / 2 - scene_height * 0.045

		const newState = {
			...prevState,
			window_width,
			window_height,
			scene_height,
			scene_scale,
			boat_y,
			golfer_y,
			ballPositions,
		}

		document.documentElement.style.setProperty('--scene_scale', scene_scale.toString())

		for (const [key, positions] of Object.entries(ballPositions)) {
			for (const [axis, value] of Object.entries(positions)) {
				document.documentElement.style.setProperty(`--ballpositions-${key}-${axis}`, value + 'px')
			}
		}

		return newState
	})
}

export default updateSceneDimensions
