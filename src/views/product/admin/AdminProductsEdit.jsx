import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AdminProductsForm from "./AdminProductsForm";
import { productSchema } from "../../../validation/productSchema";
import useProduct from "../../../hooks/products/useProduct";
import { updateProductById } from "../../../services/productService";

const AdminProductsEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // const [isFileUploading, setIsFileUploading] = useState(false);

  //Fetch product by id
  const { data, isLoading } = useProduct(productId);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  //Reset data form after fetching from server
  useEffect(() => {
    reset(data?.data);
  }, [data]);

  //update product
  const mutation = useMutation({
    mutationFn: (newProduct) => updateProductById(productId, newProduct),
    onSuccess: () => {
      navigate("/admin/products");
      toast.success("🦄 Woww..Saved successfully!");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  //   if (dirtyFields.image) {
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         switch (snapshot.state) {
  //           case "running":
  //             setIsFileUploading(true);
  //             break;
  //         }
  //       },
  //       (error) => {
  //         // Handle unsuccessful uploads
  //       },
  //       () => {
  //         // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setIsFileUploading(false);
  //           mutation.mutate({ ...data, imageUrl: downloadURL });
  //         });
  //       }
  //     );
  //   } else {
  //     mutation.mutate(data);
  //   }
  // };

  if (isLoading) return <GlobalSpinner />;

  return (
    <AdminProductsForm
      watch={watch}
      onSubmit={handleSubmit(onSubmit)} //submit data to server and saved.
      register={register}
      isLoading={mutation.isLoading}
      errors={errors}
      btnLabel="Save Product"
      isDirty={isDirty}
    />
  );
};

export default AdminProductsEdit;
