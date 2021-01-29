import Link from 'next/link'
import { ProjectContent } from '../../data/projects'

interface Props {
	content: ProjectContent
}

const DefaultLayout = ({ content }: Props): JSX.Element => {
	return (
		<div className={`text-white  ${content.color}`}>
			<div className={`text-xl p-4 mb-4 sticky top-0 ${content.color}`}>
				<Link href="/">{`< Back`}</Link>
			</div>
			<div className="container mx-auto min-h-screen p-4">
				<h1 className="text-7xl mb-8">{content.title}</h1>
				<p className="text-4xl mb-16">{content.description}</p>

				<div>
					<iframe
						className="w-full"
						title={'Video demo for ' + content.title + '.'}
						src={content.video}
						width="1344"
						height="734"
						frameBorder="0"
						allowFullScreen
					></iframe>
					{/* {content.video_description && (
					<p
					className="video_description"
					dangerouslySetInnerHTML={{ __html: content.video_description }}
					></p>
				)} */}
				</div>
			</div>
		</div>
	)
}

export default DefaultLayout
