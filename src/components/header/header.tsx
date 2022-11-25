import { component$, useClientEffect$, useContext, useStore, useWatch$ } from '@builder.io/qwik';
import { MyContext } from '~/root';

export default component$(() => {
  const store = useStore({
    scrolled: false,
    numItems: 0,
    modal: false,
    cart: []
  })

  const contextState = useContext(MyContext)
  
  // useClientEffect$(() => {
  //   if(localStorage.getItem('corgi-basket')){
  //     const currBasket = JSON.parse(localStorage.getItem('corgi-basket'))
  //     const numItemsInBasket = currBasket.items.length
  //     store.numItems = numItemsInBasket
  //     store.cart = currBasket
  //   }
  // })

  useWatch$(({track}) => {
    const tempCart = track(() => contextState.items)
    store.numItems = tempCart.length
    store.cart = tempCart
  })

  return (
    <header class={"fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white text-xl sm:text-4xl sm:p-8 z-40 " + (store.scrolled ? ' bg-slate-700 shadow': ' bg-transparent')}
    document:onScroll$={() => {
      if(window.scrollY>0){
        store.scrolled = true
      }else{
        store.scrolled = false
      }
    }}>
      <a href="/">Corgitto</a>
      <div class="text-xl sm:text-3xl relative cursor-pointer"
      onClick$={() => (
        store.modal = true
      )}>
        <i class="fa-solid fa-cart-shopping"></i>
        {store.numItems>0 && <div class="absolute -top-2 -right-2 bg-slate-900 rounded-full h-5 w-5 text-xs grid place-items-center">
          {store.numItems}
        </div>}
      </div>
      {store.modal && <>
        <div class="absolute top-0 right-0 w-full h-screen overflow-scroll bg-white z-50 flex flex-col gap-4 p-4 sm:w-[500px] text-slate-900">
            <div class="flex items-center justify-between pb-4 border-b">
                <h1 class="font-bold text-4xl">CART</h1>
                <i class="fa-solid fa-xmark cursor-pointer hover:rotate-45" onClick$={()=> {
                  store.modal = false
                }}></i>
            </div>
            {store.cart.length > 0 ?
              <div class="flex flex-col gap-[1px]">
                {store.cart.map((item, i) => {
                  return (
                    <div class="bg-white p-4 flex items-center justify-between text-slate-900">
                      <div class="flex flex-col gap-1">
                        <h2>{item.name}</h2>
                        <p class="text-xs">${item.price}</p>
                      </div>
                      <i class="fa-solid fa-xmark cursor-pointer text-sm hover:opacity-40"
                      onClick$={() => {
                        contextState.items = contextState.items.reduce(
                          (acc, curr, index) => {
                            if(index!=i){
                              return [...acc, curr]
                            }
                            return acc
                          }, [])
                      }}
                      ></i>
                    </div>
                  )
                })}
                <button class="border border-solid font-semibold bg-white border-slate-500 py-8 text-xl hover:bg-slate-300"
                onClick$={() => {contextState.items = []}}>
                  Checkout
                </button>
              </div> :
              <div>
                <h3 class="text-sm">Your cart is Empty</h3>
              </div>
            }
        </div>
      </>}
    </header>
  );
});