import { Check, X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UserModal = ({
  isOpen,
  onClose,
  formData,
  onSubmit,
  loading,
  status,
}) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?\d{7,15}$/, "Invalid phone number")
      .required("Phone is required"),
    status: Yup.string()
      .oneOf(status, "Invalid status")
      .required("Status is required"),
  });
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center 
    p-4 z-50"
    >
      <div
        className="bg-gray-900 rouded-lg shadow-2xl max-w-2xl w-full max-h-screen
      overflow-y-auto border border-gray-800 rounded-lg"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {formData._id ? "Edit user" : "Add new user"}
          </h2>
          <button
            className="text-gray-400 hover:text-white transition-all cursor-pointer"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Name *
                    </label>
                    <Field
                      name="name"
                      placeholder="John Smith"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Email *
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Phone *
                    </label>
                    <Field name="phone">
                      {({ field, form }) => (
                        <PhoneInput
                          country={"us"}
                          value={field.value}
                          onChange={(val) => form.setFieldValue("phone", val)}
                          inputClass="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white 
                          placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          inputStyle={{
                            width: "100%",
                            height: "2.5rem",
                            fontSize: "1rem",
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Status *
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full px-4 py-2.5 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      {status.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-700 bg-blue-500 text-gray-900 rounded-lg hover:bg-blue-400 transition-all cursor-pointer"
                    disabled={loading || isSubmitting}
                  >
                    <Check size={20} />
                    {loading
                      ? "Saving..."
                      : formData._id
                        ? "Update user"
                        : "Add user"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex gap-3 mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
