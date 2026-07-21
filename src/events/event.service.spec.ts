import { afterEach, describe, expect, it, vi } from "vitest";
import { getEvents } from './event.service'
import { EVENT_BASE_URL } from "./event.api";

describe("Events service", () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("deve retornar a lista de eventos", async () => {

        const events = {
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
        }

        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(events),
        } as unknown as Response)


        await expect(getEvents()).resolves.toEqual(events)

        expect(fetchMock).toHaveBeenCalledWith(EVENT_BASE_URL, {
            signal: undefined,
        })
    });

    it("deve lançar um erro quando a resposta não for ok", async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
            status: 500,
        } as Response)

        await expect(getEvents()).rejects.toThrow(
            'Nao foi possivel carregar eventos.',
        )
    })

    it('deve tratar erros de rede', async () => {
        const networkError = new TypeError('Failed to fetch')

        vi.spyOn(globalThis, 'fetch').mockRejectedValue(networkError)

        await expect(getEvents()).rejects.toThrow(
            'Nao foi possivel carregar eventos.',
        )
    })

    it('deve preservar o erro original como causa', async () => {
        const networkError = new TypeError('Failed to fetch')

        vi.spyOn(globalThis, 'fetch').mockRejectedValue(networkError)

        expect.assertions(2)

        try {
            await getEvents()
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect((error as Error).cause).toBe(networkError)
        }
    })

    it('deve encaminhar o signal para o fetch e disparar erro quando signal for abortado', async () => {
        const controller = new AbortController()
        const abortError = new DOMException(
            'The operation was aborted.',
            'AbortError',
        )

        const fetchSpy = vi
            .spyOn(globalThis, 'fetch').mockRejectedValue(abortError)

        await expect(getEvents(controller.signal)).rejects.toBe(abortError)

        expect(fetchSpy).toHaveBeenCalledWith(
            EVENT_BASE_URL,
            expect.objectContaining({
                signal: controller.signal,
            }),
        )
    })

})