<script>
export let data;
let posts = data.data;
</script>

<h1>All Posts</h1>

{#if posts}
  {#each posts as post }
    <ul>
      <li>
        <a href="/posts/{post.title}">
          {post.title}
        </a>
      </li>
    </ul>
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}

<a href='/'>Home</a>
