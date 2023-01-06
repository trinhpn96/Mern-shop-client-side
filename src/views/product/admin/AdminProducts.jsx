import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { EditIcon, TrashIcon } from "../../../components/common/icons";
import Loader from "../../../components/common/icons/Loader";
import useSearchProducts from "../../../hooks/products/useSearchproducts";

import { deleteProductById } from "../../../services/productService";

const DeleteProductModal = ({ id }) => {
  const queryClient = useQueryClient();
  const ref = useRef();

  const mutation = useMutation({
    mutationFn: (productId) => deleteProductById(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log(ref.current);
      ref.current.checked = false;
    },
  });

  return (
    <div>
      <input type="checkbox" ref={ref} id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="text-center">
            {/* Warning icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            {/* Title */}
            <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error text-white"
                onClick={() => mutation.mutate(id)}
              >
                <div className="flex items-center gap-2">
                  {mutation.isLoading && <Loader />}
                  <span>Yes, I'm sure</span>
                </div>
              </button>
              <label htmlFor={id} className="btn btn-outline">
                No, cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

const AdminProductsAction = ({ searchString, setSearchString }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products here"
        className="input input-bordered w-full max-w-xs"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Link to="new" className="btn btn-primary">
        New
      </Link>
    </div>
  );
};

const AdminProductsTable = ({ isLoading, data }) => {
  const [id, setId] = useState(null);

  if (isLoading) return <GlobalSpinner />;

  const {
    data: { products },
  } = data;

  return (
    <div>
      <div className="overflow-x-auto w-full">
        {/* Table */}
        <table className="table w-full">
          {/* <!-- Header --> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {item.category}
                  </span>
                </td>
                <td>$ {item.price}</td>
                <th>
                  <div className="flex items-center gap-2">
                    {/* Edit btn */}
                    <div className="tooltip tooltip-info" data-tip="Edit">
                      <Link
                        to={`${item.id}/edit`}
                        className="btn btn-sm btn-circle btn-info hover:opacity-80"
                      >
                        <EditIcon />
                      </Link>
                    </div>

                    {/* Delete Button */}
                    <div className="tooltip tooltip-warning" data-tip="Delete">
                      <label
                        htmlFor={item.id}
                        className="btn btn-sm btn-circle btn-warning hover:opacity-90"
                        onClick={() => setId(item.id)}
                      >
                        <TrashIcon />
                      </label>
                    </div>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <DeleteProductModal id={id} />
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const [searchString, setSearchString] = useState("");
  const { data, isLoading } = useSearchProducts(searchString);
  //useDebounce : params: state, delay time

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          <AdminProductsAction
            searchString={searchString}
            setSearchString={setSearchString}
          />
          {/* Table */}
          <AdminProductsTable isLoading={isLoading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
