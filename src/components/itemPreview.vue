<template>
    <div>
        <notifications position="bottom center" group="cartNotification" />
        <div id='itemPreviewModal'>
          <b-button @click="homePageItemsClick" id="model-button" v-b-modal="'modal-'+index">
            <span id="product">
            <div>
                <img   id='productImage' :src="`${value.ItemPic}`" alt="pic">
            </div>
            <div>
              <h5>{{value.product}}</h5>
              <p><b>₹ {{value.price}} {{value.weight}}</b></p>
              <p class="text-secondary">{{value.description}}</p>
              <br>
            </div>
          </span>
          </b-button>
             <b-modal no-close-on-backdrop  v-if="modalClose" :id="'modal-'+index" title="">
            <section>
              <div class="row">
                <div class="col">
                  <img id='productImageInModal' :src="`${value.ItemPic}`" alt="pic">
                </div>
                <div class="col">
                    <div>
                        <img v-bind:title="closeModalTitle" @click="closeModalIconClick" class="float-right"  id="closeModalIcon" :src="require('@/assets/error.png')" alt="close">
                    </div>
                    <h2 class="text-left"> {{value.product}}</h2>
                    <p class="text-success m-0">Special Price</p>
                    <h2>₹ {{value.price}}<span id="productWeight">{{value.weight}}</span></h2>
                    <h5>Benefits:</h5>
                    <p class="text-secondary">{{value.description}}</p>
                    <ul id="benefitPoints">
                      <li>{{value.point1}}</li>
                      <li>{{value.point2}}</li>
                      <li>{{value.point3}}</li>
                      <li>{{value.point4}}</li>
                    </ul>
                </div>
              </div>
            </section>
                <div id="cartButtonAndBuyButton">
                  <button v-if="goToCart" id="goToCartBtn" @click="GoToCartFromModal">Go To Cart</button>
                  <button v-if="addedToCart" id="addCartBtn" @click="addToCart( value)"> Add to cart </button>
                  <button id="buyBtn" @click="buyItem(value)" ref="btnShow">Buy</button>
                </div>
            </b-modal>
        </div> 
    </div>
</template>
<script>
    export default {
        name:'itemPreview',
        props: {
            value: Object,
            index: Number,
            items: Array,
            cart: Array,
            counter: Object,
            cartDivView: Boolean,
            buyingList: Array,
            

        },
        data(){
          return {
              modalClose:true,
              closeModalTitle:"Close?",
              goToCart:false,
              addedToCart:true,
              buyingPageView:true,
              emitingFromItemspreview:{
                buyList: this.buyingList,
                buyPageTruthy: true,
              },
              dataToHomepageForOpenCart: {
                homePageItems:false,
                cartDivView:true,
              }

            



          }
        },
        methods: {
            // showModal(){
            //   this.$refs.modal1.show()
            // },
            homePageItemsClick(){
                this.modalClose=true

            },
            closeModalIconClick(){
                this.modalClose=false
                this.homePageItems=true
            },
            GoToCartFromModal(){
                this.$emit('dataFromItemPreviewForOpeningCart', this.dataToHomepageForOpenCart)
            },
            addToCart(value){
                const itemId = value.id
                const found =this.cart.some(item => item.id === itemId)
                if(!found){
                    this.cart.push(value);
                    this.$notify({
                    group: 'cartNotification',
                    title: '',
                    text: 'Successfully added item in cart!',
                    duration: 1000,
                    type:'success'
                });
                    this.counter[itemId] = 1
                    this.addedToCart = false
                    this.goToCart = true
                }
            },  
            buyItem(value){
                this.buyThingCount=1
                this.cartDivView=false
                this.buyingList.push(value)
                this.buyingPageView=true
                this.modalClose=false
                this.$emit('dataFromItemPreviePage', this.emitingFromItemspreview)
                setTimeout(() => {
                  this.$root.$emit('bv::show::modal', 'OrderSummaryOfDirectBuy', '#btnShow')
                },100)
            },
           
            

        },
        
    }

</script>
<style>
 #model-button {
    background: white;
    padding:0;
    margin-right: 10px;
    margin-bottom:20px;
  }
  #model-button:active {
    background: none;
  }
   #productImageInModal {
    height: 400px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  #productImage {
    height: 170px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
   #closeModalIcon {
    height: 32px;
    cursor: pointer;
    transition: transform .2s;
  }
  #closeModalIcon:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.1); 
  }
   #productWeight {
    font-size:20px;
  }
   #benefitPoints li{
     margin-bottom:10px;
  }
   #benefitPoints {
    height: 200px;
    overflow: auto;
  }
   #cartButtonAndBuyButton{
    float: right;
  }
   #goToCartBtn {
    color: blue;
    padding:9px 15px;
    border:2px solid blue;
    border-radius: 5px;
    background: white;
    margin-right:15px;
    margin-bottom: 10px;
    
  }
  #goToCartBtn:active {
    color: white;
    padding:9px 15px;
    border:none;
    border-radius: 5px;
    background: blue;
    margin-right:15px;
    margin-bottom: 10px;
    
  }
   #buyBtn {
    background: rgb(13, 24, 173);
    color:white;
    padding:10px 15px;
    border:none;
    font-weight: 600;
    border-radius: 5px;
  }
  #buyBtn:hover {
    background: rgb(5, 13, 131);

  }
</style>