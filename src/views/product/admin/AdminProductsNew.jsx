import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AdminProductsForm from "./AdminProductsForm";
import { productSchema } from "../../../validation/productSchema";
import { createProduct } from "../../../services/productService";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useState } from "react";

const AdminProductsNew = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("🦄 Woww..Added successfully!");
    },
  });

  const onSubmit = (data) => {
    // mutation.mutate(data)
    const file = data.image[0];
    const category = data.category;

    // Upload file to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `products/${category}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "running":
            setIsFileUploading(true);
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsFileUploading(false);
          mutation.mutate({ ...data, imageUrl: downloadURL });
        });
      }
    );
  };

  return (
    <AdminProductsForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Create Product"
      watch={watch}
    />
  );
};

export default AdminProductsNew;
