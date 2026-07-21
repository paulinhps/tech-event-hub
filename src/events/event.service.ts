import { EVENT_BASE_URL } from "./event.api";
import type { PublicEventSummaryDto } from "./event.types";

export async function getEvents(signal?: AbortSignal): Promise<PublicEventSummaryDto[]> {
    // Simulate an API call

    try {
        const response = await fetch(EVENT_BASE_URL, {
            signal,
        })
        if (!response.ok) {
            throw new Error('Nao foi possivel carregar eventos.')
        }

        return (await response.json()) as PublicEventSummaryDto[]
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw error
        }

        throw new Error('Nao foi possivel carregar eventos.', {
            cause: error,
        })
    }

}