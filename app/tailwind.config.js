/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.elm'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '75ch',
						'h1, h2, h3': {
							fontWeight: '600'
						}
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
