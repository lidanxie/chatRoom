<template>
	<div>
		<div class="header">
			<div class="head">
				<img :src="getusersrc" alt="">
			</div>
			<div class="name">
				{{ getusername }}
			</div>
			<div class="background">
				<img :src="getusersrc" alt="">
			</div>
		</div>
		<div class="content">
			<mu-list>
                <mu-list-item title="Inbox">
                    <mu-icon slot="left" value="inbox"/>
                </mu-list-item>
                <mu-list-item title="Starred">
                    <mu-icon slot="left" value="grade"/>
                </mu-list-item>
                <mu-list-item title="Sent mail">
                    <mu-icon slot="left" value="send"/>
                </mu-list-item>
                <mu-list-item title="Drafts">
                    <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list>
                <mu-list-item title="All mail">
                    <mu-icon slot="right" value="info"/>
                </mu-list-item>
                <mu-list-item title="Trash">
                    <mu-icon slot="right" value="info"/>
                </mu-list-item>
                <mu-list-item title="Spam">
                    <mu-icon slot="right" value="info"/>
                </mu-list-item>
                <mu-list-item title="Follow up">
                    <mu-icon slot="right" value="info"/>
                </mu-list-item>
            </mu-list>
		</div>
		<div class="logout">
			<mu-raised-button @click="logout" label="退出" class="demo-raised-button" fullWidth/>
		</div>
		<div style="height: 80px;"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters([
				'getusersrc',
				'getusername'
			])
		},
		methods: {
			logout() {
				this.$store.commit('setusername', '');
				this.$store.commit('setusersrc', '');
				this.$store.commit('openlogintoggle');
				this.$store.commit('setIsLogin', false)
			}
		}
	}
</script>

<style>
	
</style>