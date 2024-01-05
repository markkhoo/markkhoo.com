<script lang="ts">
  import ResizableWindow from '$lib/components/resizableWindow.svelte';
</script>

<main>
  <ResizableWindow>box</ResizableWindow>
  <ResizableWindow initPosTop={50} initPosLeft={50} zIndex={-2}>another box lmao</ResizableWindow>
</main>

<style>
  main {
    display: block;
    position: relative;
  }
</style>
