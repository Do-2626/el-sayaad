"use client";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  features: string[];
  image: string;
  lastUpdate: string;
  fileSize: string;
  requirements: string;
  license: string;
  purchases: number;
  guarantee: string;
}

function Dash() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    rating: 0,
    description: "",
    features: [],
    image: "",
    lastUpdate: new Date().toISOString(),
    fileSize: "",
    requirements: "",
    license: "",
    purchases: 0,
    guarantee: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("فشل في جلب البيانات");
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.name || !formData.price) {
        throw new Error("الاسم والسعر حقول مطلوبة");
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل في إضافة المنتج");
      }

      // إعادة تعيين النموذج وجلب البيانات المحدثة
      setFormData({
        name: "",
        price: 0,
        rating: 0,
        description: "",
        features: [],
        image: "",
        lastUpdate: new Date().toISOString(),
        fileSize: "",
        requirements: "",
        license: "",
        purchases: 0,
        guarantee: "",
      });
      await fetchProducts();
      setShowForm(false); // إخفاء النموذج بعد الإضافة
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(",").map((f) => f.trim());
    setFormData((prev) => ({ ...prev, features }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم بالمنتجات</h1>

      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">{error}</div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-4 transition-colors"
      >
        {showForm ? "إخفاء إضافة منتج" : "إظهار إضافة منتج"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الحقول الأساسية */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                الاسم *:
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                السعر *:
                <input
                  type="number"
                  name="price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            {/* الحقول الإضافية */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                التقييم:
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                المميزات (مفصولة بفواصل):
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.features?.join(", ")}
                  onChange={handleFeaturesChange}
                />
              </label>
            </div>
            {/* المزيد من الحقول */}
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                الوصف:
                <textarea
                  name="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-24"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* أضف باقي الحقول بنفس النمط */}
            {/* حقل الصورة */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                رابط الصورة:
                <input
                  type="text"
                  name="image"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* حجم الملف */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                حجم الملف:
                <input
                  type="text"
                  name="fileSize"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.fileSize}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* المتطلبات */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                متطلبات النظام:
                <input
                  type="text"
                  name="requirements"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.requirements}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* الرخصة */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                نوع الرخصة:
                <input
                  type="text"
                  name="license"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.license}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* عدد المشتريات */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                عدد المشتريات:
                <input
                  type="number"
                  name="purchases"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.purchases}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            {/* // فترة الضمان */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                فترة الضمان:
                <input
                  type="text"
                  name="guarantee"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.guarantee}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري الإضافة..." : "إضافة منتج"}
          </button>
        </form>
      )}

      {loading && (
        <div className="text-gray-500 text-center py-4">جاري التحميل...</div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الاسم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                السعر
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                التقييم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                المبيعات
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                آخر تحديث
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price} ر.س
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {"★".repeat(product.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.purchases}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(product.lastUpdate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <a
                    href={`/products/${product._id}/edit`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    تعديل
                  </a>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const handleDelete = async (id: string) => {
  if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("فشل في حذف المنتج");
      window.location.reload(); // تحديث الصفحة
    } catch (error: any) {
      alert(error.message);
    }
  }
};

export default Dash;