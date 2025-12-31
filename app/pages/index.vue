<template>
	<NuxtLayout name="main">
		<template #header>
			<h1>Good Morning Paria!</h1>
		</template>

		<template #content>
			<div class="grid grid-cols-[2fr_1fr] grid-rows-2 gap-6 h-full pb-9">
				<section class="flex flex-col">
					<NuxtLink class="mb-2" to="/notes">
						<h2>My Notes</h2>
					</NuxtLink>
					<div class="p-5 rounded-sm bg-white shadow flex-1"></div>
				</section>
				<section class="flex flex-col">
					<NuxtLink class="mb-2" to="/tasks">
						<h2>My Tasks</h2>
					</NuxtLink>
					<div class="p-5 rounded-sm bg-white shadow flex-1"></div>
				</section>
				<section class="flex flex-col">
					<NuxtLink class="mb-2" to="/notes">My Folders</NuxtLink>
					<div class="p-5 rounded-sm bg-white shadow flex-1"></div>
				</section>
				<section class="flex flex-col">
					<NuxtLink class="mb-2" to="/calendar">
						<h2>My Calendar</h2>
					</NuxtLink>
					<div class="p-5 rounded-sm bg-white shadow flex-1"></div>
				</section>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	
</script>
