import { ProjectContent } from '../../data/projects'
import Layout from '../../src/Layout'
import DefaultLayout from '../../src/Projects/DefaultLayout'

const content: ProjectContent = {
	title: 'NodeJS real time Q&A app',
	color: '#000000',
	description: 'NodeJS real time Q&A app built with express, websockets, mongoose and mongoDB',
	video: 'https://player.vimeo.com/video/172045069?color=ffffff&title=0&byline=0',
}

const Page = (): JSX.Element => (
	<Layout title={content.title}>
		<DefaultLayout content={content}></DefaultLayout>
	</Layout>
)

export default Page
