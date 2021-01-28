export interface Project {
	title: string
	tags: string[]
	img: string
	url?: string
	slug?: string
	isWide?: boolean
}

export interface ProjectContent {
	title: string
	color: string
	description: string
	video: string
}

const projectsContent: Project[] = [
	{
		title: 'Browser music Visualizr',
		url: 'https://visualizr.live',
		tags: ['React', 'Three.js', 'Redux', 'MongoDB', 'Express'],
		img: '/project-covers/visualizr.jpg',
		slug: '/projects/visualizr',
		isWide: true,
	},
	{
		title: 'Nodejs Q&A app',
		tags: ['Websockets', 'Express', 'MongoDB'],
		slug: '/projects/liveQA',
		img: '/project-covers/liveqa.jpg',
	},
	{
		title: 'DiveAdvisor PHP Project',
		tags: ['PHP/Laravel'],
		slug: '/projects/diveadvisor',
		img: '/project-covers/diveadvisor.jpg',
		// content: {
		// 	color: '#00c9f9',
		// 	description: 'Instagram for divers',
		// 	video: 'https://player.vimeo.com/video/172050347?color=ffffff&title=0&byline=0',
		// },
	},
	{
		title: '404 Pixelgolf',
		tags: ['React', 'Hooks'],
		slug: '/projects/404',
		img: '/project-covers/404.png',
	},
	{
		title: 'Dracula Google Doodle',
		tags: ['CSS animations'],
		url: 'http://animation.weareimd.be/vincenttaylor/',
		img: '/project-covers/doodle.jpg',
	},
]

export default projectsContent
