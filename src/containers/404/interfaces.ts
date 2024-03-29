import { Dispatch, RefObject, SetStateAction } from 'react'

export interface SceneState {
	window_width: number
	window_height: number
	scene_scale_x: number
	scene_scale_y: number
	scene_height: number
	boat_y: number
	golfer_y: number
	ballPositions: BallPositions
}

export interface GolferState {
	isAnimating: boolean
	canClick: boolean
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

export interface OnClickGolfer {
	setGolferState: Dispatch<SetStateAction<GolferState>>
	ballPositions: BallPositions
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
	scene_scale_x: number
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

export enum BallEndDestination {
	WATER = 'WATER',
	HOLE_IN_ONE = 'HOLE_IN_ONE',
}
