<script lang="ts">
  import myComputer from '$lib/assets/my-computer.png';

  export let headerText: string = 'Header';

  function buttonClick() {
    console.log('button clicked');
  }
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-[26px,auto]">
  <div class="xp-header font-win-xp">
    <div class="h-full w-full bg-win-xp-blue" />
    <header class="absolute flex">
      <div class="flex items-center justify-center">
        <img alt="Windows XP 'My Computer' Icon" class="ml-1 mr-0.5 h-4 w-4" src={myComputer} />
      </div>
      <div class="flex flex-1 items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
        <h1 class="header-title mt-0.5 text-xs font-bold">{headerText}</h1>
      </div>
      <div class="pointer-events-auto flex items-center justify-center gap-[1px] px-1">
        <button class="header-button-minimize" on:click={buttonClick}>
          <div />
        </button>
        <button class="header-button-maximize" on:click={buttonClick}>
          <div />
        </button>
        <button class="header-button-close" on:click={buttonClick}>
          <div />
          <div />
        </button>
      </div>
    </header>
  </div>
  <div class="h-full w-full bg-win-xp-blue px-[3px] pb-[3px]">
    <div class="flex h-full bg-white">
      <slot />
    </div>
  </div>
</div>

<style>
  .header-button-minimize,
  .header-button-maximize,
  .header-button-close {
    cursor: auto;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 3px;
    width: 22px;
    height: 22px;
    margin-right: 1px;
  }

  .header-button-minimize:hover,
  .header-button-maximize:hover,
  .header-button-close:hover {
    filter: brightness(120%);
  }

  .header-button-minimize:hover:active,
  .header-button-maximize:hover:active,
  .header-button-close:hover:active {
    filter: brightness(90%);
  }

  .header-button-minimize {
    background-image: radial-gradient(
      circle at 90% 90%,
      rgb(0, 84, 233) 0%,
      rgb(34, 99, 213) 55%,
      rgb(68, 121, 228) 70%,
      rgb(163, 187, 236) 90%,
      white 100%
    );
    box-shadow: rgb(70, 70, 255) 0px -1px 2px 1px inset;
  }

  .header-button-minimize > div {
    position: relative;
    left: 4px;
    top: 4px;
    height: 3px;
    width: 8px;
    background-color: white;
  }

  .header-button-maximize {
    background-image: radial-gradient(
      circle at 90% 90%,
      rgb(0, 84, 233) 0%,
      rgb(34, 99, 213) 55%,
      rgb(68, 121, 228) 70%,
      rgb(163, 187, 236) 90%,
      white 100%
    );
    box-shadow: rgb(70, 70, 255) 0px -1px 2px 1px inset;
  }

  .header-button-maximize > div {
    position: relative;
    display: block;
    left: 4px;
    top: 0;
    height: 12px;
    width: 12px;
    box-shadow:
      white 0px 3px inset,
      white 0px 0px 0px 1px inset;
  }

  .header-button-close {
    background-image: radial-gradient(
      circle at 90% 90%,
      rgb(204, 70, 0) 0%,
      rgb(220, 101, 39) 55%,
      rgb(205, 117, 70) 70%,
      rgb(255, 204, 178) 90%,
      white 100%
    );
    box-shadow: rgb(218, 70, 0) 0px -1px 2px 1px inset;
  }

  .header-button-close > div:nth-child(1) {
    position: relative;
    left: 45%;
    top: 10%;
    transform: rotate(45deg);
    height: 16px;
    width: 2px;
    background-color: white;
  }

  .header-button-close > div:nth-child(2) {
    position: relative;
    left: 45%;
    top: -70%;
    transform: rotate(-45deg);
    height: 16px;
    width: 2px;
    background-color: white;
  }

  .header-title {
    text-shadow: rgba(0, 0, 0, 0.75) 1px 1px 2px;
    color: white;

    pointer-events: none;
    padding-right: 5px;
    letter-spacing: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .xp-header > header {
    left: 0px;
    top: 0px;
    right: 0px;
    height: 26px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }

  .xp-header > div {
    left: 0px;
    top: 0px;
    right: 0px;
    height: 26px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    background: linear-gradient(
      rgb(0, 88, 238) 0%,
      rgb(53, 147, 255) 4%,
      rgb(40, 142, 255) 6%,
      rgb(18, 125, 255) 8%,
      rgb(3, 111, 252) 10%,
      rgb(2, 98, 238) 14%,
      rgb(0, 87, 229) 20%,
      rgb(0, 84, 227) 24%,
      rgb(0, 85, 235) 56%,
      rgb(0, 91, 245) 66%,
      rgb(2, 106, 254) 76%,
      rgb(0, 98, 239) 86%,
      rgb(0, 82, 214) 92%,
      rgb(0, 64, 171) 94%,
      rgb(0, 48, 146) 100%
    );
  }

  .xp-header > div::before {
    content: '';
    display: block;
    position: absolute;
    left: 0px;
    opacity: 1;
    background: linear-gradient(to right, rgb(22, 56, 230) 0%, transparent 100%);
    top: 0px;
    width: 15px;
    height: 26px;
    border-top-left-radius: 0.5rem;
  }

  .xp-header > div::after {
    content: '';
    display: block;
    position: absolute;
    right: 0px;
    opacity: 1;
    background: linear-gradient(to left, rgb(22, 56, 230) 0%, transparent 100%);
    top: 0px;
    width: 15px;
    height: 26px;
    border-top-right-radius: 0.5rem;
  }
</style>
