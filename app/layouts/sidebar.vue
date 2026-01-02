<template>
	<aside class="flex flex-col gap-y-3 w-78 h-full border-r border-zinc-200 shrink-0">
		<div class="pt-5 flex items-center gap-x-2 px-5">
			<slot name="header" />
		</div>

		<div class="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
			<slot name="content" />
		</div>
	</aside>

	<main class="flex-1">
		<slot />
	</main>
</template>