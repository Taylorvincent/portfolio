import Link from 'next/link'
import { ProjectContent } from '../../data/projects'
import styles from './styles.module.scss'

interface Props {
	content: ProjectContent
}

const DefaultLayout = ({ content }: Props): JSX.Element => {
	return (
		<div className={`text-white  ${content.color}`}>
			<div className={`${content.color} border-b-2 md:border-b-0 text-xl p-4 mb-4 sticky top-0 `}>
				<Link href="/">{`< Back`}</Link>
			</div>
			<div className="container mx-auto min-h-screen p-4">
				<h1 className="mb-8">{content.title}</h1>
				<p className="text-4xl mb-16">{content.description}</p>
				<div className={styles.embedContainer}>
					<iframe
						title={'Video demo for ' + content.title + '.'}
						src={content.video}
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
