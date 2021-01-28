import { ProjectContent } from '../../data/projects'
import Layout from '../../src/Layout'
import DefaultLayout from '../../src/Projects/DefaultLayout'

const content: ProjectContent = {
	title: 'DiveAdvisor, Instagram for divers',
	color: 'bg-teal',
	description: 'Second year @IMD Mechelen exam php project, no framework.',
	video: 'https://player.vimeo.com/video/172050347?color=ffffff&title=0&byline=0',
}

const Page = (): JSX.Element => (
	<Layout title={content.title}>
		<DefaultLayout content={content}></DefaultLayout>
	</Layout>
)

export default Page
