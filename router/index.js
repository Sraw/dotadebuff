import mainRouter from './mainRouter.js'
import funcRouter from './funcRouter.js'

export default function(app) {
	mainRouter(app)
	funcRouter(app)
}