import path from 'path'

let config = {
    "viewDir": path.join(__dirname, '../views'),
    "staticDir": path.join(__dirname, '../assets')
}

const init = () => {
	if (process.env.NODE_ENV == 'development') {
		const localConfig = {
			port: '8081'
		}
		Object.assign(config,localConfig)

	}
	if (process.env.NODE_ENV == 'production'){
		const localConfig = {
			port: '80'
		}
		Object.assign(config,localConfig)
	}
}

init()

export default config