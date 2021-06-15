<template>
<div>
      <div id='backarrow'>
        <div>
          <img @click="backToHomePage" :src="require('@/assets/left-arrow.png')" alt="pic"><span><b>Back</b></span>
        </div>
      </div>
      <h3 id="checkOutTitle">Check Out</h3>
      <section>
        <div class="container-fluid">
          <div class="row mt-4">
            <div id="AddedCartList" class="col-md-8">
              <div class="mb-3">
                <h5> <b>My Cart ({{cart.length}})</b></h5>
              </div>
              <div id="cartItemsList">
                <li v-for="(cartItems, ind) in cart" :key="ind">
                  
                   <span>
                    <img id="cartProductImage" :src="`${cartItems.ItemPic}`" alt="pic">
                  </span>
                  <span id='productName'><h5>{{cartItems.product}}</h5></span>
                  <button id="dicrement" @click="dicrement(cartItems.id, cartItems.price, ind, cartItems)">
                      <img  id="plusImagInCart" :src="require('@/assets/minus.png')" alt="minus">
                  </button>
                  <span id="countIncart" class="border border-secondary"> {{ counter[cartItems.id] }}</span>
                  <button id="increment" @click="increment(cartItems.id, cartItems.price)">
                      <img  id="plusImagInCart" :src="require('@/assets/plus.png')" alt="plus">
                  
                  </button>
                  <span class="ml-3"><b>Total: ₹{{cartItems.price * counter[cartItems.id]}}</b></span>
                  <div id="itemRemoveFromCart">
                    <img title='Remove from cart' :src="require('@/assets/remove.png')" alt="pic" @click="removeItemFromCart(ind, counter[cartItems.id], cartItems.price)">
                  </div> 
                </li>

              </div>
              <div id="cartBottomSection" class="text-right p-3 bg-white" >
                <span><b>Total Amount: ₹ {{totalAmountInCart + deliveryChargesApply}}</b></span>
                <button @click="proceedToPayment" ref='cartOrderSummaryShow' id="buynow">Proceed</button>
              </div>
            </div>
            <div class='col-md-4'>
              <div  id="cartPriceDetails">
                <h5><b>Price Details</b></h5>
                <hr>
                  <p v-if='chargesNote' class="text-danger">*Shop ₹500 or Above and avide charges</p>
                <div class="row">
                  <div class="col-md-8">
                    <p>Items </p>
                    <p>Price </p>
                    <p>Delivery Charges </p>
                    <hr>
                    <h4><b>Total Amount</b> </h4>
                    <hr>
                  </div>
                  <div class="col-md-4">
                    <p>{{cart.length}}</p>
                    <p>₹ {{totalAmountInCart}}</p>
                    <p v-if='free' class="text-success">FREE</p>
                    <p v-if='chargesApply'> ₹ {{deliveryChargesApply}}</p>

                    <hr>
                    <h4><b>₹ {{totalAmountInCart + deliveryChargesApply}}</b></h4>
                    <hr>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>
      
      
      
    </div>

    
