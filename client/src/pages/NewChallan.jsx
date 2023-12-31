import { saveAs } from "file-saver";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  InputRow,
  InputSelect,
  Loading,
  SearchClient,
} from "../components";
import { useGetAdminValuesQuery } from "../redux/adminSlice";
import { useCreateChallanMutation } from "../redux/challanSlice";
import { paymentType, prefix, timeFrame } from "../utils/constData";

const NewChallan = () => {
  const [create, { isLoading }] = useCreateChallanMutation();
  const navigate = useNavigate();

  const { data, isLoading: valuesLoading } = useGetAdminValuesQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      shipToDetails: {
        prefix: "",
        name: "",
        address: "",
        road: "",
        location: "",
        landmark: "",
        city: "",
        pincode: "",
        contactName: "",
        contactNo: "",
        contactEmail: "",
      },
      serviceDate: "",
      serviceTime: "",
      otherTime: "",
      area: "",
      workLocation: "",
      business: "",
      sales: "",
      paymentType: "",
      amount: { total: "" },
      gst: "",
      serviceDetails: [
        {
          serviceName: "",
          notes: "",
        },
      ],
    },
  });

  const watchPayment = watch("paymentType");
  const time = watch("serviceTime");

  const { fields, append, remove } = useFieldArray({
    name: "serviceDetails",
    control,
  });

  const cancel = () => {
    reset();
    navigate("/home");
  };

  const submit = async (data) => {
    if (
      data.paymentType.label === "Bill After Job" &&
      data.gst.toLowerCase() !== "na" &&
      data.gst.length < 15
    ) {
      return toast.error("Please provide valid GST");
    }

    if (time.label === "Other")
      data.serviceTime = { label: data.otherTime, value: data.otherTime };
    try {
      const res = await create(data).unwrap();
      toast.success(res.msg);
      saveAs(res.link, res.name);
      reset();
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const setShipToDetails = (data) => {
    setValue("shipToDetails", data.shipToDetails);
    setValue("shipToDetails.prefix", data.shipToDetails.prefix);
    setValue("gst", data.gst);
  };

  return (
    <>
      {(isLoading || valuesLoading) && <Loading />}
      <div className="mx-10 my-20 lg:my-3">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium">New Single Service Slip</h1>
        </div>

        <SearchClient setShipToDetails={setShipToDetails} />

        <form onSubmit={handleSubmit(submit)} className="mt-5">
          <h2 className="text-center my-2 text-xl text-blue-500 font-medium">
            Ship To Details
          </h2>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-4">
            <div className="col-span-2">
              <div className="flex">
                <div className="w-56">
                  <Controller
                    name="shipToDetails.prefix"
                    control={control}
                    rules={{ required: "Select prefix" }}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputSelect
                        options={prefix}
                        onChange={onChange}
                        value={value}
                        label="Prefix"
                      />
                    )}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.shipToDetails?.prefix?.message}
                  </p>
                </div>
                <div className="w-full ml-2">
                  <InputRow
                    label="Client Name"
                    id="shipToDetails.name"
                    errors={errors}
                    register={register}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.shipToDetails?.name && "Client name is required"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <InputRow
                label="Premise Name & Flat/Office no"
                id="shipToDetails.address"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.address &&
                  "Flat/office no & premise name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Road/Lane Name"
                id="shipToDetails.road"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.road && "Road/Lane name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Location"
                id="shipToDetails.location"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.location && "location name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Landmark/Near By Place"
                id="shipToDetails.landmark"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.landmark && "Landmark name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="City"
                id="shipToDetails.city"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.city && "City name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Pincode"
                id="shipToDetails.pincode"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.pincode && "Pincode is required"}
              </p>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 gap-x-4">
            <div>
              <InputRow
                label="Contact Person Name"
                id="shipToDetails.contactName"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.contactName &&
                  "Contact person name is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Contact Person Number"
                id="shipToDetails.contactNo"
                errors={errors}
                register={register}
              />
              <p className="text-xs text-red-500 -bottom-4 pl-1">
                {errors.shipToDetails?.contactNo &&
                  "Contact person number is required"}
              </p>
            </div>
            <div>
              <InputRow
                label="Contact Person Email"
                id="shipToDetails.contactEmail"
                errors={errors}
                register={register}
                type="email"
                required={false}
              />
            </div>
          </div>
          <hr className="h-px mt-4 mb-2 border-0 bg-gray-700" />
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-4">
            <div className="md:col-span-3">
              <h2 className="text-center text-xl text-blue-500 font-medium">
                Service Details
              </h2>
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                <div>
                  <InputRow
                    label="Date Of Service"
                    id="serviceDate"
                    errors={errors}
                    register={register}
                    type="date"
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.serviceDate && "Service date is required"}
                  </p>
                </div>
                <div>
                  {time.label === "Other" ? (
                    <InputRow
                      label="Job Time"
                      id="otherTime"
                      errors={errors}
                      register={register}
                    />
                  ) : (
                    <Controller
                      name="serviceTime"
                      control={control}
                      rules={{ required: "Select job timing" }}
                      render={({ field: { onChange, value, ref } }) => (
                        <InputSelect
                          options={timeFrame}
                          onChange={onChange}
                          value={value}
                          label="Job Time Frame"
                        />
                      )}
                    />
                  )}
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.serviceTime?.message}
                  </p>
                </div>
                <div>
                  <Controller
                    name="sales"
                    control={control}
                    rules={{ required: "Select sales person" }}
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        options={data?.sales}
                        onChange={onChange}
                        value={value}
                        label="Job Finalized By"
                      />
                    )}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.sales?.message}
                  </p>
                </div>
                <div>
                  <InputRow
                    label="Work Location"
                    id="workLocation"
                    errors={errors}
                    register={register}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.workLocation && "Work location is required"}
                  </p>
                </div>
                <div>
                  <InputRow
                    label="Approx Sqft"
                    id="area"
                    errors={errors}
                    register={register}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.area && "Square feet area is required"}
                  </p>
                </div>
                <div>
                  <Controller
                    name="business"
                    control={control}
                    rules={{ required: "Select type of business" }}
                    render={({ field: { onChange, value } }) => (
                      <InputSelect
                        options={data?.business}
                        onChange={onChange}
                        value={value}
                        label="Type Of Business"
                      />
                    )}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.business?.message}
                  </p>
                </div>
              </div>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="md:grid md:grid-cols-3 gap-x-4"
                  >
                    <div>
                      <Controller
                        name={`serviceDetails.${index}.serviceName`}
                        control={control}
                        rules={{ required: "Select type of service" }}
                        render={({ field: { onChange, value, ref } }) => (
                          <InputSelect
                            options={data?.services}
                            onChange={onChange}
                            value={value}
                            label="Type Of Service"
                          />
                        )}
                      />
                      <p className="text-xs text-red-500 -bottom-4 pl-1">
                        {errors.service?.message}
                      </p>
                    </div>
                    <div>
                      <InputRow
                        label="Notes/Job Instructions"
                        id={`serviceDetails.${index}.notes`}
                        errors={errors}
                        register={register}
                        required={false}
                      />
                    </div>
                    <div className="flex items-end justify-center gap-x-2 mt-1">
                      <Button
                        label={
                          <div className="flex items-center">
                            <AiOutlinePlus className="w-5 h-5 mr-0.5" />
                            Service
                          </div>
                        }
                        small
                        height="h-8"
                        onClick={() => append({ serviceName: "", notes: "" })}
                      />
                      {index > 0 && (
                        <Button
                          color="bg-red-600"
                          label="Remove"
                          onClick={() => remove(index)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="h-px mt-2 mb-2 border-0 dark:bg-gray-700 lg:hidden" />
            <div className="col-span-4 mt-2 lg:col-span-1 lg:border-l-2 border-black">
              <h2 className="text-center text-xl text-blue-500 font-medium">
                Payment Details
              </h2>
              <div className="flex justify-center">
                <div className="w-52">
                  <Controller
                    name="paymentType"
                    control={control}
                    rules={{ required: "Select payment instruction" }}
                    render={({ field: { onChange, value, ref } }) => (
                      <InputSelect
                        options={paymentType}
                        onChange={onChange}
                        value={value}
                        label="Payment Mode"
                      />
                    )}
                  />
                  <p className="text-xs text-red-500 -bottom-4 pl-1">
                    {errors.paymentType?.message}
                  </p>
                </div>
              </div>
              {(watchPayment.label === "Cash To Collect" ||
                watchPayment.label === "UPI Payment" ||
                watchPayment.label === "Bill After Job") && (
                <>
                  <div className="flex justify-center">
                    <InputRow
                      label="Total Amount"
                      id="amount.total"
                      errors={errors}
                      register={register}
                      type="number"
                    />
                  </div>
                  <p className="text-xs text-center text-red-500 -bottom-4 pl-1">
                    {errors.amount && "Amount is required"}
                  </p>
                </>
              )}
              {watchPayment.label === "Bill After Job" && (
                <>
                  <div className="flex justify-center">
                    <InputRow
                      label="GST"
                      id="gst"
                      errors={errors}
                      register={register}
                    />
                  </div>
                  <p className="text-xs text-red-500 -bottom-4 pl-1 text-center">
                    {errors.gst && "GST is required"}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center items-end gap-x-2 mt-6">
            <Button
              type="submit"
              label={isLoading ? "Creating..." : "Create Slip"}
              height="h-10"
              color="bg-green-600"
              disabled={isLoading}
            />
            <Button
              label="Cancel"
              height="h-10"
              color="bg-gray-500"
              onClick={cancel}
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default NewChallan;
