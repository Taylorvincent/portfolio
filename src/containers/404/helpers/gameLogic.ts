import { Dispatch, SetStateAction } from 'react'
import { BallEndDestination, DestinationCredits } from '../interfaces'

export const getNewDestination = (
	destinationCredits: DestinationCredits,
	setDestinationCredits: Dispatch<SetStateAction<DestinationCredits>>
): BallEndDestination => {
	const holeInOne = destinationCredits[BallEndDestination.HOLE_IN_ONE]
	if (holeInOne !== undefined && holeInOne > 0) {
		setDestinationCredits((credits) => {
			const newCredits = { ...credits }
			newCredits[BallEndDestination.HOLE_IN_ONE] =
				(credits[BallEndDestination.HOLE_IN_ONE] || 1) - 1
			return newCredits
		})
		return BallEndDestination.HOLE_IN_ONE
	}

	return BallEndDestination.WATER
}
