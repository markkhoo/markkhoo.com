<script lang="ts">
  import { onMount } from 'svelte';
  import type { KeyType, WindowType } from '$lib/types';
  import StartButton from '$lib/assets/start_button.png';
  import SystemTrayArrow from '$lib/assets/system_tray_arrow.png';
  import SoundSettings from '$lib/assets/mmsys.cpl_14_4354-7.png';
  import SystemAlert from '$lib/assets/sprb040D.dll_14_6106_1037-5.png';
  import TaskMgr01 from '$lib/assets/taskmgr/taskmgr.exe_14_127.png';
  import TaskMgr02 from '$lib/assets/taskmgr/taskmgr.exe_14_128.png';
  import TaskMgr03 from '$lib/assets/taskmgr/taskmgr.exe_14_129.png';
  import TaskMgr04 from '$lib/assets/taskmgr/taskmgr.exe_14_130.png';
  import TaskMgr05 from '$lib/assets/taskmgr/taskmgr.exe_14_131.png';
  import TaskMgr06 from '$lib/assets/taskmgr/taskmgr.exe_14_132.png';
  import TaskMgr07 from '$lib/assets/taskmgr/taskmgr.exe_14_133.png';
  import TaskMgr08 from '$lib/assets/taskmgr/taskmgr.exe_14_134.png';
  import TaskMgr09 from '$lib/assets/taskmgr/taskmgr.exe_14_135.png';
  import TaskMgr10 from '$lib/assets/taskmgr/taskmgr.exe_14_136.png';
  import TaskMgr11 from '$lib/assets/taskmgr/taskmgr.exe_14_137.png';
  import TaskMgr12 from '$lib/assets/taskmgr/taskmgr.exe_14_138.png';

  export let windowMap: Map<KeyType, WindowType> = new Map<KeyType, WindowType>();

  let currentTime = '';
  let currentTaskMgr = TaskMgr01;

  const taskMgrImages = [
    TaskMgr01,
    TaskMgr02,
    TaskMgr03,
    TaskMgr04,
    TaskMgr05,
    TaskMgr06,
    TaskMgr07,
    TaskMgr08,
    TaskMgr09,
    TaskMgr10,
    TaskMgr11,
    TaskMgr12
  ] as const;
  const weights = [256, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1] as const;

  function getRandomWeightedImage() {
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) return taskMgrImages[i];
      random -= weights[i];
    }
    return taskMgrImages[0];
  }

  function updateTime() {
    const now = new Date();
    currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function updateImage() {
    currentTaskMgr = getRandomWeightedImage();
  }

  onMount(() => {
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    updateImage();
    const imageInterval = setInterval(updateImage, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(imageInterval);
    };
  });
</script>

<footer>
  <div class="flex flex-grow">
    <div class="w-28 overflow-hidden">
      <button class="start-button">
        <img alt="Windows XP Start Button" src={StartButton} />
      </button>
    </div>
    <div class="flex flex-grow pb-[3px] pt-[5px]">
      {#each windowMap as [key, window]}
        {#if window.state !== 'closed'}
          <button
            class={`${window.active ? 'footer-window-active' : 'footer-window'} relative min-w-[24px] max-w-[150px] flex-1 rounded-sm`}
            on:click={window.onTaskbarClick}
          >
            <img alt="Windows XP Taskbar Icon" class="m-1 h-[15px] w-[15px]" src={window.src} />
            <p
              class="footer-window-text overflow-hidden text-ellipsis whitespace-nowrap text-left text-[11px] font-normal text-white"
            >
              {key}
            </p>
          </button>
        {/if}
      {/each}
    </div>
  </div>
  <div class="taskbar-right">
    <div class="system-tray-arrow w-[19px]">
      <button>
        <img alt="Windows XP System Tray Arrow" src={SystemTrayArrow} />
      </button>
    </div>
    <img alt="Windows XP Task Manager Icon" class="h-[15px] w-[15px]" src={currentTaskMgr} />
    <img alt="Windows XP Sound Settings Icon" class="h-[15px] w-[15px]" src={SoundSettings} />
    <img alt="Windows XP System Alert Icon" class="h-[15px] w-[15px]" src={SystemAlert} />
    <p class="mx-1 text-[11px] font-normal text-white">{currentTime}</p>
  </div>
</footer>

<style>
  footer {
    display: flex;
    justify-content: space-between;
    position: absolute;
    height: 30px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background: linear-gradient(
      rgb(31, 47, 134) 0px,
      rgb(49, 101, 196) 3%,
      rgb(54, 130, 229) 6%,
      rgb(68, 144, 230) 10%,
      rgb(56, 131, 229) 12%,
      rgb(43, 113, 224) 15%,
      rgb(38, 99, 218) 18%,
      rgb(35, 91, 214) 20%,
      rgb(34, 88, 213) 23%,
      rgb(33, 87, 214) 38%,
      rgb(36, 93, 219) 54%,
      rgb(37, 98, 223) 86%,
      rgb(36, 95, 220) 89%,
      rgb(33, 88, 212) 92%,
      rgb(29, 78, 192) 95%,
      rgb(25, 65, 165) 98%
    );
  }

  .start-button {
    position: relative;
    overflow-clip-margin: content-box;
    overflow: clip;
  }

  .start-button:hover {
    top: -30px;
  }

  .start-button:hover:active {
    top: -60px;
  }

  .footer-window {
    background-color: rgb(60, 129, 243);
    box-shadow:
      rgba(0, 0, 0, 0.3) -1px 0px inset,
      rgba(255, 255, 255, 0.2) 1px 1px 1px inset;
  }

  .footer-window:hover {
    background-color: rgb(83, 163, 255);
    box-shadow:
      rgba(0, 0, 0, 0.3) -1px 0px inset,
      rgba(255, 255, 255, 0.2) 1px 1px 1px inset;
  }

  .footer-window:active,
  .footer-window-active {
    background-color: rgb(30, 82, 183);
    box-shadow:
      rgba(0, 0, 0, 0.2) 0px 0px 1px 1px inset,
      rgba(0, 0, 0, 0.7) 1px 0px 1px inset;
  }

  .footer-window-text {
    position: absolute;
    top: 3px;
    left: 24px;
    right: 8px;
  }

  .taskbar-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2px;
    flex-shrink: 0;
    width: 130px;
    padding: 0px 10px;
    margin-left: 18px;
    background: linear-gradient(
      rgb(12, 89, 185) 1%,
      rgb(19, 158, 233) 6%,
      rgb(24, 181, 242) 10%,
      rgb(19, 155, 235) 14%,
      rgb(18, 144, 232) 19%,
      rgb(13, 141, 234) 63%,
      rgb(13, 159, 241) 81%,
      rgb(15, 158, 237) 88%,
      rgb(17, 155, 233) 91%,
      rgb(19, 146, 226) 94%,
      rgb(19, 126, 215) 97%,
      rgb(9, 91, 201) 100%
    );
    border-left: 1px solid rgb(16, 66, 175);
    box-shadow: rgb(24, 187, 255) 1px 0px 1px inset;
  }

  .system-tray-arrow {
    position: absolute;
    right: 120px;
  }

  .system-tray-arrow > button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .system-tray-arrow > button:hover {
    filter: brightness(120%);
  }

  .system-tray-arrow > button:hover:active {
    filter: brightness(90%);
  }

  .start-button > img,
  .taskbar-right > p,
  .taskbar-right > img,
  .system-tray-arrow > button > img {
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
