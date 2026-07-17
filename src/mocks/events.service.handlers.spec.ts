import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import handlers from "./events.service.handlers";
import { setupServer } from 'msw/node'
import { loadDatabase } from "@/mocks/db/database";

const server = setupServer(...handlers)
const apiUrl = (path: string) => new URL(path, window.location.origin)

vi.mock('@/mocks/db/database', () => ({
    loadDatabase: vi.fn()
}));

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
})


afterEach(() => {
    server.resetHandlers()
    localStorage.clear()
})

afterAll(() => {
    server.close()
})

describe("Mock Events Service Handlers", () => {

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(loadDatabase).mockReturnValue({
            events: [{
                "id": "event-001",
                "organizerId": "user-organizer-001",
                "slug": "vue-summit-brasil-2026",
                "title": "Vue Summit Brasil 2026",
                "summary": "Um dia de arquitetura, performance e boas praticas para quem constroi aplicacoes Vue em producao.",
                "description": "O Vue Summit Brasil reune profissionais da comunidade para discutir decisoes reais de arquitetura, evolucao de design systems, performance e qualidade. A programacao combina palestras tecnicas e estudos de caso voltados a equipes que utilizam Vue no dia a dia.",
                "categoryId": "category-frontend",
                "format": "in-person",
                "status": "published",
                "startsAt": "2026-09-18T09:00:00-03:00",
                "endsAt": "2026-09-18T18:00:00-03:00",
                "capacity": 350,
                "registrationCount": 287,
                "location": {
                    "type": "physical",
                    "venue": "Centro de Convencoes Frei Caneca",
                    "address": "Rua Frei Caneca, 569",
                    "city": "Sao Paulo",
                    "state": "SP"
                },
                "coverImageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
                "sessions": [
                    {
                        "id": "session-001",
                        "title": "Arquitetura Vue que continua saudavel depois do MVP",
                        "description": "Decisoes de composicao, estado e fronteiras de feature para projetos que precisam crescer.",
                        "startsAt": "2026-09-18T10:00:00-03:00",
                        "endsAt": "2026-09-18T10:50:00-03:00",
                        "room": "Auditorio Principal",
                        "speakerIds": [
                            "speaker-001"
                        ]
                    },
                    {
                        "id": "session-002",
                        "title": "Performance percebida em interfaces modernas",
                        "description": "Como medir e melhorar carregamento, interacao e estabilidade visual em aplicacoes Vue.",
                        "startsAt": "2026-09-18T14:00:00-03:00",
                        "endsAt": "2026-09-18T14:50:00-03:00",
                        "room": "Auditorio Principal",
                        "speakerIds": [
                            "speaker-002"
                        ]
                    }
                ],
                "createdAt": "2026-02-10T14:20:00-03:00",
                "updatedAt": "2026-07-08T11:30:00-03:00"
            }],
            categories: [{
                "id": "category-frontend",
                "name": "Frontend"
            }],
        })
    })

    it("deve carregar os eventos mockados", () => {
        fetch(apiUrl('/api/events'))
            .then(response => response.json())
            .then(data => {
                expect(data).toBeDefined()
                expect(data.length).toBeGreaterThan(0)
                expect(data[0].id).toBe("event-001")
                expect(data[0].title).toBe("Vue Summit Brasil 2026")
            })
    });
});