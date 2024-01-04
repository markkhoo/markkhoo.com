<!-- https://svelte.dev/repl/8b974ea483c648fba362a1e9f3dbc29f?version=4.2.8 -->
<script lang="ts">
  interface HTMLDivElementWithDirection extends HTMLDivElement {
    direction: 'east' | 'west' | 'north' | 'south' | 'northwest' | 'northeast' | 'southwest' | 'southeast';
  }

  let grabber: boolean = true;

  function inElement<T>(element: unknown, property: string): element is T {
    if (!element || typeof element !== 'object') return false;
    return property in element;
  }

  // function move(element) {
  //   return {
  //     destroy() {
  //     }
  //   }
  // }

  function resize(element: HTMLElement) {
    let active: HTMLDivElementWithDirection | null = null;
    let initialRect: {
      width: number;
      height: number;
      left: number;
      right: number;
      top: number;
      bottom: number;
    } | null = null;
    let initialPos: {
      x: number;
      y: number;
    } | null = null;

    const right = document.createElement('div') as HTMLDivElementWithDirection;
    right.direction = 'east';
    right.classList.add('grabber');
    right.classList.add('right');

    const left = document.createElement('div') as HTMLDivElementWithDirection;
    left.direction = 'west';
    left.classList.add('grabber');
    left.classList.add('left');

    const top = document.createElement('div') as HTMLDivElementWithDirection;
    top.direction = 'north';
    top.classList.add('grabber');
    top.classList.add('top');

    const bottom = document.createElement('div') as HTMLDivElementWithDirection;
    bottom.direction = 'south';
    bottom.classList.add('grabber');
    bottom.classList.add('bottom');

    const topLeft = document.createElement('div') as HTMLDivElementWithDirection;
    topLeft.direction = 'northwest';
    topLeft.classList.add('grabber');
    topLeft.classList.add('top-left');

    const topRight = document.createElement('div') as HTMLDivElementWithDirection;
    topRight.direction = 'northeast';
    topRight.classList.add('grabber');
    topRight.classList.add('top-right');

    const bottomLeft = document.createElement('div') as HTMLDivElementWithDirection;
    bottomLeft.direction = 'southwest';
    bottomLeft.classList.add('grabber');
    bottomLeft.classList.add('bottom-left');

    const bottomRight = document.createElement('div') as HTMLDivElementWithDirection;
    bottomRight.direction = 'southeast';
    bottomRight.classList.add('grabber');
    bottomRight.classList.add('bottom-right');

    const grabbers = [right, left, top, bottom, topLeft, topRight, bottomLeft, bottomRight];

    grabbers.forEach((grabber) => {
      element.appendChild(grabber);
      grabber.addEventListener('mousedown', onMousedown);
    });

    function onMousedown(event: MouseEvent) {
      if (!event.target || !element.parentElement) return;
      if (!inElement<HTMLDivElementWithDirection>(event.target, 'direction')) return;

      active = event.target;
      const rect = element.getBoundingClientRect();
      const parent = element.parentElement.getBoundingClientRect();

      initialRect = {
        width: rect.width,
        height: rect.height,
        left: rect.left - parent.left,
        right: parent.right - rect.right,
        top: rect.top - parent.top,
        bottom: parent.bottom - rect.bottom
      };
      initialPos = { x: event.pageX, y: event.pageY };
      active.classList.add('selected');
    }

    function onMouseup(event: MouseEvent) {
      if (!active || !event.target) return;

      active.classList.remove('selected');
      active = null;
      initialRect = null;
      initialPos = null;
    }

    function onMove(event: MouseEvent) {
      if (!inElement<HTMLDivElementWithDirection>(active, 'direction') || !initialPos || !initialRect) return;

      const direction = active.direction;
      let delta: number;

      if (direction.match('east')) {
        delta = event.pageX - initialPos.x;
        element.style.width = `${initialRect.width + delta}px`;
      }

      if (direction.match('west')) {
        delta = initialPos.x - event.pageX;
        element.style.left = `${initialRect.left - delta}px`;
        element.style.width = `${initialRect.width + delta}px`;
      }

      if (direction.match('north')) {
        delta = initialPos.y - event.pageY;
        element.style.top = `${initialRect.top - delta}px`;
        element.style.height = `${initialRect.height + delta}px`;
      }

      if (direction.match('south')) {
        delta = event.pageY - initialPos.y;
        element.style.height = `${initialRect.height + delta}px`;
      }
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onMouseup);

    return {
      destroy() {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousemove', onMousedown);

        grabbers.forEach((grabber) => {
          element.removeChild(grabber);
        });
      }
    };
  }
</script>

<header>
  <h1>8-direction resize</h1>
  <p>Using Svelte Actions</p>

  <label>
    <input type="checkbox" bind:checked={grabber} />
    show grabbers
  </label>
</header>

<main class:hide-grabber={!grabber}>
  <!-- <div class="box" use:move use:resize>Box</div> -->
  <div class="box" use:resize>Box</div>
</main>

<style>
  .box {
    left: 300px;
    top: 100px;
    height: 100px;
    width: 100px;
    background: #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    user-select: none;
  }

  :global(.grabber) {
    position: absolute;
    box-sizing: border-box;
  }

  :global(.grabber.right) {
    width: 10px;
    height: 100%;
    background: red;
    right: -5px;
    cursor: col-resize;
  }

  :global(.grabber.left) {
    width: 10px;
    height: 100%;
    background: blue;
    left: -5px;
    cursor: col-resize;
  }

  :global(.grabber.top) {
    height: 10px;
    width: 100%;
    background: green;
    top: -5px;
    cursor: row-resize;
  }

  :global(.grabber.bottom) {
    height: 10px;
    width: 100%;
    background: orange;
    bottom: -5px;
    cursor: row-resize;
  }

  :global(.grabber.top-left) {
    height: 20px;
    width: 20px;
    background: orange;
    top: -10px;
    left: -10px;
    cursor: nw-resize;
    border-radius: 100%;
  }

  :global(.grabber.top-right) {
    height: 20px;
    width: 20px;
    background: orange;
    top: -10px;
    right: -10px;
    cursor: ne-resize;
    border-radius: 100%;
  }

  :global(.grabber.bottom-left) {
    height: 20px;
    width: 20px;
    background: green;
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
    border-radius: 100%;
  }

  :global(.grabber.bottom-right) {
    height: 20px;
    width: 20px;
    background: green;
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
    border-radius: 100%;
  }

  :global(.hide-grabber .grabber) {
    background: transparent !important;
    border: none !important;
  }

  :global(.grabber.selected) {
    border: solid 1px black;
  }

  header {
    text-align: center;
  }
  main {
    flex: 2;
    display: block;
    position: relative;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
