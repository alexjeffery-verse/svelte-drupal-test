<script>
export let data;

let post = data.data;
let categories = data.included.categories
let testimonials = data.included.testimonials

</script>

<h1>{post.title}</h1>

{#if categories }
	<p>
		Categories: 
		{#each categories as category }
			<span>{category}</span>
		{/each}
	</p>
	{:else}
    <p>Unassigned Category</p>
{/if}

<p>{post.content}</p>

<h2>Testimonials</h2>
{#if testimonials }
	<div>
		{#each testimonials as testimonial }
			<h3>{testimonial.attributes.field_author_title.value}</h3>
			<p>{testimonial.attributes.field_text.value}</p>
			<p>{testimonial.attributes.field_author_name.value}</p>
		{/each}
	</div>
{/if}
<a href='/posts'>See all the posts</a>

<style>
	span {
		margin-right: 10px;
	} 
</style>