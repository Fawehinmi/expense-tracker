"use client";
import ApButton from "@/components/Button";
import { ApTextInput } from "@/components/TextInput";
import { useAppState } from "@/context/context";
import { Form, Formik, FormikProps } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  expense1: Yup.number().required("This is Required"),
  expense2: Yup.number().required("This is Required"),
  expense3: Yup.number().required("This is Required"),
  expense4: Yup.number().required("This is Required"),
  expense5: Yup.number().required("This is Required"),
  revenue1: Yup.number().required("This is Required"),
  revenue2: Yup.number().required("This is Required"),
  revenue3: Yup.number().required("This is Required"),
  revenue4: Yup.number().required("This is Required"),
  revenue5: Yup.number().required("This is Required"),
});

const fieldNames = [
  "revenue1",
  "revenue2",
  "revenue3",
  "revenue4",
  "revenue5",
  "expense1",
  "expense2",
  "expense3",
  "expense4",
  "expense5",
];
let fieldNamesObject: any = {};
fieldNames.forEach((fieldName: any) => {
  fieldNamesObject[fieldName] = "";
});

export default function Home() {
  const { formData, setFormData } = useAppState();
  const router = useRouter();

  return (
    <main className="bg-gray-50 flex items-center justify-center h-screen w-screen">
      <Formik
        initialValues={fieldNamesObject}
        validationSchema={FormSchema}
        onSubmit={(values: any) => {
          setFormData(values);
          router.push("calculation");
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="flex gap-24">
              {["Revenue", "Expense"].map((category, index) => (
                <div key={index} className="flex flex-col gap-6">
                  <p className="Text-center font-bold text-3xl pb-2">
                    {category}s
                  </p>
                  {fieldNames
                    .filter((name) =>
                      name.toLowerCase().includes(category.toLowerCase())
                    )
                    .map((fieldName) => (
                      <ApTextInput
                        key={fieldName}
                        name={fieldName}
                        placeHolder={`e.g $100`}
                        label={`${category.slice(0, -1)} ${fieldName.slice(
                          -1
                        )}`}
                        type="number"
                      />
                    ))}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <ApButton
                title={"Calculate"}
                type="submit"
                colorScheme="teal"
                // className="bg-rose-500 border rounded-md p-2 text-white text-sm                                                                                                                                                                                                                                                                                                                                                                                                                                                     "
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}