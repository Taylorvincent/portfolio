import NotFound from '../src/404'

const SomeThingWentWrong = (): JSX.Element => {
	return (
		<div>
			<link rel="stylesheet" type="text/css" href="/404/styles.css" media="screen" />
			<NotFound></NotFound>
		</div>
	)
}

export default SomeThingWentWrong
