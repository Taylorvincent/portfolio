const Header = (): JSX.Element => {
	return (
		<header className="container flex flex-wrap mx-auto p-8 pb-0 bg-black text-white">
			<img
				className="rounded-full mb-8 mr-8"
				style={{ width: 200, height: 200 }}
				alt="headshot of me!"
				src="/headshot-200.jpg"
			></img>
			<div className="text-xl max-w-4xl pb-8">
				<h2 className="pb-8 lg:pt-4">
					Hi, I'm Vincent!{' '}
					<span role="img" aria-label="wave">
						👋
					</span>
				</h2>
				<p>I'm a creative full-stack developer, with a focus on modern front-end development.</p>
				<p>
					When not coding I'm either gaming, keyboard hoarding or playing{' '}
					<span role="img" aria-label="golf">
						🏌️‍♂️ ⛳
					</span>{' '}
					when the weather allows it.
				</p>
			</div>
		</header>
	)
}

export default Header
