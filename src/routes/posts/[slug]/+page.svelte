<script>
export let data;
let post = data.data;
let categories = data.included.categoryNames
</script>

<h1>{post.title}</h1>

{#if categories }
	<p>
		Categories: 
		{#each categories as category }
			<span>{category.name}</span>
		{/each}
	</p>
	{:else}
    <p class="loading">unassigned category</p>
{/if}

<p>{post.content}</p>
<a href='/posts'>See all the posts</a>

<style>
	span {
		margin-right: 10px;
	} 
</style>