<script>
  import { onMount } from 'svelte';
  export let data;

  let newBatchData = [];
  let posts = data.data;
  let link = data.links.next.href;
  let scroll;

  onMount(() => {
			const handleIntersect = (entries) => {
				entries.forEach((entry) => {
          if ( link !== 'end of posts' ) {
            fetchMorePosts();
          }
				});
			};
			const options = { threshold: 0.5 };
			const observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(scroll);
		
	});

  async function fetchMorePosts() {
		const response = await fetch(link)
    .then( response => response.json() )
    .then( res => {

      newBatchData = res.data

      if ( res.links.next !== undefined ) {
        let newLink = res.links.next.href
        link = newLink;
      } else {
        link = 'end of posts'
      }
        
      posts = [ ...posts, ...newBatchData ];

    })
    .catch(error => {
    console.log(error);
    return [];
    })
   
  }

</script>

<style>
  li {
    margin-bottom: 100px;
  }
</style>

<h1>All Posts</h1>

{#if posts }
  <ul>
    {#each posts as post }
    <li>
      <a href="/posts/{post.id}">
        {post.attributes.title}
      </a>
    </li>
    {/each}
  </ul>
  <div bind:this={scroll}></div>
{:else}
  <p class="loading">loading...</p>
{/if}

<a href='/'>Home</a>
