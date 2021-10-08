import { Ref } from 'react'
import { SWING_HIT_DELAY } from '../constants'
import { BallEndDestination, SceneState } from '../interfaces'
interface Props {
	containerRef: Ref<HTMLDivElement>
}

const AnimatingBalls = ({ containerRef }: Props): JSX.Element => {
	return <div className="animating-balls-container" ref={containerRef}></div>
}

export default AnimatingBalls

export const launchBall = (
	animatingBallsContainer: HTMLDivElement,
	destination: BallEndDestination,
	sceneState: SceneState
): void => {
	const ballWrapperDiv = document.createElement('div')
	const ballDiv = document.createElement('div')
	const xDiv = document.createElement('div')
	const yDiv = document.createElement('div')
	ballWrapperDiv.className = 'ball-wrapper'
	xDiv.className = 'ball-X'
	yDiv.className = 'ball-Y'
	ballDiv.className = 'ball'

	ballWrapperDiv.appendChild(xDiv)
	xDiv.appendChild(yDiv)
	yDiv.appendChild(ballDiv)

	const xStart = ((Math.random() - 0.5) * 4 * sceneState.scene_scale_x).toFixed(2)
	const xEnd = ((Math.random() - 0.5) * 4 * sceneState.scene_scale_x).toFixed(2)
	const yStart = (Math.random() + 1 + sceneState.scene_scale_y).toFixed(2)
	const yEnd = (Math.random() + 1 + sceneState.scene_scale_y).toFixed(2)

	ballWrapperDiv.style.setProperty('--ball-x-bezier-start', xStart)
	ballWrapperDiv.style.setProperty('--ball-x-bezier-end', xEnd)

	ballWrapperDiv.style.setProperty('--ball-y-bezier-start', yStart)
	ballWrapperDiv.style.setProperty('--ball-y-bezier-end', yEnd)

	ballWrapperDiv.style.setProperty(
		'--ballpositions-end_water-x',
		(
			sceneState.ballPositions.end_water.x -
			Math.random() * 200 * sceneState.scene_scale_x
		).toString() + 'px'
	)
	ballWrapperDiv.style.setProperty(
		'--ballpositions-end_water-y',
		(
			sceneState.ballPositions.end_water.y +
			Math.random() * 50 * sceneState.scene_scale_y
		).toString() + 'px'
	)

	const ballShadowWrapperDiv = ballWrapperDiv.cloneNode(true) as HTMLDivElement

	ballShadowWrapperDiv.style.setProperty('--ball-color', '#222')
	ballShadowWrapperDiv.style.setProperty('--ball-y-bezier-start', '1')
	ballShadowWrapperDiv.style.setProperty('--ball-y-bezier-end', '1.05')

	animatingBallsContainer.appendChild(ballShadowWrapperDiv)
	animatingBallsContainer.appendChild(ballWrapperDiv)

	handleTransitions(ballWrapperDiv, destination)
	handleTransitions(ballShadowWrapperDiv, destination)

	setTimeout(() => {
		ballWrapperDiv.classList.add(destination)
		ballShadowWrapperDiv.classList.add(destination)
	}, SWING_HIT_DELAY)
}

const handleTransitions = (ballDiv: HTMLDivElement, destination: BallEndDestination): void => {
	ballDiv.ontransitionend = () => {
		if (destination === BallEndDestination.WATER) {
			ballDiv.remove()
		}
	}
}
