import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main class="flex-1 flex-col relative w-full">
        <Header />
          <Slot />
      </main>
      <footer>
      </footer>
    </>
  );
});
