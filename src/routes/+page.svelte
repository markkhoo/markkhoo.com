<script lang="ts">
  import ResizableWindow from '$lib/components/resizableWindow.svelte';
  import WinXPWindow from '$lib/components/win-xp-window.svelte';
  import WinXpTaskbar from '$lib/components/win-xp-taskbar.svelte';
  import Bliss from '$lib/assets/bliss.jpg';

  let zIndex = 0;

  function bringToFront() {
    zIndex += 1;
    return zIndex;
  }
</script>

<main>
  <img alt="Bliss Wallpaper" class="bliss" src={Bliss} />
  <ResizableWindow zIndex={bringToFront}>
    <WinXPWindow></WinXPWindow>
  </ResizableWindow>
  <ResizableWindow zIndex={bringToFront} initPosTop={50} initPosLeft={50}>
    <WinXPWindow headerText="My Computer">
      <p>hello world</p>
    </WinXPWindow>
  </ResizableWindow>
  <WinXpTaskbar />
</main>

<style>
  main {
    display: block;
    position: relative;
    height: 100vh;
  }

  .bliss {
    min-height: 100vh;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
  }
</style>
