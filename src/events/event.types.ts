
export type EventFormat = 'online' | 'in-person' | 'hybrid'
export type EventStatus = 'draft' | 'published' | 'cancelled'

export const EVENT_FORMAT_LABELS = {
    online: 'Online',
    'in-person': 'Presencial',
    hybrid: 'Híbrido',
} satisfies Record<EventFormat, string>

export const EVENT_STATUS_LABELS = {
    draft: 'Rascunho',
    published: 'Publicado',
    cancelled: 'Cancelado',
} satisfies Record<EventStatus, string>

export type PublicEventSummaryDto = {
    id: number | string
    slug: string
    title: string
    summary: string
    category: string
    format: EventFormat
    startsAt: string
    endsAt: string
    location: string | null
    coverImageUrl?: string
}

export type TechEvent = {
    id: number | string
    slug: string
    title: string
    summary: string
    description: string
    category: string
    format: EventFormat
    status: EventStatus
    startsAt: Date
    endsAt: Date
    capacity: number
    location: string | null
    coverImageUrl?: string
    speakerIds: number[]
}