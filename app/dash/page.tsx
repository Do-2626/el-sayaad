"use client";
import React, { useState, useEffect, useMemo } from "react";
import InputField from "@/components/ui/input-field";
import SelectField from "@/components/ui/select-field";
import Link from "next/link";

// واجهات البيانات
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

interface CheckoutFormData {
  productId: string;
  quantity: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  _id: string; // معرف الطلب (يُنشَأ تلقائيًا من قاعدة البيانات)
  productId: string; // معرف المنتج المرتبط بالطلب
  productName: string; // اسم المنتج (لتسهيل العرض دون الحاجة للربط مع بيانات المنتج)
  quantity: number; // كمية المنتج المطلوبة
  status: string; // حالة الطلب (مثل: "مكتمل"، "قيد التجهيز")
  createdAt: string; // تاريخ الإنشاء بتنسيق ISO (مثال: "2025-03-21T07:46:57.423Z")
  customerName: string; // اسم العميل
  customerEmail: string; // بريد العميل الإلكتروني
  customerPhone: string; // رقم هاتف العميل
  customerAddress: string; // عنوان العميل (إذا كان متوفرًا في بيانات الطلب)
}



function Dash() {
  const [products, setProducts] = useState<Product[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<Order[]>([]);
  // const [formData, setFormData] = useState<Omit<Product, "id" | "lastUpdate">>({
  const [formData, setFormData] = useState<Omit<Product, "_id" | "lastUpdate">>({

    name: "",
    price: 0,
    rating: 0,
    description: "",
    features: [],
    image: "",
    fileSize: "",
    requirements: "",
    license: "",
    purchases: 0,
    guarantee: "",
  });
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>({
    productId: "",
    quantity: 1,
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchConfirmedOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout");
      if (!response.ok) throw new Error("فشل في جلب الطلبات المؤكدة");
      const data = await response.json(); 
      setConfirmedOrders(data); 
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      if (!formData.name || formData.price <= 0) {
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

      setSuccessMessage("تمت إضافة المنتج بنجاح!");
      resetForm();
      await fetchProducts();
      setShowForm(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      if (!checkoutFormData.productId || checkoutFormData.quantity <= 0) {
        throw new Error("يجب تحديد المنتج والكمية");
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل في إتمام الشراء");
      }

      setSuccessMessage("تمت عملية الشراء بنجاح!");
      resetCheckoutForm();
      await fetchConfirmedOrders();
      setShowCheckoutForm(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      rating: 0,
      description: "",
      features: [],
      image: "",
      fileSize: "",
      requirements: "",
      license: "",
      purchases: 0,
      guarantee: "",
    });
  };

  const resetCheckoutForm = () => {
    setCheckoutFormData({
      productId: "",
      quantity: 1,
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("فشل في حذف المنتج");

      setProducts(products.filter((p) => p._id !== id));
      setSuccessMessage("تم الحذف بنجاح");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* عرض الرسائل */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* أزرار التحكم */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {showForm ? "إخفاء النموذج" : "إضافة منتج جديد"}
        </button>
        <button
          onClick={fetchConfirmedOrders}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          تحديث الطلبات
        </button>
        <button
          onClick={() => setShowCheckoutForm(!showCheckoutForm)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {showCheckoutForm ? "إلغاء الشراء" : "شراء منتج"}
        </button>
      </div>

      {/* نموذج إضافة المنتج */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-lg font-bold mb-4">إضافة منتج جديد</h3>
          <div className="md:grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="الاسم"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <InputField
              label="السعر"
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: +e.target.value })
              }
              required
              min={1}
            />
            <InputField
              label="التقييم"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: +e.target.value })
              }
              min={0}
              max={5}
              step={0.5}
            />
            <InputField
              label="رابط الصورة"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
            <InputField
              label="حجم الملف"
              name="fileSize"
              value={formData.fileSize}
              onChange={(e) =>
                setFormData({ ...formData, fileSize: e.target.value })
              }
            />
            <InputField
              label="متطلبات النظام"
              name="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
            />
            <InputField
              label="نوع الرخصة"
              name="license"
              value={formData.license}
              onChange={(e) =>
                setFormData({ ...formData, license: e.target.value })
              }
            />
            <InputField
              label="فترة الضمان"
              name="guarantee"
              value={formData.guarantee}
              onChange={(e) =>
                setFormData({ ...formData, guarantee: e.target.value })
              }
            />
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                المميزات (مفصولة بفواصل):
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.features.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      features: e.target.value
                        .split(",")
                        .map((f) => f.trim())
                        .filter((f) => f.length > 0),
                    })
                  }
                />
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                الوصف:
                <textarea
                  name="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "إضافة المنتج"}
          </button>
        </form>
      )}

      {/* نموذج الشراء */}
      {showCheckoutForm && (
        <form
          onSubmit={handleCheckoutSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-lg font-bold mb-4">شراء منتج</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="اختر المنتج"
              name="productId"
              value={checkoutFormData.productId}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  productId: e.target.value,
                })
              }
              options={products.map((p) => (
                {
                  value: p._id,
                  label: p.name,
                }
              ))}
              required
            />
            <InputField
              label="الكمية"
              type="number"
              name="quantity"
              value={checkoutFormData.quantity}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  quantity: +e.target.value,
                })
              }
              required
              min={1}
            />
            <InputField
              label="الاسم"
              name="name"
              value={checkoutFormData.name}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  name: e.target.value,
                })
              }
              required
            />
            <InputField
              label="البريد الإلكتروني"
              type="email"
              name="email"
              value={checkoutFormData.email}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  email: e.target.value,
                })
              }
              required
            />
            <InputField
              label="رقم الهاتف"
              type="tel"
              name="phone"
              value={checkoutFormData.phone}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  phone: e.target.value,
                })
              }
              required
            />
            <InputField
              label="العنوان"
              name="address"
              value={checkoutFormData.address}
              onChange={(e) =>
                setCheckoutFormData({
                  ...checkoutFormData,
                  address: e.target.value,
                })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري التأكيد..." : "تأكيد الشراء"}
          </button>
        </form>
      )}

      {/* جدول المنتجات */}
      <div className="bg-white rounded-lg shadow overflow-x-auto mb-8">
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
                  {product.price} ج.م
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex justify-end">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < product.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.purchases}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(product.lastUpdate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex justify-end gap-4">
                    {/* <a
                      href={`/products/${product.id}/edit`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      تعديل
                    </a> */}
                    <Link
                      href={`/products/${product._id}/edit`}
                      className="text-green-500 hover:text-green-700"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={loading}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* جدول الطلبات */}
      <h2 className="text-xl font-bold mb-4">الطلبات المؤكدة</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                المنتج
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الكمية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تاريخ الشراء
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {confirmedOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.productName || "منتج غير معروف"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 rounded-full ${order.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                      }`}
                  >
                    {order.status === "completed" ? "مكتمل" : "قيد التجهيز"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dash;
