import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import css from "./CarForm.module.css";
import * as Yup from "yup";

const CarSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 chars")
    .max(50, "Maximum 50 chars")
    .required("This field is required"),
  email: Yup.string().email().required("This field is required"),
  date: Yup.date()
    .required("This field is required").min(new Date(), "Date must be in the future"),
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
  toast.success("Your car rental request was successful!");
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        date: null,
        comment: "",
      }}
      validationSchema={CarSchema}
      onSubmit={handleSubmit}
    >
      {({setFieldValue, values}) =>
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
        <div className={css.dateWrapper}>
          <DatePicker
            name="date"
            className={css.dateInput}
            id={`${fieldId}-date`}
            placeholderText="Booking date" 
            minDate={new Date()}
            selected={values.date} 
            onChange={(date) => setFieldValue("date", date)} />

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
}
    </Formik>
  );
}
