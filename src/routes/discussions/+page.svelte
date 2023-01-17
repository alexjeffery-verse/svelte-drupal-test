<script>
  export let data;
  
  let discussions = data.data;
  </script>
  
  <h1>All Discussions</h1>
  
  {#if discussions }
    {#each discussions as discussion }
      <ul>
        <li>
          <a href="/discussions/{discussion.title}">
            {discussion.title}
          </a>
        </li>
      </ul>
    {/each}
  {:else}
    <p class="loading">loading...</p>
  {/if}
  
  <a href='/'>Home</a>