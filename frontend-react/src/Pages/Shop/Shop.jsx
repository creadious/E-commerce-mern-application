import useAllProducts from "../../hook/useAllProducts";
import LoadingSpin from "../../components/LoadingSpin";
import ProductCard1 from "../../components/ProductCard1";

const Shop = () => {
  const [allProducts, loading] = useAllProducts();
  // console.log(allProducts.products);

  return (
    <main className="md:mt-28 pb-10 mt-16 md:px-20 px-2 min-h-screen">
      <div className="md:px-20 h-full">
        {/* <section className="bg-slate-200 h-full p-5">
          <h1 className="font-medium text-gray-600">Filter</h1>
        </section> */}
        {loading ? (
          <div className=" min-h-screen grid place-content-center">
            <LoadingSpin />
          </div>
        ) : (
          <section className=" grid md:grid-cols-4 grid-cols-2 gap-5">
            {allProducts?.products?.map((data) => {
              return <ProductCard1 key={data?._id} data={data} />;
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Shop;
