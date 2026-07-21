import { describe, expect, it } from "vitest";
import EventCard from "./EventCard.vue";
import { mount, RouterLinkStub } from '@vue/test-utils'
import { type EventFormat } from "./event.types.ts";

function mountEventCard(props?: {
    date?: Date | string
    isFavorite?: boolean
    eventSlug?: string
    location?: string | null
    coverImageUrl?: string
    format?: EventFormat
}) {
    return mount(EventCard, {
        props: {
            eventId: "event-1",
            eventSlug: props?.eventSlug ?? "event-test",
            title: "Event Test",
            summary: "This is a Event Test Summary",
            date: props?.date ?? new Date(2026, 7, 7),
            location: props?.location !== undefined ? props.location : "Event location",
            category: "Category",
            format: props?.format ?? "in-person",
            coverImageUrl: props?.coverImageUrl,
            isFavorite: props?.isFavorite ?? false
        },
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
            }
        }
    })
}

describe('Card de Eventos', () => {

    it('apresenta os detalhes de um evento', () => {

        const expectedDate = new Date(2026, 10, 1, 9, 0, 0)
        const wrapper = mountEventCard({ date: expectedDate, coverImageUrl: 'coverImageUrl' })

        const cover = wrapper.find('img[data-cover]')

        expect(cover.attributes('src')).toBe('coverImageUrl')
        expect(cover.attributes('alt')).toBe(
            'Imagem de capa do evento Event Test',
        )
        expect(wrapper.find('span[data-category]').text()).toBe('Category')
        expect(wrapper.find('span[data-format]').text()).toBe('Presencial')
        expect(wrapper.find('h2[data-title]').text()).toBe("Event Test")
        expect(wrapper.find('p[data-summary]').text()).toBe("This is a Event Test Summary")
        expect(wrapper.find('time[data-date]').text()).toBe("01 nov · 09:00")
        expect(wrapper.find('span[data-location]').text()).toBe("Event location")

    })

     it('não apresenta a localização quando a prop location for null', () => {

        const wrapper = mountEventCard({ location: null })

        expect(wrapper.find('span[data-location]').exists()).toBe(false)

    })

    it('não apresenta a data quando o valor estiver invalido com %s', () => {

        const wrapper = mountEventCard({ date: 'data-invalida' })

        expect(wrapper.find('time[data-date]').exists()).toBe(false)

    })

    it('apresenta o botão como pressionado quando o evento é favorito', () => {

        const wrapper = mountEventCard({ isFavorite: true });

        const favoriteToggle = wrapper.find('button[data-favorite]')

        expect(favoriteToggle.attributes('aria-pressed')).toBe("true")
        expect(favoriteToggle.attributes('aria-label')).toBe(
            'Remover dos favoritos',
        )

    })

    it('apresenta o botão como não pressionado quando o evento não é favorito', () => {

        const wrapper = mountEventCard({ isFavorite: false });

        const favoriteToggle = wrapper.find('button[data-favorite]')

        expect(favoriteToggle.attributes('aria-pressed')).toBe("false")
        expect(favoriteToggle.attributes('aria-label')).toBe(
            'Adicionar aos favoritos',
        )

    })

    it('emite a solicitação para adicionar o evento aos favoritos ao clicar', async () => {

        const isFavorite = false;
        const wrapper = mountEventCard({ isFavorite });

        await wrapper.find('button[data-favorite]').trigger('click')

        expect(wrapper.emitted('toggleFavorite')).toEqual([["event-1", true]])

    })

    it('emite a solicitação para remover o evento dos favoritos ao clicar', async () => {

        const isFavorite = true;
        const wrapper = mountEventCard({ isFavorite });

        await wrapper.find('button[data-favorite]').trigger('click')

        expect(wrapper.emitted('toggleFavorite')).toEqual([["event-1", false]])

    })

    it('apresenta imagem padrão quando o endereço da url da imagem não é informada', () => {

        const wrapper = mountEventCard({ coverImageUrl: undefined }) // converImageUrl is explicit undefined

        const cover = wrapper.find('img[data-cover]')

        expect(cover.attributes('src')).toBe('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80')

    })

    it('apresenta botão para navegar para o evento pelo slug', () => {

        const eventSlug = "event-test1"
        const wrapper = mountEventCard({ eventSlug })

        const routerLink = wrapper.getComponent(RouterLinkStub)


        expect(routerLink.text()).toBe("Ver evento");

        expect(routerLink.props('to')).toEqual({
            name: 'event-details',
            params: {
                slug: eventSlug,
            },
        })

    })

    const formatCases: Array<[EventFormat, string]> = [
        ['hybrid', 'Híbrido'],
        ['in-person', 'Presencial'],
        ['online', 'Online'],
    ]

    it.each(formatCases)('exibe a descrição correta do formato de evento para %s', (format, formatLabel) => {

        const wrapper = mountEventCard({ format })

        expect(wrapper.find('span[data-format]').text()).toBe(formatLabel)
    })


})