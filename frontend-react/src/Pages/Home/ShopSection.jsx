import ProductCard1 from "../../components/ProductCard1";
import useAllProducts from "../../hook/useAllProducts";

const ShopSection = () => {
  const [allProducts] = useAllProducts();
  console.log(allProducts);

  return (
    <section className="xl:w-[1200px] mx-auto md:pb-10 py-5">
      <h1 className="uppercase font-semibold text-2xl">Our Poplar Items</h1>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-5 mt-5">
        {allProducts?.products.slice(0, 4).map((data) => (
          <ProductCard1 key={data?._id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default ShopSection;
