<script>
  import { onMount } from 'svelte';
  import { posts } from '../../stores/posts'
  export let data;

  let newBatchData = [];

  let initialPosts = data.data

  let scroll;
  
  posts.set({ 
    postData: initialPosts,
    link: data.links.next.href
  })

  onMount(() => {
			const handleIntersect = (entries) => {
				entries.forEach((entry) => {
          if ( $posts.link !== 'end of posts' ) {
            fetchMorePosts();
          }
				});
			};
			const options = { threshold: 0.5 };
			const observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(scroll);
		
	});

  $: fetchMorePosts;
  async function fetchMorePosts() {
		const response = await fetch($posts.link)
    .then( response => response.json() )
    .then( res => {

      newBatchData = res.data

      if ( res.links.next !== undefined ) {
        let newLink = res.links.next.href
        $posts.link = newLink;
      } else {
        $posts.link = 'end of posts'
      }
        
      $posts.postData = [ ...$posts.postData, ...newBatchData ];

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

{#if $posts.postData }
  <ul>
    {#each $posts.postData as post }
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
