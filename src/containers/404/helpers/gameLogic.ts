import { AnimatingBall, SceneDimensions } from '../interfaces'

export const getNewBall = (sceneState: SceneDimensions): AnimatingBall => {
	const rand_end = Math.floor((Math.random() * sceneState.scene_height) / 5)
	const rand_bezier = {
		x: Math.floor((Math.random() - 0.5) * 2 * sceneState.scene_height * 0.2),
		y: Math.floor((Math.random() - 0.5) * 2 * sceneState.scene_height * 0.2),
	}

	const newBall: AnimatingBall = {
		startTime: performance.now(),
		controlPointNudge: rand_bezier,
		progress: 0,
		position: {
			draw: sceneState.ballPositions.start,
			start: sceneState.ballPositions.start,
			end: {
				x: sceneState.ballPositions.end_water.x - rand_end,
				y: sceneState.ballPositions.end_water.y + rand_end / 2,
			},
		},
	}
	return newBall
}
