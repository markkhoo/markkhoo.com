<!-- Adapted from: https://svelte.dev/repl/8b974ea483c648fba362a1e9f3dbc29f?version=4.2.8 -->
<script lang="ts">
  export let backgroundColor: string = 'transparent';
  export let initPosLeft: number = 0;
  export let initPosTop: number = 0;
  export let initHeight: number = 200;
  export let initWidth: number = 200;
  export let minHeight: number = 100;
  export let minWidth: number = 100;
  export let zIndex: () => number;
  export let zIndexInit: number = 0;

  interface HTMLDivElementWithDirection extends HTMLDivElement {
    direction:
      | 'east'
      | 'west'
      | 'north'
      | 'south'
      | 'northwest'
      | 'northeast'
      | 'southwest'
      | 'southeast';
  }

  function inElement<T>(element: unknown, property: string): element is T {
    if (!element || typeof element !== 'object') return false;
    return property in element;
  }

  function move(element: HTMLElement) {
    let initialPos: { x: number; y: number } | null = null;
    let isMoving = false;

    const mover = document.createElement('div');
    mover.classList.add('mover');
    mover.addEventListener('mousedown', onMousedown);
    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);

    element.prepend(mover);

    function onMousedown(event: MouseEvent) {
      if (!event.target || !element.parentElement) return;

      const rect = element.getBoundingClientRect();

      initialPos = { x: event.pageX - rect.left, y: event.pageY - rect.top };
      isMoving = true;
    }

    function onMousemove(event: MouseEvent) {
      if (!initialPos || !isMoving) return;

      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      let newLeft = event.pageX - initialPos.x;
      let newTop = event.pageY - initialPos.y;

      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + element.offsetWidth > windowWidth) newLeft = windowWidth - element.offsetWidth;
      if (newTop + element.offsetHeight > windowHeight)
        newTop = windowHeight - element.offsetHeight;

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    }

    function onMouseup(event: MouseEvent) {
      if (!event.target) return;

      isMoving = false;
    }

    return {
      destroy() {
        window.removeEventListener('mousemove', onMousemove);
        window.removeEventListener('mouseup', onMouseup);

        element.removeChild(mover);
      }
    };
  }

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
      if (
        !inElement<HTMLDivElementWithDirection>(active, 'direction') ||
        !initialPos ||
        !initialRect
      )
        return;

      const direction = active.direction;

      if (direction.match('east')) {
        let delta = event.pageX - initialPos.x;
        let newWidth = Math.min(
          Math.max(initialRect.width + delta, minWidth),
          window.innerWidth - initialRect.left
        );
        element.style.width = `${newWidth}px`;
      }

      if (direction.match('south')) {
        let delta = event.pageY - initialPos.y;
        let newHeight = Math.min(
          Math.max(initialRect.height + delta, minHeight),
          window.innerHeight - initialRect.top
        );
        element.style.height = `${newHeight}px`;
      }

      if (direction.match('west')) {
        let delta = initialPos.x - event.pageX;
        let newWidth = Math.max(initialRect.width + delta, minWidth);
        let newLeft = Math.min(
          initialRect.left - delta,
          initialRect.left + initialRect.width - minWidth
        );

        // Prevent the div from moving past the left edge of the browser window
        if (newLeft < 0) {
          newLeft = 0;
          newWidth = initialRect.left + initialRect.width;
        }

        // Prevent the div from moving once minWidth is reached
        if (newWidth > minWidth) {
          element.style.left = `${newLeft}px`;
        }
        element.style.width = `${newWidth}px`;
      }

      if (direction.match('north')) {
        let delta = initialPos.y - event.pageY;
        let newHeight = Math.max(initialRect.height + delta, minHeight);
        let newTop = Math.min(
          initialRect.top - delta,
          initialRect.top + initialRect.height - minHeight
        );

        // Prevent the div from moving past the top edge of the browser window
        if (newTop < 0) {
          newTop = 0;
          newHeight = initialRect.top + initialRect.height;
        }

        // Prevent the div from moving once minHeight is reached
        if (newHeight > minHeight) {
          element.style.top = `${newTop}px`;
        }
        element.style.height = `${newHeight}px`;
      }
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onMouseup);

    return {
      destroy() {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onMouseup);

        grabbers.forEach((grabber) => {
          element.removeChild(grabber);
        });
      }
    };
  }

  function bringToFront(element: HTMLElement) {
    function onMousedown() {
      element.style.zIndex = `${zIndex()}`;
    }

    element.addEventListener('mousedown', onMousedown);

    return {
      destroy() {
        element.removeEventListener('mousedown', onMousedown);
      }
    };
  }
</script>

<div
  style={`height: ${initHeight}px; width: ${initWidth}px; left: ${initPosLeft}px; top: ${initPosTop}px; z-index: ${zIndexInit}; background: ${backgroundColor}`}
  class="box"
  use:move
  use:resize
  use:bringToFront
>
  <slot />
</div>

<style>
  .box {
    position: absolute;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.grabber) {
    position: absolute;
    box-sizing: border-box;
  }

  :global(.grabber.right) {
    width: 4px;
    height: 100%;
    right: -1px;
    cursor: col-resize;
  }

  :global(.grabber.left) {
    width: 4px;
    height: 100%;
    left: -1px;
    cursor: col-resize;
  }

  :global(.grabber.top) {
    height: 4px;
    width: 100%;
    top: -1px;
    cursor: row-resize;
  }

  :global(.grabber.bottom) {
    height: 4px;
    width: 100%;
    bottom: -1px;
    cursor: row-resize;
  }

  :global(.grabber.top-left) {
    height: 8px;
    width: 8px;
    top: -3px;
    left: -3px;
    cursor: nw-resize;
    border-radius: 100%;
  }

  :global(.grabber.top-right) {
    height: 8px;
    width: 8px;
    top: -3px;
    right: -3px;
    cursor: ne-resize;
    border-radius: 100%;
  }

  :global(.grabber.bottom-left) {
    height: 8px;
    width: 8px;
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
    border-radius: 100%;
  }

  :global(.grabber.bottom-right) {
    height: 8px;
    width: 8px;
    bottom: -3px;
    right: -3px;
    cursor: se-resize;
    border-radius: 100%;
  }

  :global(.mover) {
    position: absolute;
    box-sizing: border-box;
    /* cursor: grab; */
    height: 22px;
    width: calc(100% - 66px);
    top: 3px;
    left: 0px;
  }
</style>
