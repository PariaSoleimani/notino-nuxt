<template>
	<main class="flex-1 flex flex-col gap-y-8 min-w-0 pl-6">
		<div class="pt-4">
			<slot name="header" />
		</div>

		<section class="flex-1 min-h-0">
			<slot name="content" />
		</section>
	</main>
</template>