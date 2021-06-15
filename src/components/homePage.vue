<template>
  <div class="eCommerce">
  <div>
    <navbar v-on:fromNavbar='cartIconClick' v-on:openHome='dataFromNavForOpenHome' :cart="cart"></navbar>
  </div>
    
    <div id="items" v-if="homePageItems">
    
        <li id="itemsList" v-for="(value, index) in filterItems" :key="value.product">
          <itemPreview  v-on:dataFromItemPreviePage='dataFromItemPreview' v-on:dataFromItemPreviewForOpeningCart='dataForOpenCart' :value='value' :index='index' :cart='cart' :counter='counter' :orderSummaryViewOfCartBuy='orderSummaryViewOfCartBuy' :cartDivView='cartDivView' :buyingList='buyingList'> </itemPreview>
        </li>
        <div id='earchingInputDiv'>
            <input v-model="searchInput" id="searchInputField" size="sm" class="mr-sm-2" placeholder="Search">
        </div>
    
    </div>  
    <div id="cartDiv" v-if="cartDivView">
      <cart v-on:totalInCart='totalFromCart' v-on:dataFromCart='recieveFromCart' v-on:dataFromBuyProductFromCartComponent='valueFromCartBuy' :counter='counter' :cartDivView='cartDivView' :cart='cart' />
    </div>
    <div id="buyingModal" v-if='buyingPageVisible'>
        <!-- <b-button v-b-modal.modal-14>
          buy summary
        </b-button> -->
        <b-modal no-close-on-backdrop id="OrderSummaryOfDirectBuy">
         <div>
            <img title='Close' @click="closeModalIconClickInBuyModal" class="float-right"  id="closeModalIcon" :src="require('@/assets/error.png')" alt="close">
          </div>
          <div class='p-0' id="orderSummary">
            <buyProduct :buyingList='buyingList'></buyProduct>
          </div>
        </b-modal>
        
    </div> 
    
     <!-- <div id="buyingModal" v-if='buyingPageVisible'>
        <b-button v-b-modal="'modal-'+'OrderSummary'">
          buy summary
        </b-button>
        <b-modal no-close-on-backdrop id="modal-OrderSummary">
         <div>
            <img title='Close' @click="closeModalIconClickInBuyModal" class="float-right"  id="closeModalIcon" :src="require('@/assets/error.png')" alt="close">
          </div>
          <div class='p-0' id="orderSummary">
            <buyProduct :buyingList='buyingList'></buyProduct>
          </div>
        </b-modal>
        
    </div>  -->
    <br>
    <div id="orderSummary" v-if="orderSummaryViewOfCartBuy">
      <!-- <b-button v-b-modal="'modal-'+'OrderSummaryOfCartBuy'">
           summary
        </b-button> -->
        <b-modal no-close-on-backdrop id="cartOrderSummaryShowButton">
          <div>
            <img title='Close' @click="closeModalIconClickInCartBuyPage" class="float-right"  id="closeModalIcon" :src="require('@/assets/error.png')" alt="close">
          </div>
          <buyProductFromCart :cartTotal='cartTotal' :cart='cart'></buyProductFromCart>
        </b-modal>
    </div>
  </div>
</template> 

<script>
import itemPreview from './itemPreview.vue'
import navbar from './navbar.vue'
import cart from './cart.vue'
import buyProduct from './buyProduct.vue'
import buyProductFromCart from './buyProductFromCart.vue'

