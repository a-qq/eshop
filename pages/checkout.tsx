import { useForm } from "react-hook-form";
import { useCart } from "../components/cart/CartContext";
import CartProduct from "../components/cart/CartProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/ui/form/input";
import { Select } from "../components/ui/form/select";
import { Checkbox } from "../components/ui/form/checkbox";
import valid from "card-validator";

const countries = ["United States", "Canada", "Mexico", "Poland"];
yup.setLocale({
  string: {
    email: "Niepoprawny adres e-mail!",
    min: "Minimalna ilość znaków: ${min}",
    max: "Maksymalna ilość znaków: ${max}",
  },
  mixed: {
    required: "To pole jest wymagane!",
  },
});

const checkoutFormSchema = yup
  .object({
    emailAddress: yup.string().email().required(),
    nameOnCard: yup.string().required(),
    cardNumber: yup
      .string()
      .test(
        "",
        "Number karty jest nieprawidłowy!",
        (value) => valid.number(value).isValid
      )
      .required(),
    expirationDate: yup
      .string()
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        "Data ważności jest nieprawidłowa. Przykład: MM/YY"
      )
      .test(
        "",
        "Data ważności jest nieprawidłowa. Przykład: MM/YY",
        (value) => valid.expirationDate(value).isValid
      )
      .required(),
    cvc: yup
      .string()
      .test(
        "",
        "Kod CVC jest nieprawidłowy!",
        (value) => valid.cvv(value).isValid
      )
      .required(),
    firstName: yup.string().required().min(2).max(50),
    lastName: yup.string().required().min(2).max(50),
    company: yup.string().max(80).optional(),
    address: yup.string().required().min(5).max(95),
    city: yup.string().required().min(2).max(35),
    country: yup.mixed().oneOf(countries).defined().required(),
    apartment: yup.string().optional(),
    region: yup.string().required().min(2).max(30),
    postalCode: yup.string().required().min(3).max(10),
    phone: yup
      .string()
      .required()
      .min(10)
      .max(13)
      .matches(/^\d+$/, "Nieprawidłowy numer telefonu!"),
    sameAsShipping: yup.boolean().required(),
  })
  .required();

type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const { items, total } = useCart();
  const tax = Math.round(((total / 100) * 0.2 + Number.EPSILON) * 100) / 100;
  const subTotal = Math.round((total / 100 - tax + Number.EPSILON) * 100) / 100;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({ resolver: yupResolver(checkoutFormSchema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:gap-6">
        <div className="mt-5 lg:col-span-3 lg:mt-0">
          <form onSubmit={onSubmit}>
            <div className="overflow-hidden shadow rounded-md ">
              <div className="bg-white px-4 py-5 sm:p-6">
                <section aria-labelledby="contactHeading">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="contactHeading"
                  >
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6">
                      <Input
                        name="emailAddress"
                        autoComplete="email"
                        label="Email address"
                        register={register}
                        errorMessage={errors.emailAddress?.message}
                      />
                    </div>
                  </div>
                </section>
                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <section
                  className="mt-8 sm:mt-0"
                  aria-labelledby="paymentHeading"
                >
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900 "
                    id="paymentHeading"
                  >
                    Payment details
                  </h3>
                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6">
                      <Input
                        name="nameOnCard"
                        autoComplete="cc-name"
                        label="Name on card"
                        register={register}
                        errorMessage={errors.nameOnCard?.message}
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        name="cardNumber"
                        autoComplete="cc-number"
                        label="Card number"
                        register={register}
                        errorMessage={errors.cardNumber?.message}
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        name="expirationDate"
                        autoComplete="cc-exp"
                        label="Expiration date (MM/YY)"
                        register={register}
                        errorMessage={errors.expirationDate?.message}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        name="cvc"
                        autoComplete="cc-csc"
                        label="CVC"
                        register={register}
                        errorMessage={errors.cvc?.message}
                      />
                    </div>
                  </div>
                </section>
                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <section
                  className="mt-8 sm:mt-0"
                  aria-labelledby="shippingHeading"
                >
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="shippingHeading"
                  >
                    Shipping information
                  </h3>
                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="firstName"
                        autoComplete="given-name"
                        label="First name"
                        register={register}
                        errorMessage={errors.firstName?.message}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="lastName"
                        autoComplete="family-name"
                        label="Last name"
                        register={register}
                        errorMessage={errors.lastName?.message}
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        name="company"
                        autoComplete="organization"
                        label="Company"
                        register={register}
                        errorMessage={errors.company?.message}
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        name="address"
                        autoComplete="address-line-1"
                        label="Address"
                        register={register}
                        errorMessage={errors.address?.message}
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        name="apartment"
                        autoComplete="address-line2"
                        label="Apartment, suite, etc."
                        register={register}
                        errorMessage={errors.apartment?.message}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="city"
                        autoComplete="address-level2"
                        label="City"
                        register={register}
                        errorMessage={errors.city?.message}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        name="country"
                        autoComplete="country-name"
                        label="Country"
                        options={countries}
                        register={register}
                        errorMessage={errors.country?.message}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="region"
                        autoComplete="address-level1"
                        label="State / Province"
                        register={register}
                        errorMessage={errors.region?.message}
                      />
                    </div>
                    <div className="col-span-6 lg:col-span-3">
                      <Input
                        name="postalCode"
                        autoComplete="postal-code"
                        label="ZIP / Postal code"
                        register={register}
                        errorMessage={errors.postalCode?.message}
                      />
                    </div>
                    <div className="col-span-6">
                      <Input
                        name="phone"
                        autoComplete="tel"
                        label="Phone"
                        register={register}
                        errorMessage={errors.phone?.message}
                      />
                    </div>
                  </div>
                </section>
                <div className="hidden sm:block" aria-hidden="true">
                  <div className="py-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <h3 className="mt-8 text-lg font-medium leading-6 text-gray-900 sm:mt-0">
                  Billing information
                </h3>
                <Checkbox
                  name="sameAsShipping"
                  label="Same as shipping information"
                  containerClassName="mt-3"
                  register={register}
                  errorMessage={errors.sameAsShipping?.message}
                />
              </div>
              <div className="bg-white px-4 pb-6 text-right sm:px-6">
                <div className="hidden sm:block" aria-hidden="true">
                  <div className="pb-5">
                    <div className="border-t border-gray-200" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    You won't be charged until the next step.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="px-4 py-5 sm:p-6 rounded-md shadow-md bg-white mt-5 lg:mt-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Order summary
            </h3>
            <ul className="divide-y divide-gray-400  last:border-0 ">
              {items.map((item) => (
                <CartProduct key={item.id} item={item} variant="display" />
              ))}
            </ul>

            <ul className="py-3 border-t border-gray-700">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal} $</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>{tax} $</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-gray-700 py-3 font-bold pb-10">
              <span>Total</span>
              <span>{total / 100} $</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
