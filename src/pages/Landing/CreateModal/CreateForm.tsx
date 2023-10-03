import React from "react";

import { Formik } from "formik";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

import * as yup from "yup";

import type { URLPayload, URLUnit } from "../interface";
import { createShortURL } from "../utils/api";

import "./index.scss";

const schema = yup.object().shape({
  url: yup.string().required(),
  id: yup.string().max(8).min(6),
});

const domain = "http://short.ly";

const CreateForm: React.FunctionComponent = () => {
  const [validated, setValidated] = React.useState(false);

  const [form, setForm] = React.useState<URLPayload>({ url: "", id: "" });

  const [data, setData] = React.useState<URLUnit | null>(null);

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setValidated(true);

      e.preventDefault();
      e.stopPropagation();

      const target = e.currentTarget;
      if (target.checkValidity() === false) {
        return;
      }

      setLoading(true);

      setData(await createShortURL(form));

      setLoading(false);
    },
    [form]
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        url: "",
        id: "",
      }}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="Target URL"
            aria-label="URL"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">{domain}</InputGroup.Text>
          <Form.Control
            minLength={6}
            maxLength={8}
            value={form.id}
            placeholder="Customized Name (Optional)"
            aria-label="Id"
            aria-describedby="basic-addon1"
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </InputGroup>
        {data ? (
          <>
            Your short URL is: {domain}
            {data.id}{" "}
            <Button
              variant="primary"
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy
            </Button>
          </>
        ) : loading ? (
          <Spinner animation="grow" />
        ) : (
          <Button type="submit">Submit form</Button>
        )}
      </Form>
    </Formik>
  );
};

export default CreateForm;