</template>
<script>
export default {
  name: 'cart',
  props: {
      cartDivView: Boolean,
      cart: Array,
      counter: Object
  },
  data(){
      return{
        totalAmountInCart:0,
        deliveryChargesApply:40,
        free:false,
        chargesApply:false,
        counting:0,
        chargesNote:false,
        buyThingCount:1,
        cartDivAndItemsPages: {
          cartDivView:false,
          homePageItems:true
        },
        cartDivAndCartBuyPages: {
          //cartDivView:false,
          orderSummaryViewOfCartBuy:true,
          grandTotalInCart:this.totalAmountInCart
        }

      }
  },
   beforeMount(){
      for(let index=0; index < this.cart.length; index++){
          console.log(this.counter)
          this.totalAmountInCart = this.totalAmountInCart + this.cart[index].price * this.counter[this.cart[index].id]
          console.log((this.cart[index]))
      }
      if(this.totalAmountInCart >= 500 ){
        this.free=true
        this.deliveryChargesApply = 0
        this.chargesNote=false
      }
      else{
        this.free=false
        this.chargesApply=true
        this.chargesNote=true
      }
    },
  methods: {
    
  
    backToHomePage(){
      this.buyThingCount=1
      this.$emit('dataFromCart', this.cartDivAndItemsPages)
      return this.cart

    },
    dicrement(itemId, itemPrice, ind){
      if(this.counter[itemId] >= 1){
        this.counter[itemId]--
        this.totalAmountInCart=this.totalAmountInCart-itemPrice
        if(this.counter[itemId] == 0 ){
          const cons=confirm("Remove item from cart?")
          if(cons){
            this.cart.splice(ind,1)
          }
          else{
            this.deliveryChargesApply = 40
            this.counter[itemId]=1
            this.totalAmountInCart=this.totalAmountInCart+itemPrice

        }
      
      }
      }
          
      this.$emit('totalInCart', this.totalAmountInCart)

      if(this.totalAmountInCart >= 500){
        this.free= true
        this.chargesApply= false
        this.deliveryChargesApply=0
        this.chargesNote=false


      }else{
        this.free= false
        this.chargesApply= true
        this.deliveryChargesApply=40
        this.chargesNote=true

      }
      if(this.cart.length === 0){
            this.deliveryChargesApply=0
      }
      else {
        this.deliveryChargesApply=40
      }
    },
    increment(itemId, itemPrice){
      this.counter[itemId]++,
      this.totalAmountInCart=this.totalAmountInCart + itemPrice
      this.$emit('totalInCart', this.totalAmountInCart)
      this.$forceUpdate()
      if(this.totalAmountInCart >= 500){
        this.free= true
        this.chargesApply= false
        this.deliveryChargesApply=0
        this.chargesNote=false

      }
      else{
        this.free= false
        this.chargesApply= true
        this.deliveryChargesApply=40
        this.chargesNote=true
         

      }
    },
    removeItemFromCart(ind,counting,itemPrice) {
        
    if(this.cart.length > 1){
      this.cart.splice(ind,1)
      this.totalAmountInCart=this.totalAmountInCart-(itemPrice * counting)
      this.$forceUpdate()
      

    }
      else if(this.cart.length == 1){
        const conf = confirm("do you want to cleen cart")
        console.log(conf, 'out')

      if(conf){
        this.cart.splice(ind,1)
        this.totalAmountInCart=this.totalAmountInCart-(itemPrice * counting)
        this.deliveryChargesApply = 0
      }
    }

    
    
    if(this.totalAmountInCart >= 500){
        this.free= true
        this.chargesApply= false
        this.deliveryChargesApply = 0
        this.chargesNote=false

      }
      else{
        this.free= false
        this.chargesApply= true
        this.deliveryChargesApply = 40
        this.chargesNote=true
         
      }
       if(this.cart.length == 0){
            this.deliveryChargesApply = 0
          } 
          else {
            this.deliveryChargesApply = 40
          }
      this.$emit('totalInCart', this.totalAmountInCart)
    },
    proceedToPayment(){
      this.$emit('dataFromBuyProductFromCartComponent', this.cartDivAndCartBuyPages)
      setTimeout(() => {
        this.$root.$emit('bv::show::modal','cartOrderSummaryShowButton' , '#cartOrderSummaryShow')
      },100)
    },
  },
}
</script>
<style>
    
  
  #cartDiv li {
    position: relative;
    display: flex;
    align-items: center;
    background: #f1f1f1;
    border-radius: 5px;
    margin-bottom: 10px;
    padding:10px
  }
   #backarrow div{

    position: absolute;
    top:105px;
    height:32px;
  }
  #backarrow img {
    height: 35px;
    cursor: pointer;
  }
  #checkOutTitle {
    position: absolute;
    top:105px;
    left:45%;
    color:#484848;  
    font-weight: 700;
  }
  #AddedCartList {
    background-color:white;
    padding-top:14px;
  }
   #cartItemsList {
    height:370px;
    overflow: auto;
  }
   #cartProductImage {
    height: 80px;
    border-radius: 5px;

  }
  #productName {
    width:200px;
  }
  #dicrement {
    border:none;
  }
  #dicrement img {
    height: 30px;
  }
  #countIncart {
    padding:2px 20px;
    background: white;
  }
   #increment {
    border:none

  }
  #increment img{
   height: 30px;

  }
   #itemRemoveFromCart{
    position: absolute;
    cursor: pointer;
    right:40px;
    top:45px;
  }
  #cartBottomSection {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
  }
   #buynow {
    color:white;
    background: #f46326;
    padding:13px 65px;
    border:none;
  }
  #buynow:hover {
    background: #e24400;
  }
    #cartPriceDetails {
    background: white;
    padding:20px;
  }
   .vue-notification {
    padding:20px 30px !important;
    font-size:16px !important;

  }
</style>
