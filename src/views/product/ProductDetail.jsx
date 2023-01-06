import { useParams } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import useProduct from "../../hooks/products/useProduct";

const ProductDetail = () => {
  const { productId } = useParams(); // return an obj with key "id"
  const { data, isLoading } = useProduct(productId);

  if (isLoading) return <GlobalSpinner />;
  const { data: product } = data;

  return (
    <div>
      {/* Container */}
      <div className=" max-w-screen-lg mx-auto px-6 my-3">
        {/* Layout */}
        <div className="grid sm:grid-flow-row md:grid-cols-2 gap-8 justify-between py-4">
          {/* Product img */}
          <div className="py-3 ">
            <img
              src={product.imageUrl}
              alt={product.title}
              className=" shadow-xl shadow-amber-400/50 aspect-square rounded-xl lg:rounded-2xl transition duration-500 hover:scale-105 object-cover "
            />
          </div>

          {/* Product Container */}
          <div className="py-3 ">
            {/* Category */}
            <span className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              {product.category}
            </span>

            {/* Title & Price */}
            <div className="flex justify-between my-4">
              <div className="max-w-xs">
                <h3 className=" text-orange-600/70 hover:text-3xl hover:text-amber-500 text-2xl font-bold">{product.title}</h3>
              </div>
              <p className="py-1 px-4 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 bg text-lg text-white font-semibold">$ {product.price}</p>
            </div>

            {/* Description */}
            <div>
              <div>
                <h5 className=" font-bold mb-4 text-fuchsia-900 ">Description:</h5>
                <p className="text-justify font-sans font-extralight opacity-80 ">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
