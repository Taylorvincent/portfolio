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

	ballWrapperDiv.style.setProperty(
		'--ball-x-bezier-start',
		destination === BallEndDestination.HOLE_IN_ONE ? '-0.5' : xStart
	)
	ballWrapperDiv.style.setProperty(
		'--ball-x-bezier-end',
		destination === BallEndDestination.HOLE_IN_ONE ? '1' : xEnd
	)

	ballWrapperDiv.style.setProperty('--ball-y-bezier-start', yStart)
	ballWrapperDiv.style.setProperty('--ball-y-bezier-end', yEnd)
	ballWrapperDiv.style.setProperty('--ball-hop-counter', '5')

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

	ballWrapperDiv.style.setProperty(
		'--ballpositions-end_green-x',
		(
			sceneState.ballPositions.end_hole.x +
			(Math.random() * 30 + 20) * sceneState.scene_scale_x
		).toString() + 'px'
	)
	ballWrapperDiv.style.setProperty(
		'--ballpositions-end_green-y',
		(
			sceneState.ballPositions.end_hole.y +
			(Math.random() * 30 + 20) * sceneState.scene_scale_y
		).toString() + 'px'
	)

	const ballShadowWrapperDiv = ballWrapperDiv.cloneNode(true) as HTMLDivElement

	ballShadowWrapperDiv.style.setProperty('--ball-color', '#222')
	ballShadowWrapperDiv.style.setProperty('--ball-y-bezier-start', '1')
	ballShadowWrapperDiv.style.setProperty('--ball-y-bezier-end', '1')
	ballShadowWrapperDiv.classList.add('shadow')

	animatingBallsContainer.appendChild(ballShadowWrapperDiv)
	animatingBallsContainer.appendChild(ballWrapperDiv)

	handleTransitions(ballWrapperDiv, destination)
	handleTransitions(ballShadowWrapperDiv, destination)

	setTimeout(() => {
		ballWrapperDiv.classList.add(
			destination === BallEndDestination.HOLE_IN_ONE ? 'GREEN' : destination
		)
		ballShadowWrapperDiv.classList.add(
			destination === BallEndDestination.HOLE_IN_ONE ? 'GREEN' : destination
		)
	}, SWING_HIT_DELAY)
}

const handleTransitions = (ballDiv: HTMLDivElement, destination: BallEndDestination): void => {
	ballDiv.ontransitionend = (e) => {
		if (destination === BallEndDestination.WATER) {
			ballDiv.remove()
		} else if (destination === BallEndDestination.HOLE_IN_ONE) {
			if (ballDiv.classList.contains('GREEN')) {
				requestAnimationFrame(() => {
					ballDiv.classList.replace('GREEN', 'GREEN_HOP')
					hop(ballDiv)
				})
			} else if (ballDiv.classList.contains('GREEN_HOP')) {
				hop(ballDiv)
			} else {
				const parentClass = (e.target as HTMLDivElement).parentElement?.className
				if (
					parentClass &&
					parentClass.includes('ball-wrapper') &&
					parentClass.includes(BallEndDestination.HOLE_IN_ONE)
				) {
					requestAnimationFrame(() => ballDiv.remove())
				}
			}
		}
	}
}

const hop = (ballDiv: HTMLDivElement): void => {
	const hopCounter = Number(ballDiv.style.getPropertyValue('--ball-hop-counter'))
	const newHopCounter = hopCounter - 1
	console.log(newHopCounter)

	requestAnimationFrame(() => {
		if (newHopCounter) {
			ballDiv.style.setProperty('--ball-hop-counter', newHopCounter.toString())
		} else {
			ballDiv.classList.replace('GREEN_HOP', BallEndDestination.HOLE_IN_ONE)
		}
	})
}
