import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./CarForm.module.css";
import * as Yup from "yup";

const CarSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 chars")
    .max(10, "Maximum 10 chars")
    .required("This field is required"),
  email: Yup.string().email().required("This field is required"),
  date: Yup.string()
    .min(5, "Minimum 5 chars")
    .max(10, "Maximum 10 chars")
    .required("This field is required"),
  comment: Yup.string()
    .min(3, "Minimum 3 chars")
    .max(50, "Maximum 50 chars")
    .required("This field is required"),
});

export default function CarForm({ onSubmit }) {
  const fieldId = useId();

  const handleSubmit = (values, helpers) => {
    onSubmit(values);
    helpers.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        date: "",
        comment: "",
      }}
      validationSchema={CarSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.text}>
          <p className={css.title}>Book your car now</p>
          <p className={css.subtitle}>
            Stay connected! We are always ready to help you.
          </p>
        </div>
        <div className={css.wrapper}>
          <Field
            type="text"
            name="name"
            className={css.input}
            id={`${fieldId}-name`}
            placeholder="Name*"
          />
          <ErrorMessage name="name" component="p" className={css.error} />
        </div>
        <div className={css.wrapper}>
          <Field
            type="text"
            name="email"
            className={css.input}
            id={`${fieldId}-email`}
            placeholder="Email*"
          />
          <ErrorMessage name="email" component="p" className={css.error} />
        </div>
        <div className={css.wrapper}>
          <Field
            type="text"
            name="date"
            className={css.input}
            id={`${fieldId}-date`}
            placeholder="Booking date"
          />
          <ErrorMessage name="date" component="p" className={css.error} />
        </div>
        <div className={css.wrapper}>
          <Field
            as="textarea"
            name="comment"
            className={css.textarea}
            id={`${fieldId}-comment`}
            placeholder="Comment"
          />
          <ErrorMessage name="comment" component="p" className={css.error} />
        </div>
        <button type="submit" className={css.button}>
          Send
        </button>
      </Form>
    </Formik>
  );
}
