<template>
    <div>
        <div id="navBar">
            <b-navbar toggleable="lg" type="dark">
                <b-navbar-brand href="#">
                <img  id="logo" :src="require('@/assets/logo1.png')" alt="logo">
                <span id='brandName' @click="openHomePage">Fruit Bazaar</span> 
                
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">ABOUT</b-nav-item>
                    <b-nav-item href="#">COTACT US</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                   
                

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>



        <div title="Open cart !">
            <img id='cartIcon' :src="require('@/assets/shopping-cart.png')" alt="pic" @click="openCart">
            <span @click="openCart" id="cartCounting">{{cart.length}}</span>
        </div>

        <br>
    </div>
</template>
<script>
export default {
    name:'navbar',
    props: {
        searcInput: String,
        cart: Array,
    },
    data(){
        return{
            dataToHomePage:{
                cartDivView:true,
                homePageItems:false

            },
            openHomePageItems: {
                cartDivView:false,
                homePageItems:true,
                buyingPageVisible:false,
                orderSummaryViewOfCartBuy:false
            }
    


            
        }
    },
    methods: {
        openCart(){
            if(this.cart.length > 0){
                this.homePageItems = false
                this.cartDivView=true
                this.orderSummaryView=false
                this.buyingPageView=false
                this.$emit('fromNavbar', this.dataToHomePage)
                this.$forceUpdate()
            }
            else{
                alert("Nothing in cart! Add more")
            }
      

        },
        openHomePage(){
            this.$emit('openHome', this.openHomePageItems)
        }
    },
    
}
</script>
<style scoped>
    #navBar {
        background:#0065ad;
        color:white;
    
    }
    .navbar-dark .navbar-brand {
        font-size: 29px;
        display: flex;
        align-items: center;
    }
    #brandName {
        font-weight: 600;
        margin: 0;
    }
    #logo {
        height: 70px;
        padding-left:11px;
    }
    #cartIcon {
    height: 30px;
    position:absolute;
    top:38px;
    right:40px;
    cursor: pointer;
  }
  #cartCounting {
   color: white;
    position: absolute;
    border-radius: 30%;
    top: 14px;
    right: 40px;
    font-size: 17px;
    font-weight: bold;
    padding:7px;
    cursor: pointer;
  }
</style>