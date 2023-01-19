<script>
    export let data;
    let people = data.mergedData;
</script>

<h1>People</h1>

{#if people}
  {#each people as person }

    <img src="{person.includes[0].avatar}" alt="{person.alt}">
    <p>First name: {person.attributes.field_first_name.value}</p>
    <p>Last name: {person.attributes.field_last_name.value}</p>

  {/each}
{/if}

<a href='/'>Home</a>