<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string
    description?: string
}>(), {
    title: undefined,
    description: undefined
})
</script>

<template>
    <div class="mx-auto w-full max-w-7xl p-4 md:p-6">
        <header v-if="title" class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                    {{ title }}
                </h1>

                <p v-if="description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ description }}
                </p>
            </div>

            <div v-if="$slots.actions">
                <slot name="actions" />
            </div>
        </header>

        <div class="space-y-6">
            <slot />
        </div>
    </div>
</template>