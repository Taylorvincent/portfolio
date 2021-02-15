import NotFound from '../containers/404'
import Layout from '../Layout'

const SomeThingWentWrong = (): JSX.Element => {
	return (
		<Layout>
			<link rel="stylesheet" type="text/css" href="/404/styles.css" media="screen" />
			<NotFound></NotFound>
		</Layout>
	)
}

export default SomeThingWentWrong
