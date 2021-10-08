import { BallEndDestination } from '../interfaces'

export const getNewDestination = (ballsHit: number): BallEndDestination => {
	if (ballsHit < 150) return BallEndDestination.WATER
	return BallEndDestination.HOLE_IN_ONE
}
