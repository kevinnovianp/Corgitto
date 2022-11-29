import { component$, useClientEffect$, useContext, useStore } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { MyContext } from '~/root';

export default component$(() => {

  const state = useStore({
    name: '',
    price: '',
    url: ''
  });

  const contextState = useContext(MyContext)
//   console.log(contextState)

  useClientEffect$(() => {
    const data = JSON.parse(localStorage.getItem('corgitto'))
    state.name = data.name
    state.price = data.price
    state.url = data.url
  });

  useClientEffect$(() => {
    if(localStorage.getItem('corgi-basket')){
        contextState.items = [...JSON.parse(localStorage.getItem('corgi-basket')).items]
    }
  })

  return (
    <div class="flex min-h-screen flex-col gap-2">
        <img src={state.url} alt={state.name} class="object-cover relative z-10" />
        <div class="flex justify-between p-4">
            <h2 class="text-xl">{state.name}</h2>
            <p>${state.price}</p>
        </div>
        <button class="border py-2 border-slate-900 border-solid px-8 mb-8 mx-auto hover:opacity-50"
        onClick$={() => {
            let currBasket = {items: []}
            if(localStorage.getItem('corgi-basket')){
                currBasket = JSON.parse(localStorage.getItem('corgi-basket'))
            }
            currBasket.items.push(state)
            localStorage.setItem('corgi-basket', JSON.stringify(currBasket))
            contextState.items = [...contextState.items, state]
        }}
        >ADOPT</button>
        {/* {contextState.items.map((element) => {
            return <div> {element.name} </div>
        })} */}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Corgitto',
};
