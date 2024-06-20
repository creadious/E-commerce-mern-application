import { user, userLogOut } from "./userAuth";

// console.log(user)

const navbarFunction = async () => {
  const navbar = document.getElementById("navbar");

  navbar.innerHTML = `<header
id="header"
class="fixed w-full z-50 transition-transform duration-300 transform top-0 bg-white px-2 py-4"
>
<div class="w-full flex items-center justify-between md:py-4 xl:w-[1200px] mx-auto">
    <h1 class="md:text-4xl text-2xl font-bold"><a href="/">ECOM</a></h1>
    <div class="md:hidden">
        <button><i class="fa-solid fa-bars"></i></button>
    </div>
    <ul class="md:text-lg md:flex items-center md:gap-8 gap-5 hidden">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="./shop.html" class="nav-link">Shop</a></li>
        <li><a href="/" class="nav-link">About</a></li>
        <li><a href="/" class="nav-link">Contact</a></li>
        <li>
            <a href="./addToCart.html" class="relative md:text-xl" title="Cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -right-2 text-white font-medium">0</span>
            </a>
        </li>
        <li class="relative user-icon cursor-pointer">
        ${
          user
            ? ` <i class="fa-solid fa-user"></i>
            <ul class="user-dropdown">
                <li><a href="/profile.html" class="nav-link">${user?.firstName}</a></li>
                <li><a href="/order.html" class="nav-link">Order</a></li>
                <li><span id="userLogOutId" class="nav-link">Logout</span></li>
            </ul>`
            : `
            <a href="/login.html" class="px-3 py-2 bg-red-500 rounded-sm text-sm text-white">Login</a>`
        }
        </li>
    </ul>
</div>
</header>`;

  if (!user) {
    return false;
  }

  const logOut = document.getElementById("userLogOutId");
  logOut.addEventListener("click", userLogOut);
};

navbarFunction()

/*`<header
id="header"
class="fixed w-full z-50 transition-transform duration-300 transform top-0 bg-white px-2 py-4"
>
<div
  class="w-full flex items-center justify-between md:py-4 xl:w-[1200px] mx-auto"
>
<!-- <div class="mdLhidden">
  <button><i class="fa-solid fa-bars"></i></button>
  <ul class="fixed left-0 h-screen w-[60vw] bg-white uppercase font-medium flex flex-col items-center py-5">
    <li  class="border-b border-black "><a href="#">Watch List <i class="fa-solid fa-heart relative text-lg"> <span
      class="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -right-2 text-white font-medium"
      >0</span > </i>
     </a></li>
  </ul>
</div> -->
  <h1 class="md:text-4xl text-2xl font-bold"><a href="/">ECOM</a></h1>
  <div class="md:hidden">
    <button><i class="fa-solid fa-bars"></i></button>
  </div>
  <ul class="md:text-lg md:flex items-center md:gap-8 gap-5 hidden">
    <!-- <li class="md:block hidden">
      <a href="#" class="relative"
        ><i class="fa-solid fa-heart"></i>
        <span
          class="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -right-2 text-white font-medium"
          >0</span >
      </a>
    </li> -->
    <li><a href="/" class="nav-link" >Home</a></li>
    <li><a href="./shop.html" class="nav-link" >Shop</a></li>
    <li><a href="/" class="nav-link" >About</a></li>
    <li><a href="/" class="nav-link" >Contact</a></li>
    <li>
      <a href="./addToCart.html" class="relative md:text-xl" title="Cart"
        ><i class="fa-solid fa-cart-shopping"></i>
        <span
          class="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -right-2 text-white font-medium"
          >0</span ></a >
      <li>
      <a href="/login.html" class="md:text-xl" title="Account">
        <i class="fa-solid fa-user"></i>
      </a>
      </li>
    </li>
  </ul>
</div>
<!-- <nav class="pb-1">
  <ul class="flex justify-center items-center gap-5 uppercase">
    <li><a href="#" class="border-b-2 duration-200 hover:border-red-500 pb-1">Men Wear</a></li>
    <li><a href="#" class="border-b-2 duration-200 hover:border-red-500 pb-1">Women Wear</a></li>
    <li><a href="#" class="border-b-2 duration-200 hover:border-red-500 pb-1"> Kid Wear</a></li>
  </ul>
</nav>
<div class="mt-3">
  <form action="#" class="flex justify-center gap-2">
    <input type="text" class="w-96 border border-black rounded-md py-1 px-2" placeholder="Search">
    <button><i class="fa-solid fa-magnifying-glass text-2xl"></i></button>
  </form>
</div> -->
</header>`*/
