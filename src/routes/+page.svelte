<script lang="ts">
  import ResizableWindow from '$lib/components/resizableWindow.svelte';
  import WinXPWindow from '$lib/components/win-xp-window.svelte';

  let zIndex = 0;

  function bringToFront() {
    zIndex += 1;
    return zIndex;
  }
</script>

<main>
  <ResizableWindow zIndex={bringToFront}>
    <WinXPWindow></WinXPWindow>
  </ResizableWindow>
  <ResizableWindow zIndex={bringToFront} initPosTop={50} initPosLeft={50}>
    <WinXPWindow headerText="hello world">
      <p>hello world</p>
    </WinXPWindow>
  </ResizableWindow>
</main>

<style>
  main {
    display: block;
    position: relative;
  }
</style>
