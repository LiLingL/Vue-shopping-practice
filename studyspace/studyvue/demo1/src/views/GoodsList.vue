<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click.stop="sortGoods()" href="javascript:void(0)" class="price">Price
            <span v-html="svgImg"></span>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur': priceChecked == 'all'}">All</a>
              </dd>
              <dd v-for="(pIem,index) in priceFilter" :key="index">
                <a href="javascript:void(0)"
                   @click="setPriceFilter(index, parseFloat(pIem.startPrice), parseFloat(pIem.endPrice))"
                   :class="{'cur': priceChecked == index}">{{ pIem.startPrice}} - {{ pIem.endPrice}}</a>
              </dd>

            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :key="item.productId">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{ item.productName }}</div>
                    <div class="price">{{ item.productPrice }}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCard(item)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img v-lazy="'/static/loading-svg/loading-bars.svg'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closeShow()"></div>
    <modal :cardShow="cardShow" @cardClose="cardClose()">
      <p slot="message" class="loginCont-p">请先登录，才能加入购物车</p>
      <button slot="mess-btn" @click.stop="cardShow = false" class="loginCont-btn">关闭</button>
    </modal>
    <modal :cardShow="cardShowCart" @cardClose="cardClose()">
      <p slot="message" class="loginCont-p">加入购物车成功</p>
      <div slot="mess-btn">
        <button @click.stop="cardShowCart = false" class="loginCont-pbtn">继续购物</button>
        <router-link to="/cart" class="loginCont-pbtn">查看购物车</router-link>
      </div>

    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  import modal from "../components/modal"

  export default {
    name: "GoodsList",
    data: function () {
      return {
        svgImg: '<svg class="icon icon-arrow-short" t="1578475390107" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5689"><path d="M225.25012456 627.86058098L474.92461438 877.53507079a17.51360662 17.51360662 0 0 0 5.47914927 3.68555225c0.06364385 0.02892875 0.12150204 0.06942944 0.1909315 0.09835891a17.43260598 17.43260598 0 0 0 2.81768248 0.87365537c0.17357394 0.04050069 0.33557597 0.11571574 0.51493626 0.1504308 1.15715945 0.23143218 2.33167643 0.35293352 3.50040709 0.35293352L522.76158218 882.69600164a17.5830368 17.5830368 0 0 0 14.24463173-7.30746139L784.5457444 627.86058098a17.6466799 17.6466799 0 0 0-1e-8-24.96571322l-24.96571322-24.97149883a17.65825183 17.65825183 0 0 0-24.96571324 0l-194.19448391 194.20026951L540.41983402 158.86967761a17.65246624 17.65246624 0 0 0-17.65825184-17.65825183l-35.31071806 0a17.65246624 17.65246624 0 0 0-17.65246622 17.65825183L469.79839789 772.53443019l-194.61106126-194.61106126a17.65825183 17.65825183 0 0 0-24.96571323 0l-24.96571323 24.97149883a17.6466799 17.6466799 0 0 0-0.00578561 24.96571322z" fill="#333333" p-id="5690"></path></svg>',
        goodsList: [],
        priceFilter: [
          {
            startPrice: "0.00",
            endPrice: "500.00"
          },
          {
            startPrice: "500.00",
            endPrice: "1000.00"
          },
          {
            startPrice: "1000.00",
            endPrice: "1500.00"
          },
          {
            startPrice: "1500.00",
            endPrice: "2000.00"
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overlayFlag: false,
        sortFlag: true,
        busy: true,
        userName: '',
        cardShow: false,
        cardShowCart: false,
        cartData: []
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      modal
    },
    mounted() {
      this.getGoodsList();
      this.getCookie();
      this.getCartData()
    },
    methods: {
      getCartData(){
        var data = window.localStorage.getItem("cartData")
        this.cartData = JSON.parse(data)
      },
      getCookie(){
        var aa = localStorage.getItem("Uname")
        if (aa) {
          this.userName = aa
        } else {
          this.userName = ''
        }
        return aa;
      },
      getGoodsList() {
        axios.get('/api/appData').then((response) => {
          if (response.status == 200) {
            let list = response.data.data.result;

            function minSort(arr) {
              var min
              for (var i = 0; i < arr.length; i++) {
                for (var j = i; j < arr.length; j++) {
                  if (arr[i].productPrice > arr[j].productPrice) {
                    min = arr[j]
                    arr[j] = arr[i]
                    arr[i] = min
                  }
                }
              }
              return arr
            }

            list = minSort(list)
            this.goodsList = list
          } else {
            this.goodsList = []
          }
        })
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.goodsList.reverse()
        if (this.sortFlag) {
          this.svgImg = '<svg class="icon icon-arrow-short" t="1578475390107" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5689"><path d="M225.25012456 627.86058098L474.92461438 877.53507079a17.51360662 17.51360662 0 0 0 5.47914927 3.68555225c0.06364385 0.02892875 0.12150204 0.06942944 0.1909315 0.09835891a17.43260598 17.43260598 0 0 0 2.81768248 0.87365537c0.17357394 0.04050069 0.33557597 0.11571574 0.51493626 0.1504308 1.15715945 0.23143218 2.33167643 0.35293352 3.50040709 0.35293352L522.76158218 882.69600164a17.5830368 17.5830368 0 0 0 14.24463173-7.30746139L784.5457444 627.86058098a17.6466799 17.6466799 0 0 0-1e-8-24.96571322l-24.96571322-24.97149883a17.65825183 17.65825183 0 0 0-24.96571324 0l-194.19448391 194.20026951L540.41983402 158.86967761a17.65246624 17.65246624 0 0 0-17.65825184-17.65825183l-35.31071806 0a17.65246624 17.65246624 0 0 0-17.65246622 17.65825183L469.79839789 772.53443019l-194.61106126-194.61106126a17.65825183 17.65825183 0 0 0-24.96571323 0l-24.96571323 24.97149883a17.6466799 17.6466799 0 0 0-0.00578561 24.96571322z" fill="#333333" p-id="5690"></path></svg>'
        } else {
          this.svgImg = '<svg t="1578476426258" class="icon icon-arrow-short" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5809"><path d="M798.74987544 396.13941902L549.07538562 146.46492921a17.51360662 17.51360662 0 0 0-5.47914927-3.68555225c-0.06364385-0.02892875-0.12150204-0.06942944-0.1909315-0.09835891a17.43260598 17.43260598 0 0 0-2.81768248-0.87365537c-0.17357394-0.04050069-0.33557597-0.11571574-0.51493626-0.1504308-1.15715945-0.23143218-2.33167643-0.35293352-3.50040709-0.35293352L501.23841782 141.30399836a17.5830368 17.5830368 0 0 0-14.24463173 7.30746139L239.4542556 396.13941902a17.6466799 17.6466799 0 0 0 1e-8 24.96571322l24.96571322 24.97149883a17.65825183 17.65825183 0 0 0 24.96571324 0l194.19448391-194.20026951L483.58016598 865.13032239a17.65246624 17.65246624 0 0 0 17.65825184 17.65825183l35.31071806 0a17.65246624 17.65246624 0 0 0 17.65246622-17.65825183L554.20160211 251.46556981l194.61106126 194.61106126a17.65825183 17.65825183 0 0 0 24.96571323 0l24.96571323-24.97149883a17.6466799 17.6466799 0 0 0 0.00578561-24.96571322z" fill="#333333" p-id="5810"></path></svg>'
        }
      },
      showFilterPop() {
        this.filterBy = true;
        this.overlayFlag = true
      },
      setPriceFilter(index, startP, endP) {
        this.priceChecked = index;
        if (index == 'all') {
          this.getGoodsList()
        } else {
          var allList = [];
          axios.get('/api/appData').then((response) => {
            if (response.status == 200) {
              let list = response.data.data.result;

              function minSort(arr) {
                var min
                for (var i = 0; i < arr.length; i++) {
                  for (var j = i; j < arr.length; j++) {
                    if (arr[i].productPrice > arr[j].productPrice) {
                      min = arr[j]
                      arr[j] = arr[i]
                      arr[i] = min
                    }
                  }
                }
                return arr
              }


              allList = minSort(list)
              let sortList = []
              for (var i = 0; i < allList.length; i++) {
                if (allList[i].productPrice >= startP && allList[i].productPrice < endP) {
                  sortList.push(allList[i])
                }
              }
              this.goodsList = sortList
            } else {
              allList = []
            }
          })


        }
        this.closeShow()
      },
      closeShow() {
        this.filterBy = false;
        this.overlayFlag = false
      },
      loadMore: function () {
        // this.busy = true;
        //
        // setTimeout(() => {
        //   for (var i = 0, j = 10; i < j; i++) {
        //     this.data.push({ name: count++ });
        //   }
        //   this.busy = false;
        // }, 1000);
      },
      addCard(product) {
        var aa = this.getCookie()
        if (!aa) {
          this.cardShow = true
        }else {
          if (this.cartData) {
            var status = 0
            for(let i = 0; i < this.cartData.data.length; i ++){
              if (this.cartData.data[i].productId == product.productId) {
                status = 1
                this.cartData.data[i].productNum ++
                window.localStorage.setItem("cartData", JSON.stringify(this.cartData))
              }
            }
            if (!status) {
                var data = {
                  "productId": product.productId,
                  "productName": product.productName,
                  "productPrice": product.productPrice,
                  "productImg": product.productImg,
                  "checked":1,
                  "productNum": 1
                }
                this.cartData.data.push(data)
                window.localStorage.setItem("cartData", JSON.stringify(this.cartData))
            }
          } else {
            this.cartData = {
              data: [
                  {
                    "productId": product.productId,
                    "productName": product.productName,
                    "productPrice": product.productPrice,
                    "productImg": product.productImg,
                    "checked":1,
                    "productNum": 1
                  }
                ]
              }
            window.localStorage.setItem("cartData", JSON.stringify(this.cartData))
          }
          this.cardShowCart = true
        }

      },
      cardClose(){
        this.cardShow = false;
        this.cardShowCart = false
      }
    }
  }
</script>

<style scoped>
  .btn:hover {
      background-color: #ffe5e6;
      transition: all .3s ease-out;
  }
</style>
