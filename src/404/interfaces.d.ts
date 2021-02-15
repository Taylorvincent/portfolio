import { Dispatch, SetStateAction } from 'react'
export interface SceneDimensions {
	window_width: number
	window_height: number
	scene_scale: number
	scene_height: number
	boat_y: number
	golfer_y: number
	ballPositions: BallPositions
}

export interface GolferState {
	isAnimating: boolean
}

export interface BallPositions {
	start: Point
	end_water: Point
	end_hole: Point
}

export interface Point {
	x: number
	y: number
}

export interface AnimatingBall {
	startTime: number
	progress: number
	isShadow?: boolean
	controlPointNudge: Point
	position: {
		draw: Point
		start: Point
		end: Point
	}
}

export interface OnClickGolfer {
	setGolferState: Dispatch<SetStateAction<GolferState>>
	ballPositions: BallPositions
	ballsArr: AnimatingBall[]
	setBallsArr: Dispatch<SetStateAction<AnimatingBall[]>>
}

export interface Word {
	text: string
	margin: {
		left: number
		top: number
	}
}

export interface PickSwearWord {
	arrSwearWords_In: string[]
	setArrSwearWords_In: Dispatch<SetStateAction<string[]>>
	setWords: Dispatch<SetStateAction<Word[]>>
	scene_scale: number
	scene_width: number
}

export interface SoundEffect {
	name: 'swing' | 'splash'
	volume: number
	ref: RefObject<HTMLAudioElement>
}

export interface Requests {
	wii_loop: XMLHttpRequest
	wii_preloop: XMLHttpRequest
	// [name: string]: XMLHttpRequest
}

export interface Sources {
	wii_loop: AudioBufferSourceNode
	wii_preloop: AudioBufferSourceNode
}
