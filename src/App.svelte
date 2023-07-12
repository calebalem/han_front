<script>
   
  import io from "socket.io-client";
  
  import { onMount, onDestroy } from "svelte";
  const toggle = () => (open = !open);
  const socket = io("http://localhost:3000");
  let totalListing = "initalizing";
  let titles = [];
  let progress = "initalizing";
  socket.on("listing_detail", (data) => {
    totalListing = data
  });
  socket.on("scrape_progress", (data) => {
    progress = data;
  });

  async function startLongRunningOperation() {
    const response = await fetch("http://localhost:3000/startListScrape");
    return response;
  }
  console.log("sdfsdf")
  onMount(() => {
    startLongRunningOperation().then((resp) => {
      progress = "Finished";
    });
  });
</script>

<main>
  <p>listing length {totalListing}</p>
  <p>progress {progress}</p>
</main>