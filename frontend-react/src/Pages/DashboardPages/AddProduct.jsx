import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpin from "../../components/LoadingSpin";

const AddProduct = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch categories and subcategories
  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories/view-categories");
      return res.data.data;
    },
  });

  // Mutation for adding a new category
  const addCategoryMutation = useMutation({
    mutationFn: (newCategory) =>
      axiosSecure.post("/categories/add-category", { category: newCategory }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully!");
    },
  });

  // Mutation for adding a new subcategory
  const addSubcategoryMutation = useMutation({
    mutationFn: ({ categoryId, subcategory }) =>
      axiosSecure.post("/categories/add-subcategory", {
        categoryId,
        subcategory,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Subcategory added successfully!");
    },
  });

  const sizeData = [
    { value: "S", label: "S" },
    { value: "XS", label: "XS" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [subCategoryData, setSubCategoryData] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const subcategoriesMap = {};
    categoriesData.forEach((category) => {
      subcategoriesMap[category._id] = category.subcategories.map((sub) => ({
        value: sub._id,
        label: sub.name,
      }));
    });
    setSubCategoryData(subcategoriesMap);
    setCategoryData(
      categoriesData.map((category) => ({
        value: category._id,
        label: category.name,
      }))
    );
  }, [categoriesData]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedSubCategory(null);

    if (selectedOption.value === "addNew") {
      setNewCategory("");
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleNewCategorySubmit = () => {
    if (newCategory.trim() !== "") {
      addCategoryMutation.mutate(newCategory);
      setNewCategory("");
    }
  };

  const handleSubCategoryChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption);

    if (selectedOption?.value === "addNew") {
      setNewSubCategory("");
    }
  };

  const handleNewSubCategoryChange = (event) => {
    setNewSubCategory(event.target.value);
  };

  const handleNewSubCategorySubmit = () => {
    if (newSubCategory.trim() !== "" && selectedCategory) {
      addSubcategoryMutation.mutate({
        categoryId: selectedCategory.value,
        subcategory: newSubCategory,
      });
      setNewSubCategory("");
    }
  };

  const handleSizeChange = (selectedOptions) => {
    setSelectedSizes(selectedOptions);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      setIsLoading(true);
      setIsError("");

      const formData = new FormData();

      const fields = [
        { name: "name", value: form.name.value },
        { name: "description", value: form.description.value },
        { name: "actualPrice", value: parseFloat(form.actualPrice.value) },
        { name: "offerPrice", value: parseFloat(form.offerPrice.value) },
        { name: "stocks", value: parseInt(form.stocks.value) },
        {
          name: "sizes",
          value: JSON.stringify(selectedSizes.map((size) => size.value)),
        },
        { name: "category", value: selectedCategory.value },
      ];

      for (const field of fields) {
        if (
          !field.value ||
          (Array.isArray(field.value) && field.value.length === 0)
        ) {
          setIsLoading(false);
          setIsError("Please fill out all required fields.");
          toast.error("Please fill out all required fields.");
          return;
        }
        formData.append(field.name, field.value);
      }

      if (!selectedImage) {
        toast.error("Please fill out all required fields.");

        setIsLoading(false);
        setIsError("Please fill image fields.");
        return;
      }

      formData.append("productImage", selectedImage);

      if (selectedSubCategory && selectedSubCategory.value !== "addNew") {
        formData.append("subcategory", selectedSubCategory.value);
      }

      try {
        const res = await axiosSecure.post("/products/add-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data?.success) {
          setIsLoading(false);
          setIsError("");
          toast.success(res.data?.message);
          form.reset();
          setSelectedCategory(null);
          setSelectedSubCategory(null);
          setSelectedSizes([]);
          setSelectedImage(null);
          setImagePreview("");
        }
      } catch (error) {
        setIsError("");
        console.error("Error adding product:", error?.response?.data);
        setIsLoading(false);
        toast.error("Failed to add product. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError("Please fill out all required fields.");
      toast.error("Failed to add product. Please try again later.");
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold uppercase text-center py-2">
        Add Product
      </h2>
      <form onSubmit={handleAddProduct} className="">
        <div className="space-y-2">
          <div>
            <label className="text-xs font-medium">
              Product Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter here..."
              className="w-full p-1"
            />
          </div>
          <div>
            <label className="text-xs font-medium">
              Description<span className="text-red-600">*</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Enter here..."
              className="w-full p-1 min-h-32"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className="text-xs font-medium">
              Actual Price<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="actualPrice"
              placeholder="Enter here..."
              className="w-full p-1"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium">
              Offer Price<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="offerPrice"
              placeholder="Enter here..."
              className="w-full p-1"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium">
              Stocks<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="stocks"
              placeholder="Enter here..."
              className="w-full p-1"
            />
          </div>
          <div className="col-span-3">
            <label className="text-xs font-medium">
              Category<span className="text-red-600">*</span>
            </label>
            {categoriesLoading ? (
              <div className="w-full flex justify-center py-2 mt-1 bg-white">
                <LoadingSpin />
              </div>
            ) : (
              <>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={[
                    ...categoryData,
                    { value: "addNew", label: "Add new category" },
                  ]}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                {selectedCategory?.value === "addNew" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter new category"
                      value={newCategory}
                      onChange={handleNewCategoryChange}
                      className="w-full p-1 border"
                    />
                    <button
                      type="button"
                      onClick={handleNewCategorySubmit}
                      className="mt-1 p-1 bg-blue-500 text-white"
                    >
                      Add Category
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          {selectedCategory && selectedCategory.value !== "addNew" && (
            <div className="col-span-3">
              <label className="text-xs font-medium">Subcategory</label>
              <Select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                options={[
                  ...(subCategoryData[selectedCategory.value] || []),
                  { value: "addNew", label: "Add new subcategory" },
                ]}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {selectedSubCategory?.value === "addNew" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter new subcategory"
                    value={newSubCategory}
                    onChange={handleNewSubCategoryChange}
                    className="w-full p-1 border"
                  />
                  <button
                    type="button"
                    onClick={handleNewSubCategorySubmit}
                    className="mt-1 p-1 bg-blue-500 text-white"
                  >
                    Add Subcategory
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="col-span-3">
            <label className="text-xs font-medium">
              Sizes<span className="text-red-600">*</span>
            </label>
            <Select
              value={selectedSizes}
              onChange={handleSizeChange}
              options={sizeData}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium">
              Product Image<span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-1"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-w-full h-40 object-contain"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm ps-2 pb-2 text-red-600">
            {!isError == "" ? isError : `All '*' fields are required.`}
          </p>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full text-center py-2 flex justify-center items-center gap-2 bg-green-500 text-white font-semibold hover:bg-green-700 rounded-md ${
              isLoading ? "bg-green-100 text-gray-400" : ""
            }`}
          >
            {isLoading && <LoadingSpin />}
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
