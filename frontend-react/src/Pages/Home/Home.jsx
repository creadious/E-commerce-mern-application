import ShopSection from "./ShopSection";

const Home = () => {
  return (
    <main className="md:mt-28 mt-16 md:px-0 px-2">
      {/* <!-- banner section start --> */}
      <section className="xl:w-[1200px] mx-auto grid md:grid-cols-2 grid-cols-1 items-center gap-5">
        <div className="uppercase md:order-1 order-2">
          <p className="tracking-widest md:text-base text-sm">
            New Collections
          </p>
          <h3 className="md:text-5xl text-3xl font-thin">LUXURY BRANDS</h3>
          <h3 className="md:text-5xl text-3xl font-bold">WITHOUT LABELS</h3>
          <div className="mt-4">
            <a
              href="#"
              className="md:text-base text-sm md:px-4 md:py-2 py-2 px-2 bg-black text-white rounded-md font-thin"
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="md:order-2 order-1">
          <img
            src="https://imgv3.fotor.com/images/slider-image/female-smiling-portrait-with-transparent-background.jpg"
            alt=""
          />
        </div>
      </section>
      {/* <!-- banner section end --> */}

      {/* <!-- category sections start --> */}
      <section className="xl:w-[1200px] mx-auto grid md:grid-cols-3 grid-cols-1 gap-5 py-10">
        {/* <!-- card 1 --> */}
        <div className="flex items-center justify-between gap-5 shadow-md p-5 relative overflow-hidden">
          <div className="h-60 w-60 rounded-full bg-slate-200 absolute -z-10 -bottom-32 -right-28"></div>
          <div className="space-y-2">
            <p>New Arrival</p>
            <h2 className="font-semibold text-xl leading-5">
              Get extra 50% off on Women items
            </h2>
            <a
              href="#"
              className="inline-block border-dashed border-b text-red-600 border-red-400"
            >
              Shop Now
            </a>
          </div>
          <img
            src="https://i.pinimg.com/originals/74/c4/37/74c437420e58409c84cd40b97feb000d.png"
            alt="image"
            className="h-32"
          />
        </div>
        {/* <!-- card 2 --> */}
        <div className="flex items-center justify-between gap-5 shadow-md p-5 relative overflow-hidden">
          <div className="h-60 w-60 rounded-full bg-slate-200 absolute -z-10 -bottom-32 -right-28"></div>
          <div className="space-y-2">
            <p>New Arrival</p>
            <h2 className="font-semibold text-xl leading-5">
              Get extra 50% off on Women items
            </h2>
            <a
              href="#"
              className="inline-block border-dashed border-b text-red-600 border-red-400"
            >
              Shop Now
            </a>
          </div>
          <img
            src="https://i.pinimg.com/originals/74/c4/37/74c437420e58409c84cd40b97feb000d.png"
            alt="image"
            className="h-32"
          />
        </div>
        {/* <!-- card 3 --> */}
        <div className="flex items-center justify-between gap-5 shadow-md p-5 relative overflow-hidden">
          <div className="h-60 w-60 rounded-full bg-slate-200 absolute -z-10 -bottom-32 -right-28"></div>
          <div className="space-y-2">
            <p>New Arrival</p>
            <h2 className="font-semibold text-xl leading-5">
              Get extra 50% off on Women items
            </h2>
            <a
              href="#"
              className="inline-block border-dashed border-b text-red-600 border-red-400"
            >
              Shop Now
            </a>
          </div>
          <img
            src="https://i.pinimg.com/originals/74/c4/37/74c437420e58409c84cd40b97feb000d.png"
            alt="image"
            className="h-32"
          />
        </div>
      </section>
      {/* <!-- category sections end --> */}

      {/* <!-- Policy sections start --> */}
      <section className="xl:w-[1200px] min-h-48 mx-auto grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-2 md:py-10 py-5">
        {/* <!-- Card 1 --> */}
        <div className="h-full flex justify-around items-center md:gap-5 gap-2 md:p-5 p-3 bg-red-100 rounded-md">
          <i className="fa-solid fa-truck md:text-3xl text-2xl text-red-400"></i>
          <div className="text-right">
            <h3 className="md:text-base text-sm font-medium text-red-400">
              Pan India Shipping
            </h3>
            <h5 className="md:text-sm text-xs text-slate-500">
              Order above ₹1000
            </h5>
          </div>
        </div>
        {/* <!-- Card 1 --> */}
        <div className="h-full flex justify-around items-center md:gap-5 gap-2 md:p-5 p-3 bg-red-100 rounded-md">
          <i className="fa-solid fa-rotate md:text-3xl text-2xl text-red-400"></i>
          <div className="text-right">
            <h3 className="md:text-base text-sm font-medium text-red-400">
              Easy 30 Day Returns
            </h3>
            <h5 className="md:text-sm text-xs text-slate-500">
              Back Returns in 7 Days
            </h5>
          </div>
        </div>
        {/* <!-- Card 1 --> */}
        <div className="h-full flex justify-around items-center md:gap-5 gap-2 md:p-5 p-3 bg-red-100 rounded-md">
          <i className="fa-solid fa-hand-holding-dollar md:text-3xl text-2xl text-red-400"></i>
          <div className="text-right capitalize">
            <h3 className="md:text-base text-sm font-medium text-red-400">
              Money back guarantee
            </h3>
            <h5 className="md:text-sm text-xs text-slate-500">
              guarantee with in 30-Days
            </h5>
          </div>
        </div>
        {/* <!-- Card 1 --> */}
        <div className="h-full flex justify-around items-center md:gap-5 gap-2 md:p-5 p-3 bg-red-100 rounded-md">
          <i className="fa-solid fa-headset md:text-3xl text-2xl text-red-400"></i>
          <div className="text-right capitalize">
            <h3 className="md:text-base text-sm font-medium text-red-400">
              Easy online support
            </h3>
            <h5 className="md:text-sm text-xs text-slate-500">
              24/7 any time support
            </h5>
          </div>
        </div>
      </section>
      {/* <!-- Policy sections end --> */}

      {/* <!-- Shop store section start --> */}
      <ShopSection />
      {/* <!-- Shop store section end --> */}

      {/* <!-- Contact section start --> */}
      <section id="contact" className="py-10 bg-red-200">
        <div className="grid md:grid-cols-2 grid-cols-1 xl:w-[1200px] mx-auto">
          <div className="">
            <h2 className="text-4xl">Sign up for our newsletter.</h2>
            <p className="text-xl mt-3 font-thin">
              Stay in the know on new releases, special offers, and more.
            </p>
          </div>
          <div className="">
            <form
              // onSubmit=""
              className="py-6 md:py-2 md:px-6 px-4 flex flex-col items-start md:gap-5 gap-8"
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="bg-transparent border border-slate-500 px-2 py-2 w-full placeholder:text-slate-500"
                required
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="bg-transparent border border-slate-500 px-2 py-2 w-full placeholder:text-slate-500"
                required
              />

              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Your Phone No."
                className="bg-transparent border border-slate-500 px-2 py-2 w-full placeholder:text-slate-500"
                required
              />

              <button
                type="submit"
                id="submitBtn2"
                className="bg-white outline-1 text-black px-10 mb-6 md:mb-0 py-1 hover:bg-black hover:text-white"
              >
                <span className="hidden" id="loading-spin2">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Contact section end --> */}
    </main>
  );
};

export default Home;