export default {
  name: 'homePage',
  components: {
    itemPreview,
    navbar,
    cart,
    buyProduct,
    buyProductFromCart
  },
  data(){
    return {
            searchInput:'',
      orderSummaryViewOfCartBuy:false,
      backarrowView:false,
      cartDivView:false,
      buyingPageVisible:false,
      homePageItems:true,
      buyIngListfromChild:[],
      cart:[],
      cartTotal:0,
      modalInBuy:true,
      buyingList:[],
      DirectBuyOrderSummaryView:false,
      directBuyCountOrderSummary:'',
      //searchingList:[],

      counter:{

      },
      items: [
        {
          ItemPic: require("@/assets/apples_getty-images.jpg"),
          id:101,
          product:'Apple Kashmiri',
          price:100,
          weight:'/kg',
          description:"Apples are high in fiber, vitamin C, and various antioxidants.",
          // benefits
          point1:"Apples such as the Ambri contain mostly water and carbohydrates.",
          point2:'They are particularly high in Vitamin C and dietary fiber',
          point3:'good for immune and digestive system functioning.',
          point4:'Other minerals such as potassium and antioxidants such as quercetin are also found in apples'

        },
        {
          ItemPic: require("@/assets/grape.jpg"),
          id:102,
          product:"Grapes Sultana",
          price:50,
          weight:'/kg',
          description:"Grapefruit is a tropical citrus rich in nutrients, antioxidants and fiber.",
          point1:'sultanas and currants may improve your digestive health and blood sugar levels',
          point2:' decrease inflammation and lower your blood pressure.',
          point3:'On the downside, they are also high in sugar and calories and should be eaten in moderation',
          point4:'Beneficial for Heart Health in Various Impressive Ways. ...'

        },

        {
          ItemPic: require("@/assets/banana.jpg"),
          id:103,
          product:"Banana Robusta",
          price:40,
          weight:'/dozen',
          description:"Bananas are contain nutrients that help keep a person healthy.",
          point1:'Bananas Contain Many Important Nutrients. ...',
          point2:'Bananas Contain Nutrients That Moderate Blood Sugar Levels. ...',
          point3:'They have all important nutrients, but eating too many could end up doing more harm than good',
          point4:'Too much of any single food may contribute to weight gain and nutrient deficiencies.'

        },
        {
          ItemPic: require("@/assets/pineApple.jpg"),
          id:104,
          product:" Queen Pineapple",
          price:50,
          weight:'/Piece',
          description:"Pine Apple is packed with nutrients and other compounds",
          point1:'its help your digestion by cleaning the body organs and blood',
          point2:'ncrease your energy intake and boost metabolism, nourish your hair, skin, nails and teeth and keep you generally healthy – plus it tastes great!',
          point3:'May Boost Immunity and Suppress Inflammation. ...',
          point4:'May Speed Recovery After Surgery or Strenuous Exercise.'

        },
         {
          ItemPic: require("@/assets/mango.webp"),
          id:105,
          product:"Mango Alphonso",
          price:80,
          weight:'/kg',
          description:"'Mango is king of the fruits,'mango fruit is one of the most popular",
          point1:'This fruit is not only delicious but also boasts an impressive nutritional profile.',
          point2:'In fact, studies link mango and its nutrients to health benefits, such as improved immunity, digestive health and eyesight, as well as a lower risk of certain cancers.',
          point3:'Here’s an overview of mango, its nutrition, benefits and some tips on how to enjoy it.',
          point4:'It also contains small amounts of phosphorus, pantothenic acid, calcium, selenium and iron.'

        },
        {
          ItemPic: require("@/assets/watermelon.jpeg"),
          id:106,
          product:"Sweet Dawn Watermelon",
          price:20,
          weight:'/kg',
          description:"Watermelon is a surprisingly healthy fruit, including lycopene and vitamin C",
          point1:'Contains Nutrients and Beneficial Plant Compounds. ...',
          point2:'Contains Compounds That May Help Prevent Cancer. ...',
          point3:'an antioxidant that helps break down harmful free-oxygen radicals. ',
          point4:'it prevents kidney injury and therefore, is a kidney-friendly food.'
        },
        {
          ItemPic: require("@/assets/dragon-fruit.jpg"),
          id:107,
          product:" Pitaya Dragon furit",
          price:100,
          weight:'/piece',
          description:"It is rich in antioxidants like flavonoids, phenolic acid, and betacyanin",
          point1:'Its rich in antioxidants like flavonoids, phenolic acid, and betacyanin. ...',
          point2:'It contains prebiotics, which are foods that feed the healthy bacteria called probiotics in your gut.',
          point3:'Dragon fruit is juicy with a slightly sweet taste that some describe as a cross between a kiwi, a pear, and a watermelon. The seeds have a nutty flavor.',
          point4:'Cut it open, and you all find fleshy white stuff inside dotted with black seeds that are OK to eat.'
        },
        {
          ItemPic: require("@/assets/kiwi.jpeg"),
          id:108,
          product:"Green Kiwi Fruit",
          price:30,
          weight:'/piece',
          description:'Kiwis are small fruits also full of nutrients like vitamin C, vitamin K, vitamin E, folate, and potassium',
          point1:'Kiwis are high in Vitamin C and dietary fiber and provide a variety of health benefits. ',
          point2:'This tart fruit can support heart health, digestive health, and immunity. ',
          point3:'The kiwi is a healthy choice of fruit and is rich with vitamins and antioxidants.',
          point4:'Eating one to three kiwis a day is enough for most people to get the boost of nutrients from the fruit.'
        },
        {
          ItemPic: require("@/assets/papaya.jpeg"),
          id:109,
          product:"Pusa Delicious Papaya",
          price:50,
          weight:'/piece',
          description:'Papayas contain  antioxidants vitamin A,C, and E. it is may reduce the risk of heart disease',
          point1:'Additionally, papayas high fiber content may reduce the risk of heart disease.',
          point2:'High-fiber diets lower cholesterol levels.',
          point3:'Papaya has folic acid, which is essential for converting the amino acid homocysteine into less harmful amino acids.',
          point4:'High levels of homocysteine, an amino acid primarily found in meat products, are a risk factor for heart disease.'
        },
        {
          ItemPic: require("@/assets/strwberry.jpg"),
          id:110,
          product:"The garden Strawberry",
          price:100,
          weight:'/box',
          description:'Packed with vitamins, fiber, and  antioxidants known as polyphenols...',
          point1:'These potent little packages protect your heart,',
          point2:'ncrease HDL (good) cholesterol, lower your blood pressure, and guard against cancer.',
          point3:' Just one serving -- about eight strawberries -- provides more vitamin C than an orange.',
          point4:'These red gems may be good for your heart in more ways than one.'
        }
      ],
    }
  },

  
  methods: {
    
    totalFromCart(totalOfCart){
      this.cartTotal=totalOfCart
    },
    recieveFromCart(dataFromCartComponent){
      this.homePageItems= dataFromCartComponent.homePageItems
      this.cartDivView = dataFromCartComponent.cartDivView
    },
    valueFromCartBuy(valueOfcartBuy){
      //this.cartDivView = valueOfcartBuy.cartDivView
      this.orderSummaryViewOfCartBuy= valueOfcartBuy.orderSummaryViewOfCartBuy
    },
    dataForOpenCart(valueFromItemPreviewForOpenCart){
        this.homePageItems=valueFromItemPreviewForOpenCart.homePageItems
        this.cartDivView=valueFromItemPreviewForOpenCart.cartDivView  
    },
   
    dataFromItemPreview(dataFromChild){
      this.buyIngListfromChild=dataFromChild.buyingList
      this.buyingPageVisible = dataFromChild.buyPageTruthy
    },
    dataFromNavForOpenHome(valueOfNavBrandToHome){
        this.homePageItems=valueOfNavBrandToHome.homePageItems
        this.cartDivView=valueOfNavBrandToHome.cartDivView
        this.buyingPageVisible=valueOfNavBrandToHome.buyingPageVisible
        this.orderSummaryViewOfCartBuy=valueOfNavBrandToHome.orderSummaryViewOfCartBuy
    },
     closeModalIconClickInBuyModal(){
        this.buyingPageVisible=false
        this.homePageItems=true
        this.buyingList.splice(0, 1);

      },
      closeModalIconClickInCartBuyPage(){
        this.orderSummaryViewOfCartBuy= false
      },
      cartIconClick(valueFromNavbar){
        this.homePageItems=valueFromNavbar.homePageItems
        this.cartDivView=valueFromNavbar.cartDivView
      }
   
    
   
  },
  computed: {
    filterItems(){
     return this.items.filter((items)=>{
        return this.searchInput.toLowerCase().split(' ').every(v => items.product.toLowerCase().includes(v))
      })
    },
  },
   
}
</script>

