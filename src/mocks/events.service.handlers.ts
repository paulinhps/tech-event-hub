import { http, HttpResponse, type HttpHandler } from "msw";
import { loadDatabase } from "@/mocks/db/database";
import type { PublicEventSummaryDto, TechEvent } from "@/events/event.types";
import { EVENT_BASE_URL } from "@/events/event.api";

const handlers: HttpHandler[] = [
    http.get(EVENT_BASE_URL, () => {

        const database = loadDatabase();

        const publicEvents = database.events.map((ev) => ({
            id: ev.id,
            title: ev.title,
            summary: ev.summary,
            startsAt: ev.startsAt,
            endsAt: ev.endsAt,
            location: `${ev.location.city}, ${ev.location.state}`,
            category: database.categories.find((c) => c.id === ev.categoryId)?.name,
            format: ev.format,
            coverImageUrl: ev.coverImageUrl,
            slug: ev.slug,
        } as PublicEventSummaryDto));

        return HttpResponse.json<PublicEventSummaryDto[]>(publicEvents)
    }),
]

export default handlers;