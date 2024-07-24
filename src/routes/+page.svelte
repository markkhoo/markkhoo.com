<script lang="ts">
	import ResizableWindow from '$lib/components/resizableWindow.svelte';

	let zIndex = 0;

	function bringToFront() {
		zIndex += 1;
		return zIndex;
	}
</script>

<main>
	<ResizableWindow zIndex={bringToFront}>box</ResizableWindow>
	<ResizableWindow
		zIndex={bringToFront}
		initPosTop={50}
		initPosLeft={50}
		backgroundColor={'#dddddd'}>another box lmao</ResizableWindow
	>
</main>

<style>
	main {
		display: block;
		position: relative;
	}
</style>
