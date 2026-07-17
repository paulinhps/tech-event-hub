
import { HttpHandler } from 'msw'
import eventHandlers from './events.service.handlers'

export const handlers: HttpHandler[] = [...eventHandlers]