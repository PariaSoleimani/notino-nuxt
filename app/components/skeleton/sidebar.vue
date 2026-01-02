<template>
	<div class="flex flex-col h-full" aria-hidden="true">
		<div class="flex-1 overflow-y-auto scrollbar-hidden px-5 pb-9 pt-4 flex flex-col items-center gap-y-5">
			<div v-for="note in 6" :key="note"
				class="w-64 h-56 rounded-xl border border-zinc-200 p-4 flex flex-col gap-y-4">
				<div class="h-4 w-2/3 rounded bg-zinc-200 animate-pulse" />
				<div class="space-y-3 flex-1">
					<div class="h-3 w-full rounded bg-zinc-200 animate-pulse" />
					<div class="h-3 w-10/12 rounded bg-zinc-200 animate-pulse" />
					<div class="h-3 w-8/12 rounded bg-zinc-200 animate-pulse" />
				</div>
			</div>
		</div>
	</div>
</template>
