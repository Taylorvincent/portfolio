import { ProjectContent } from '../../data/projects'
import Layout from '../../Layout'
import DefaultLayout from '../../containers/Projects/DefaultLayout'

const content: ProjectContent = {
	title: 'DiveAdvisor, Instagram for divers',
	color: 'bg-teal',
	description: 'Second year @IMD Mechelen exam php project, no framework.',
	video: 'https://player.vimeo.com/video/172050347?color=ffffff&title=0&byline=0',
}

const Page = (): JSX.Element => (
	<Layout>
		<DefaultLayout content={content}></DefaultLayout>
	</Layout>
)

export default Page
