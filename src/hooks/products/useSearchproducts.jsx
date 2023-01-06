import { useQuery } from "@tanstack/react-query";
import { searchproducts } from "../../services/productService";
import useDebounce from "../useDebounce";

const useSearchProducts = (searchString, delay = 500) => {
  const debouncedSearch = useDebounce(searchString, delay);

  const { data, isLoading } = useQuery({
    queryKey: ["products", { q: debouncedSearch }],
    queryFn: () => searchproducts(searchString),
  });
  return { data, isLoading };
};

export default useSearchProducts;
