<script lang="ts">
  export let headerText: string = 'Header';

  function buttonClick() {
    console.log('button clicked');
  }
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-[25px,auto]">
  <div class="xp-header font-win-xp">
    <div class=" h-full w-full bg-win-xp-blue" />
    <header class="absolute flex">
      <div class=""></div>
      <div class="flex-1">
        <h1 class="header-title">{headerText}</h1>
      </div>
      <div class="flex items-center justify-center gap-[1px] px-1">
        <button class="header-button-color h-5 w-5" on:click={buttonClick} />
        <button class="header-button-color h-5 w-5" on:click={buttonClick} />
        <button class="header-button-color-close h-5 w-5" on:click={buttonClick} />
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
  .header-button-color {
    box-shadow: rgb(70, 70, 255) 0px -1px 2px 1px inset;
    background-image: radial-gradient(
      circle at 90% 90%,
      rgb(0, 84, 233) 0%,
      rgb(34, 99, 213) 55%,
      rgb(68, 121, 228) 70%,
      rgb(163, 187, 236) 90%,
      white 100%
    );
  }

  .header-button-color-close {
    box-shadow: rgb(218, 70, 0) 0px -1px 2px 1px inset;
    background-image: radial-gradient(
      circle at 90% 90%,
      rgb(204, 70, 0) 0%,
      rgb(220, 101, 39) 55%,
      rgb(205, 117, 70) 70%,
      rgb(255, 204, 178) 90%,
      white 100%
    );
  }

  .header-title {
    text-shadow: rgb(0, 0, 0) 1px 1px;
    color: white;

    pointer-events: none;
    padding-right: 5px;
    letter-spacing: 0.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .xp-header > header {
    left: 0px;
    top: 0px;
    right: 0px;
    height: 25px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }

  .xp-header > div {
    left: 0px;
    top: 0px;
    right: 0px;
    height: 25px;
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
    height: 25px;
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
    height: 25px;
    border-top-right-radius: 0.5rem;
  }
</style>
