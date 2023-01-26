<script>
  import { onMount } from 'svelte';
  import {flip} from 'svelte/animate';

  export let data;

  let newBatchData = [];
  let posts = data.data;
  let link = data.links.next.href;
  let scroll;
  let moduleMessage;

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


      // Custom module API request

      let moduleRequest = "http://localhost:8888/web/sveltekitmodule/api";
      
      const fetchData = fetch( moduleRequest, {} )
        .then( response => response.json() )
        .then( res => {
          moduleMessage = res
        })
        .catch(error => {
        console.log(error);
        return [];
      });
		
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

  // sort posts
  async function sortPosts(type){
    let link = "http://localhost:8888/web/jsonapi/node/post";

    switch (type){
      case "title":
        link += "?sort=title";
      break;
      case "date":
        link += "?sort=created";
      break;
    }

    const response = await fetch(link)
      .then( response => response.json() )
      .then( res => {
        posts = res.data
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

<h2>{moduleMessage}</h2>

<button on:click={() => sortPosts( "title" )}>Sort by Title</button>
<button on:click={() => sortPosts( "date" )}>Sort by Date</button>

{#if posts }
  <ul>
    {#each posts as post (post.id) }
    <li animate:flip="{{duration: 200}}">
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
