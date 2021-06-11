<template>
    <div>
     
      <h2 class="text-center mb-3"><b>Order Summary</b></h2>
        <section>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-8">
                  <div id="addressInCartBuy">
                    <h5><b>Delivery To<span class="text-danger p-0">*</span></b></h5>
                    <hr>
                    <div id="addressInputs">
                      <div>
                        <input v-model="nameInCartBuy" placeholder="name" type="text">
                        <p class="text-danger">{{nameInCartBuyError}}</p>
                      </div>
                      <div>
                        <input v-model="villageInCartBuy" placeholder="village" type="text">
                        <p class="text-danger">{{villageInCartBuyError}}</p>
                      </div>
                      <div>
                        <input v-model="mandalInCartBuy" placeholder="mandal" type="text">
                        <p class="text-danger">{{mandalInCartBuyError}}</p>
                      </div>
                      <div>
                        <input v-model="districtInCartBuy" placeholder="district" type="text">
                        <p class="text-danger">{{districtInCartBuyError}}</p>
                      </div>
                      <div>
                        <input v-model="stateInCartBuy" placeholder="state" type="text">
                        <p class="text-danger">{{stateInCartBuyError}}</p>
                      </div>
                      <div>
                        <input v-model="mobileInCartBuy" placeholder="mobile"  type="text">
                        <p class="text-danger">{{mobileInCartBuyError}}</p>
                      </div>
                      <div>
                        <input  v-model="pincodeInCartBuy" placeholder="pincode" type="text">
                        <p class="text-danger">{{pincodeInCartBuyError}}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="mr-3"><b>Payable: ₹ {{cartTotal + deliveryCharges}}</b></span>
                      <button @click="makePaymentInCart" id='makePayment'>Make Payment</button>
                    </div>
                  </div>
                  <!--<img id="buyingImage" :src="`${buyItem.ItemPic}`" alt="">
                  <h2>Product: {{buyItem.product}}</h2>
                  <p>Quantity: {{counter[buyItem.id]}}</p>
                  <p>₹ {{buyItem.price * counter[buyItem.id]}} Rupees</p> -->
              </div>
               <div class="col-md-4">
                <div  id="cartPriceDetails">
                <h5><b>Price Details</b></h5>
                <hr>
                    <p v-if='chargesNote' class="text-danger">*Shop ₹500 OR above and avide charges</p>

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
                    <p>₹ {{cartTotal}}</p>
                    <p v-if='free' class="text-success">FREE</p>
                    <p v-if='chargesApply'>₹ {{deliveryCharges}}</p>

                    <hr>
                    <h4><b>₹ {{cartTotal + deliveryCharges }}</b></h4>
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
    name: 'buyProductFromCart',
    props:{
      cart:Array,
      cartTotal:Number
    },
    data(){
      return {
        deliveryCharges:40,
        free:false,
        chargesApply:false,
        chargesNote:false,
        nameInCartBuy:'',
        villageInCartBuy:'',
        mandalInCartBuy:'',
        districtInCartBuy:'',
        stateInCartBuy:'',
        mobileInCartBuy:'',
        pincodeInCartBuy:'',

      //Errors in cart buy

        nameInCartBuyError:'',
        villageInCartBuyError:'',
        mandalInCartBuyError:'',
        districtInCartBuyError:'',
        stateInCartBuyError:'',
        mobileInCartBuyError:'',
        pincodeInCartBuyError:'',
       }
    },
    beforeMount(){
       if(this.cartTotal >= 500){
        this.deliveryCharges=0
        this.free=true
        this.chargesNote=false

      }
      else {
        this.deliveryCharges=40
        this.chargesApply=true
        this.free=false
        this.chargesNote=true
      }
    },
    methods: {
        makePaymentInCart(){
        if(this.nameInCartBuy.length == 0){
          this.nameInCartBuyError="please provide name"
        return
      
      }
      else{
        this.nameInCartBuyError=''
      }
      if(this.villageInCartBuy.length == 0){
        this.villageInCartBuyError="please provide village"
        return
        
      }
      else {
        this.villageInCartBuyError=''
      }
      if(this.mandalInCartBuy.length == 0){
        this.mandalInCartBuyError="please provide mandal"
        return
      }
      else {
        this.mandalInCartBuyError=''
      }
      if(this.districtInCartBuy.length == 0){
        this.districtInCartBuyError="please provide district"
        return
      }
      else {
        this.districtInCartBuyError=''
      }
      if(this.stateInCartBuy.length == 0){
        this.stateInCartBuyError='please provide state'
        return
      }
      else {
        this.stateInCartBuyError=''
      }
      if(this.mobileInCartBuy.length == 0){
        this.mobileInCartBuyError='please provide mobile number'
        return
      }
      else {
        this.mobileInCartBuyError=''
      }
      if(this.pincodeInCartBuy.length == 0){
        this.pincodeInCartBuyError='please provide pincode'
        return
      }
      else {
        this.pincodeInCartBuyError=''
        alert("select Payment method in next page!")
      }
      
    },
    },
    
}
</script>
<style scopped>
    
</style>