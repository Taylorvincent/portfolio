import { ProjectContent } from '../../data/projects'

interface Props {
	content: ProjectContent
}

const DefaultLayout = ({ content }: Props): JSX.Element => {
	return <h1>{content.title}</h1>
}

export default DefaultLayout
