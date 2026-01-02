<template>
	<div class="mb-8" aria-hidden="true" v-for="section in 2" :key="section">
		<div class="w-20 h-4 bg-zinc-200 animate-pulse rounded-md mb-4"></div>

		<ul class="flex gap-x-6">
			<li v-for="note in 4" :key="note">
				<div class="w-64 h-56 rounded-xl border border-zinc-200 p-4 flex flex-col gap-y-4">
					<div class="h-4 w-2/3 rounded bg-zinc-200 animate-pulse" />
					<div class="space-y-3 flex-1">
						<div class="h-3 w-full rounded bg-zinc-200 animate-pulse" />
						<div class="h-3 w-10/12 rounded bg-zinc-200 animate-pulse" />
						<div class="h-3 w-8/12 rounded bg-zinc-200 animate-pulse" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
