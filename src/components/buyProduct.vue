<template>
    <div v-if="buyingList.length > 0">
            <!-- <div id="backArrowInOrderSummaryInDirectBuy">
                <img id='backarrow' @click="directBuyPageBackArrow" :src="require('@/assets/left-arrow.png')" alt="pic">
                <span><b>Back</b></span>
             </div> -->
      
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
                                        <input v-model="name" placeholder="name" type="text">
                                        <p class="text-danger">{{nameError}}</p>
                                    </div>
                                    <div>
                                        <input v-model="village" placeholder="village" type="text">
                                        <p class="text-danger">{{villageError}}</p>
                                    </div>
                                    <div>
                                        <input v-model="mandal" placeholder="mandal" type="text">
                                        <p class="text-danger">{{mandalError}}</p>
                                    </div>
                                    <div>
                                        <input v-model="district" placeholder="district" type="text">
                                        <p class="text-danger">{{districtError}}</p>
                                    </div>
                                    <div>
                                        <input v-model="state" placeholder="state" type="text">
                                        <p class="text-danger">{{stateError}}</p>
                                    </div>
                                    <div>
                                        <input v-model="mobile" placeholder="mobile"  type="text">
                                        <p class="text-danger">{{mobileError}}</p>
                                    </div>
                                    <div>
                                        <input  v-model="pincode" placeholder="pincode" type="text">
                                        <p class="text-danger">{{pincodeError}}</p>
                                    </div>
                                    </div>
                                    <div class="text-right">
                                    <span class="mr-3"><b>Payable:  ₹ {{totalAmountInBuying + deliveryChargesApply}}</b></span>
                                        <button @click="placeOrder" id='makePayment'>Make Payment</button>
                                    </div>
                                </div>
                                <!--<img id="buyingImage" :src="`${buyItem.ItemPic}`" alt="">
                                <h2>Product: {{buyItem.product}}</h2>
                                <p>Quantity: {{counter[buyItem.id]}}</p>
                                <p>₹ {{buyItem.price * counter[buyItem.id]}} Rupees</p> -->
                    
                            </div>
                            <div class="col-md-4">
                                <div id="cartPriceDetailsInBuying">
                                <h5><b>Price Details</b></h5>
                                <hr>
                                 <p v-if='chargesNote' class="text-danger">*Shop ₹500 OR above and avide charges</p>
                                <h6 id="productTitle">Product: {{buyingList[0].product}}</h6>
                                <div class="row">
                                <div class="col-md-8">
                                    <p>Items: </p>
                                    <p>Price:  <b>( {{ buyingList[0].weight }} )</b> </p>
                                    <p>Quantity: <span>({{ buyThingCount }})</span> </p>
                                    <p>Total:</p>
                                    <p>Delivery Charges: </p>
                                    <hr>
                                    <h4><b>Total Amount</b> </h4>
                                    <hr>
                                </div>
                                <div class="col-md-4 p-0">
                                    <p>{{buyingList.length}}</p>
                                    <p> ₹ {{buyingList[0].price}}</p>

                                    <p>
                                        <button id="buyIngCountMinusAndPlusButtons"     @click="buyThingCountMinus">
                                        <img class="pr-1" id="plusImagInCart" :src="require('@/assets/minus.png')" alt="minus">
                                        </button>
                                        <button id="quantityInDirectBuy"> {{ buyThingCount }}</button>
                                        <button id="buyIngCountMinusAndPlusButtons" @click="buyThingCountPlus">
                                        <img class="pl-1" id="plusImagInCart" :src="require('@/assets/plus.png')" alt="minus">
                                        </button>
                                    </p>
                                    <p> ₹ {{buyingList[0].price * buyThingCount}}</p>
                                    <!-- <p>₹ {{buyingList[0].price * buyThingCount}}</p> -->
                                    <p v-if='free' class="text-success">FREE</p>
                                    <p v-if='chargesApply'>₹ {{deliveryChargesApply}}</p>
                                    <hr>
                                    <h4><b>₹ {{totalAmountInBuying + deliveryChargesApply}}</b></h4>
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
    name:'buyProduct',
    props: {
        buyingList: Array,
    },
    data(){
        return {
            totalAmountInBuying:0,
            deliveryChargesApply:40,
            free:false,
            chargesApply:false,
            buyThingCount:1,
            chargesNote:false,

            

            name:'',
            village:'',
            mandal:'',
            district:'',
            state:'',
            mobile:'',
            pincode:'',
            //Errors in direct buy

            nameError:'',
            villageError:'',
            mandalError:'',
            districtError:'',
            stateError:'',
            mobileError:'',
            pincodeError:'',



        }
    },
    beforeMount(){
        for(let indx=0; indx<this.buyingList.length; indx++){
            this.totalAmountInBuying= this.buyingList[indx].price*this.buyThingCount
        }
        if(this.totalAmountInBuying >= 500){
            this.free=true
            this.chargesNote=false
        }
        else{
            if(this.totalAmountInBuying < 500){
                this.chargesApply=true
                this.chargesNote=true
            }
           
        }
       
        
    },
    
    methods: {
        // directBuyPageBackArrow(){
        //     this.backarrowView=false
        //     this.buyingPageView=false
        //     this.orderSummaryView = false
        //     this.homePageItems = true
        //     this.cartDivView=false
        //     this.DirectBuyOrderSummaryView=false
        //     this.buyingList.splice(0, 1);
        //     this.buyThingCount=0
        //     this.$forceUpdate()
        // },
        
        placeOrder(buyThingCount){
            if(this.name.length == 0){
                this.nameError='Please provide name'
                return
            
            }
            else{
                this.nameError=''
            }
            if(this.village.length == 0){
                this.villageError='Please provide village'
                return
            }
            else {
                this.villageError=''
            }
            if(this.mandal.length == 0){
                this.mandalError='Please provide mandal'
                return
            }
            else {
                this.mandalError=''
            }
            if(this.district.length == 0){
                this.districtError='Please provide district'
                return
            }
            else {
                this.districtError=''
            }
            if(this.state.length == 0){
                this.stateError='Please provide state'
                return
            }
            else {
                this.stateError=''
            }
            if(this.mobile.length == 0){
                this.mobileError='Please provide mobile'
                return
            }
            else {
                this.mobileError=''
            }
            if(this.pincode.length == 0){
                this.pincodeError='Please provide pincode'
                return
            }
            else {
                this.pincodeError=''

                this.DirectBuyOrderSummaryView=false
                this.homePageItems=true
                this.buyingPageView=false
                this.directBuyCountOrderSummary= buyThingCount
                alert('place order successfully')
            }
            
        },
        buyThingCountMinus(){
            if(this.buyThingCount > 1){
                this.buyThingCount -= 1
                this.totalAmountInBuying -= this.buyingList[0].price
                if(this.totalAmountInBuying >= 500){
                    this.free= true
                    this.chargesApply= false
                    this.deliveryChargesApply=0
                }
                else{
                    this.free= false
                    this.chargesApply= true
                    this.deliveryChargesApply=40

                }

            }
        },
        buyThingCountPlus(){
            this.buyThingCount += 1
            this.totalAmountInBuying = this.buyingList[0].price * this.buyThingCount
            if(this.totalAmountInBuying >= 500){
                this.free=true
                this.chargesApply=false
                this.deliveryChargesApply=0

            }
            else{
                this.free=false
                this.chargesApply=true
                this.deliveryChargesApply=40


            }
        },  
    },
}
</script>
<style scopped>
    #orderSummary{
        padding:2px 50px;
    }
    #orderSummary li {
        padding:20px 30px;
        list-style-type: none;
    }
    #backArrowInOrderSummaryInDirectBuy img{
        height: 35px;
        cursor: pointer;
    }
    #backArrowInOrderSummaryInDirectBuy{
        position:absolute;
        top:100px;
        left:70px;
    }
    #addressInCartBuy span {
        padding:0
    }
    #addressInCartBuy {
    background:white;
    }
    #addressInCartBuy input {
    height: 40px;
    width:95%;
    margin-right: 10px;
    padding-left:13px;
    }
    #addressInputs {
        display: grid;
        grid-template-columns: auto auto;

    }
    #cartPriceDetailsInBuying {
        background: white;
        
    }
    #productTitle{
        font-weight: 600;
    }
  #addressInputs p{
    width:90%;
    margin: 0;
    margin-bottom: 7px;
  }
  #makePayment {
    color:white;
    background: #f46326;
    padding:15px 25px;
    border:none;
  }
  #makePayment:hover {
    background: #e24400;
  }
  #buyIngCountMinusAndPlusButtons {
  border:none;
  background: none;
  padding:0;

}
#buyIngCountMinusAndPlusButtons img{
  height: 20px;
}
#quantityInDirectBuy {
    padding:0px 15px;
    background:none;
    font-size:15px;
  }
</style>