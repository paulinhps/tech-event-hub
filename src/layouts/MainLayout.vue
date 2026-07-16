<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots()
const hasAside = computed(() => Boolean(slots.sidebar))
</script>

<template>
    <div class="grid h-dvh grid-cols-1 grid-rows-[4rem_minmax(0,1fr)_4rem] overflow-hidden bg-gray-50 dark:bg-gray-900" :class="{
        'lg:grid-cols-[16rem_minmax(0,1fr)]': hasAside,
    }">
        <header id="main-header" v-if="$slots.header" class="border-b border-gray-200 bg-white
             dark:border-gray-800 dark:bg-gray-900" :class="{ 'lg:col-span-2': hasAside }"
            aria-label="Application Header">
            <slot name="header"></slot>
        </header>

        <aside id="main-sidebar" v-if="$slots.sidebar" class="hidden min-h-0 min-w-0 overflow-y-auto
             border-r border-gray-200 bg-white
             dark:border-gray-800 dark:bg-gray-900
             lg:block"
            aria-label="Navegação lateral">
            <slot name="sidebar"></slot>
        </aside>

        <main id="main-content" class="min-h-0 min-w-0 overflow-y-auto bg-gray-50
             dark:bg-gray-950" aria-label="Application Content">
            <slot name="default"></slot>
        </main>

        <footer class="border-t border-gray-200 bg-white
             dark:border-gray-800 dark:bg-gray-900" :class="{ 'lg:col-span-2': hasAside }" aria-label="Application Footer">
            <slot name="footer">
            </slot>
        </footer>
    </div>
</template>