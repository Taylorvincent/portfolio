import { ProjectContent } from '../../data/projects'
import Layout from '../../src/Layout'
import DefaultLayout from '../../src/Projects/DefaultLayout'

const content: ProjectContent = {
	title: 'NodeJS real time Q&A app',
	color: 'bg-black',
	description: 'built with express, websockets, mongoose and mongoDB',
	video: 'https://player.vimeo.com/video/172045069?color=ffffff&title=0&byline=0',
}

const Page = (): JSX.Element => (
	<Layout>
		<DefaultLayout content={content}></DefaultLayout>
	</Layout>
)

export default Page
