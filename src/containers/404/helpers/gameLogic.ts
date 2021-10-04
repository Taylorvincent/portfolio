import { AnimatingBall, BallEndDestination, SceneDimensions } from '../interfaces'

export const getNewDestination = (ballsHit: number): BallEndDestination => {
	if (ballsHit < 10) return BallEndDestination.WATER
	return BallEndDestination.HOLE_IN_ONE
}

export const getNewBall = (
	sceneState: SceneDimensions,
	destination: BallEndDestination
): AnimatingBall => {
	const rand_end = Math.floor((Math.random() * sceneState.scene_height) / 5)
	const rand_bezier = {
		x: Math.floor((Math.random() - 0.5) * 2 * sceneState.scene_height * 0.2),
		y: Math.floor((Math.random() - 0.5) * 2 * sceneState.scene_height * 0.2),
	}

	let end: AnimatingBall['position']['end']

	switch (destination) {
		case BallEndDestination.HOLE_IN_ONE:
			end = {
				x: sceneState.ballPositions.end_hole.x,
				y: sceneState.ballPositions.end_hole.y,
			}
			break
		default:
			end = {
				x: sceneState.ballPositions.end_water.x - rand_end,
				y: sceneState.ballPositions.end_water.y + rand_end / 2,
			}
			break
	}

	const newBall: AnimatingBall = {
		startTime: performance.now(),
		controlPointNudge: rand_bezier,
		progress: 0,
		position: {
			draw: sceneState.ballPositions.start,
			start: sceneState.ballPositions.start,
			end,
		},
	}
	return newBall
}
