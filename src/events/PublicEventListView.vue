<script setup lang="ts">
import Page from '@shared/ui/Page.vue';
import EventCard from './EventCard.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { EventFormat, PublicEventSummaryDto } from './event.types';
import { getEvents } from './event.service';

const eventSummaries = ref<PublicEventSummaryDto[]>([]);

// Define a reactive set to track favorite events
// TODO: In a real application, you would likely want to persist this state in a store or backend
const favoriteEvents = ref<Set<number | string>>(new Set());

type PublicEventListItem = {
  id: number | string
  slug: string
  title: string
  summary: string
  category: string
  format: EventFormat
  startsAt: string
  location: string | null
  coverImageUrl?: string
  isFavorite: boolean
}

function toggleFavorite(eventId: number | string, isFavorite: boolean) {
  console.log(`Solicitado alteração de favorito para o evento com ID ${eventId}`);
  if (isFavorite) {
    favoriteEvents.value.add(eventId);
  } else {
    favoriteEvents.value.delete(eventId);
  }
}

let loadController: AbortController | null = null

const events = computed<PublicEventListItem[]>(() => eventSummaries.value.map((event) => ({
  id: event.id,
  slug: event.slug,
  title: event.title,
  summary: event.summary,
  category: event.category,
  format: event.format,
  startsAt: event.startsAt,
  location: event.location,
  coverImageUrl: event.coverImageUrl,
  isFavorite: favoriteEvents.value.has(event.id),
})));

async function loadEvents() {

  console.log('loading events...');
  loadController?.abort()
  const currentController = new AbortController()
  loadController = currentController
  const signal = loadController.signal;

  try {
    eventSummaries.value = await getEvents(signal);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Request aborted');
      return;
    }
    throw error;
  }
  finally {
    if (loadController === currentController) {
      loadController = null
    }
  }

}

onMounted(async () => {

  await loadEvents();

});

onUnmounted(() => {
  loadController?.abort()
  loadController = null
})

</script>

<template>
  <Page title="Eventos" description="Encontre eventos de tecnologia para participar.">
    <section aria-label="Catálogo de eventos">
      <div id="event-grid" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <EventCard v-for="event in events" :key="event.id" :event-id="event.id" :title="event.title"
          :summary="event.summary" :date="event.startsAt" :location="event.location" :category="event.category"
          :format="event.format" :coverImageUrl="event.coverImageUrl" :event-slug="event.slug"
          :is-favorite="event.isFavorite" @toggle-favorite="toggleFavorite" />
      </div>
    </section>
  </Page>
</template>