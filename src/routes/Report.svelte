<script>
  import { each } from "svelte/internal";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Label,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Col,
    Row,
    Container,
    TabContent,
    TabPane,
  } from "sveltestrap";

  import moment from "moment";
  import { db } from "../store/store.js";

  const shop1GamesRef = collection(db, "Games");
  const shop2GamesRef = collection(db, "Games_shop2");
  let loading = true;
  let net1 = {};
  let net2 = {}
  onSnapshot(shop1GamesRef, (docs) => {
    let Games = [];
    docs.forEach((doc) => {
      console.log(doc.data());
      Games.push(doc.data());
    });
    net1 = calculateStats(Games);
    loading = false;
  });

  onSnapshot(shop2GamesRef, (docs) => {
    let Games = [];
    docs.forEach((doc) => {
      console.log(doc.data());
      Games.push(doc.data());
    });
    net2 = calculateStats(Games);
    loading = false;
  });



  function calculateStats(Games) {
    let totalBetMoney = 0;
    let totalWinMoney = 0;
    Games.forEach((game)=>{
        game.bets.forEach((bet)=>{
            bet.positions.forEach((pos)=>{
                totalBetMoney += pos.amount;
            })
        })

        game.winners.forEach((winner)=>{
            totalWinMoney += winner.payout;
        })
    })
    return { totalBetMoney, totalWinMoney, net: totalBetMoney - totalWinMoney };
  }

  

</script>

<main>
  {#if loading}
    <div class="container h-100">
      <div class="col d-flex justify-content-center">
        <Spinner color="danger" />
      </div>
    </div>
  {:else}
  <TabContent>
    <TabPane tabId="shop1" tab="Shop 1" active>
        <p>Total Bet : {net1.totalBetMoney}</p>
        <p>Total Win : {net1.totalWinMoney}</p>
        <p>Net : {net1.net}</p>
    </TabPane>
    <TabPane tabId="shop2" tab="Shop 2">
        <p>Total Bet : {net2.totalBetMoney}</p>
        <p>Total Win : {net2.totalWinMoney}</p>
        <p>Net : {net2.net}</p>
    </TabPane>
  </TabContent>
 
  {/if}
</main>
