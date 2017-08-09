<template>
	<div class="clear">
		<div class="item">
			<div class="name">
				{{ name }}
			</div>
			<img :src="head" alt="" class="head">
			<div v-if="img">
				<img :src="img" alt="" class="img">
			</div>
			<span v-if="msg">
				{{ msg }}
			</span>
		</div>
	</div>
</template>

<script>
	
</script>