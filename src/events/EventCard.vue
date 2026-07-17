<script setup lang="ts">
import { computed } from 'vue'
import { EVENT_FORMAT_LABELS, type EventFormat } from './event.types'


type EventCardProps = {
  eventId: number | string
  eventSlug: string
  title: string
  summary: string
  date: Date | string
  location: string | null
  category: string
  format: EventFormat
  coverImageUrl?: string
  isFavorite: boolean
}


const props = withDefaults(defineProps<EventCardProps>(), {
  coverImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
})

const emit = defineEmits<{
  toggleFavorite: [id: number | string, isFavorite: boolean]
}>()

const formattedDate = computed(() => {
  const date = new Date(props.date)

  const parts = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''

  const day = getPart('day')
  const month = getPart('month').replace('.', '')
  const hour = getPart('hour')
  const minute = getPart('minute')

  return `${day} ${month} · ${hour}:${minute}`
});

const formatLabel = computed(() => EVENT_FORMAT_LABELS[props.format])

</script>

<template>
  <article
    class="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div class="relative aspect-[16/9] overflow-hidden bg-slate-900">
      <img data-cover class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        :src="coverImageUrl" :alt="`Imagem de capa do evento ${title}`" />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/10">
      </div>
      <button data-favorite type="button"
        class="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white text-brand-600 shadow-lg transition hover:scale-105 hover:bg-brand-50 focus:outline-none focus:ring-4 focus:ring-brand-100"
        :aria-pressed="props.isFavorite"
        :aria-label="props.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        @click="emit('toggleFavorite', eventId, !props.isFavorite)">
        <svg aria-hidden="true" class="size-6" viewBox="0 0 24 24" :fill="props.isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      </button>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-medium text-brand-700">
          <span class="size-1.5 rounded-full bg-brand-600"></span>
          <span data-category>{{ category }}</span>
        </span>

        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <svg aria-hidden="true" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span data-format>{{ formatLabel }}</span>
        </span>
      </div>

      <h2 data-title class="mt-5 text-xl font-bold leading-7 tracking-tight text-slate-900">{{ title }}</h2>

      <p data-summary class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{{ summary }}</p>

      <div class="mt-auto pt-5">
        <div class="border-t border-slate-200 pt-4">
          <div class="space-y-3 text-sm text-slate-700">
            <div class="flex items-center gap-2.5">
              <svg aria-hidden="true" class="size-5 shrink-0 text-brand-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <time data-date class="font-medium">{{ formattedDate }}</time>
            </div>

            <div class="flex items-center gap-2.5" v-if="location">
              <svg aria-hidden="true" class="size-5 shrink-0 text-brand-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span data-location class="truncate font-medium">{{ location }}</span>
            </div>
          </div>

          <RouterLink :to="{ name: 'event-details', params: { slug: eventSlug } }"
            class="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600 transition hover:text-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">
            Ver evento
            <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>