<style lan='sass'>
  body{
    background: rgb(241 241 241) !important;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
    border:none;
    color:black;
    
  }
  #earchingInputDiv {
    height: 50px;
    position: absolute;
    top:100px;
    z-index: 200;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
   
  }
  #searchInputField {
      height: 40px;
      width:50%;
      padding:0px 15px;
      border:1px solid darkgray;
    }
  #items {
    margin-top: 33px;
    display: grid;
    grid-template-columns: auto auto  auto auto auto;
    overflow: hidden;
  }
  #items li {
    transition: transform .3s; /* Animation */
  }
  #items li:hover {
     transform: scale(1.1);
  }
  
  @media (min-width: 992px){
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
    padding-right: 10%;
    }
  }
  @media (min-width: 576px){
    .modal-dialog {
        max-width: 80% !important;
        margin: 1.75rem auto;
    }
  }
  #removeItemFromCart {
    color:white;
    background: red;
    border-radius: 5px;
    border:none;
    padding:10px;
    
  }
  #buyingProductFlexing {
    list-style-type: none;
  }
  #payInBuying {
    font-weight: 700;
  }
  #backarrowInBuyingPage {
    height: 30px;
    position:absolute;
    top:100px;
    left:125px;
  }
  #buyingProductImage {
    height: 250px;
    border-radius: 5px;
  }
  #addressToDelivery {
    border:1px solid gray;
    border-radius: 5px;
    width:70%;
    padding:15px;
  }
  .modal-body {
    padding: 2rem !important;
  }
  .modal-footer {
    display: none !important;
  }
  .modal-header {
    display: none !important;
  }
  #product p {
  
    margin-top: 0;
    margin-bottom: 3px;
  }
  #address input{
    border-radius: 5px;
    margin-left: 12px;
    margin-bottom: 3px;
    padding-left: 6px;
    width:77%;
    border:1px solid darkslategray;
  }
  #address label {
    width:62px;
  }
   #address label span {
   padding:0px;
  }
  #addCartAddress {
   position:absolute;
   top:150px;
   right: 161px;
   color:black;
  }
  #items li {
    list-style-type: none;
  }
  #placeOrderButton {
    background: #f46326;
    color:white;
    padding:15px 30px; 
    border:none;
    margin-top:20px;
    font-weight: 600;
  }
   #placeOrderButton:hover {
      background: rgb(236, 138, 10);
   }
  #DirectBuyOrderSummaryImage {
      height:400px
  }
  #directBuyPageDiv li {
    list-style-type: none;
  }
  #DirectBuyProceedToPay {
    position:absolute;
    top:97px;
    right:30px;
    margin-top:15px;
    font-weight: 700;
    color:white;
    background: #f46326;
    border:none;
    padding:15px 25px;
  }
  #DirectBuyProceedToPay:hover {
    background: #d34d14;
  }
  #product {
  border-radius: 5px;
  }
  .modal-footer {
    display: none;
  }
  #productItems {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  #addCartBtn {
    color:white;
    padding:10px 16px;
    border:none;
    font-weight: 600;
    border-radius: 5px;
    background: rgb(248, 121, 1);
    margin-right:15px;
    margin-bottom: 10px;
  }
  #addCartBtn:hover {
    background: rgb(212, 104, 3);
  }
   #cartDiv {
    background:#f1f1f1;
    margin:0px 30px;
    padding:10px 15px;
    color:black;
   
  }
  #buyingItem {
    display: flex;
  }
  #buyingItem p {
    margin-top:0;
  }
  #buyingItem img {
    height: 50px;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  span {
    padding:10px;
  }
  #buyDiv {
    background: #222238;
    color:white;
    padding:20px 30px;

  }
  
  
  #backArrowInOrderSummary img{
    height: 35px;
    cursor: pointer;
  }
  #backArrowInOrderSummary {
    position:absolute;
    top:100px;
    left:70px;
  }
  
</style>
