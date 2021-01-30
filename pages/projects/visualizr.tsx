import { ProjectContent } from '../../data/projects'
import Layout from '../../src/Layout'
import DefaultLayout from '../../src/Projects/DefaultLayout'

const content: ProjectContent = {
	title: 'Visualizr thesis & hobby project',
	color: 'bg-black',
	description:
		'Three js music visualizer + user portal. Using the MERN stack (Mongoose, Express, React , Node)',
	video: 'https://player.vimeo.com/video/222456545?color=000000&title=0&byline=0',
}

const Page = (): JSX.Element => (
	<Layout>
		<DefaultLayout content={content}></DefaultLayout>
	</Layout>
)

export default Page
