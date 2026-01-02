<template>
	<div class="space-y-6 p-3" aria-hidden="true">
		<ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			<li v-for="card in 6" :key="card">
				<div class="h-48 rounded-xl border border-zinc-200 p-4 flex flex-col gap-y-4">
					<div class="h-4 w-2/3 rounded bg-zinc-200 animate-pulse" />
					<div class="space-y-3 flex-1">
						<div class="h-3 w-full rounded bg-zinc-200 animate-pulse" />
						<div class="h-3 w-10/12 rounded bg-zinc-200 animate-pulse" />
						<div class="h-3 w-9/12 rounded bg-zinc-200 animate-pulse" />
					</div>
					<div class="flex items-center gap-2">
						<div class="h-3 w-16 rounded bg-zinc-200 animate-pulse" />
						<div class="h-3 w-12 rounded bg-zinc-200 animate-pulse" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
