<script setup lang="ts">
import MainLayout from '@layouts/MainLayout.vue';
</script>

<template>
    <MainLayout>
        <template v-slot:header>
             <div class="size-full bg-[#b2f2bb]"></div>
        </template>
        <article id="content-page">
            <RouterView />
        </article>
        <template v-slot:footer>
            <div class="size-full bg-[#ffec99]"></div>
        </template>
    </MainLayout>
</template>