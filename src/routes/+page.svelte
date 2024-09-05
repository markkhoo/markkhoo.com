<script lang="ts">
  import ResizableWindow from '$lib/components/resizableWindow.svelte';
  import WinXPWindow from '$lib/components/win-xp-window.svelte';
  import WinXpTaskbar from '$lib/components/win-xp-taskbar.svelte';
  import type { KeyType, WindowType } from '$lib/types';
  import Bliss from '$lib/assets/bliss.jpg';
  import MyComputer from '$lib/assets/explorer.exe_14_100-11.png';
  import InternetExplorer from '$lib/assets/iexplore.exe_14_32528-8.png';
  import RecyclingBin from '$lib/assets/shell32.dll_14_32-6.png';

  let zIndex = 0;

  const winMC: WindowType = {
    key: 'My Computer',
    active: true,
    initPosLeft: 50,
    initPosTop: 50,
    src: MyComputer,
    state: 'normal',
    onMinimizeClick: () => console.log('minimize clicked: My Computer'),
    onMaximizeClick: () => console.log('maximize clicked: My Computer'),
    onCloseClick: () => console.log('close clicked: My Computer'),
    onTaskbarClick: () => bringToFrontAndMakeActive('My Computer')
  };
  const winIE: WindowType = {
    key: 'Internet Explorer',
    active: false,
    initPosLeft: 100,
    initPosTop: 100,
    src: InternetExplorer,
    state: 'normal',
    onMinimizeClick: () => console.log('minimize clicked: Internet Explorer'),
    onMaximizeClick: () => console.log('maximize clicked: Internet Explorer'),
    onCloseClick: () => console.log('close clicked: Internet Explorer'),
    onTaskbarClick: () => bringToFrontAndMakeActive('Internet Explorer')
  };
  const winRB: WindowType = {
    key: 'Recycling Bin',
    active: false,
    initPosLeft: 150,
    initPosTop: 150,
    src: RecyclingBin,
    state: 'closed',
    onMinimizeClick: () => console.log('minimize clicked: Recycling Bin'),
    onMaximizeClick: () => console.log('maximize clicked: Recycling Bin'),
    onCloseClick: () => console.log('close clicked: Recycling Bin'),
    onTaskbarClick: () => bringToFrontAndMakeActive('Recycling Bin')
  };

  let windowMap: Map<KeyType, WindowType> = new Map<KeyType, WindowType>([
    ['My Computer', winMC],
    ['Internet Explorer', winIE],
    ['Recycling Bin', winRB]
  ]);

  function setActiveWindow(windowKey: KeyType): Map<KeyType, WindowType> {
    windowMap.forEach((value, key) => {
      if (key === windowKey) {
        value.active = true;
      } else {
        value.active = false;
      }
    });

    return windowMap;
  }

  function bringToFrontAndMakeActive(windowKey: KeyType) {
    windowMap = setActiveWindow(windowKey); // This is necessary to trigger a re-render

    // TODO: If the window is minimized, restore it

    zIndex += 1;
    return zIndex;
  }
</script>

<main>
  <img alt="Bliss Wallpaper" class="bliss" src={Bliss} />

  {#if winIE.state !== 'closed'}
    <ResizableWindow
      zIndex={() => bringToFrontAndMakeActive(winIE.key)}
      initPosTop={winIE.initPosTop}
      initPosLeft={winIE.initPosLeft}
    >
      <WinXPWindow headerText={winIE.key} headerIcon={winIE.src}>
        <p>test</p>
      </WinXPWindow>
    </ResizableWindow>
  {/if}
  {#if winMC.state !== 'closed'}
    <ResizableWindow
      zIndex={() => bringToFrontAndMakeActive(winMC.key)}
      initPosTop={winMC.initPosTop}
      initPosLeft={winMC.initPosLeft}
    >
      <WinXPWindow headerText={winMC.key} headerIcon={winMC.src}>
        <p>test</p>
      </WinXPWindow>
    </ResizableWindow>
  {/if}
  {#if winRB.state !== 'closed'}
    <ResizableWindow
      zIndex={() => bringToFrontAndMakeActive(winRB.key)}
      initPosTop={winRB.initPosTop}
      initPosLeft={winRB.initPosLeft}
    >
      <WinXPWindow headerText={winRB.key} headerIcon={winRB.src}>
        <p>test</p>
      </WinXPWindow>
    </ResizableWindow>
  {/if}

  <WinXpTaskbar {windowMap} />
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
    pointer-events: none;
  }
</style>
