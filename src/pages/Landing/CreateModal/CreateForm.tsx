import React from "react";

import { Formik } from "formik";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";

import * as yup from "yup";

import type { URLPayload, URLUnit } from "../interface";
import { createShortURL } from "../utils/api";

import "./index.scss";
import copy from "../../../media/copy.svg";
import qrcode from "../../../media/qrcode.svg";
import classNames from "classnames";
import CreateResult from "./CreateResult";

const schema = yup.object().shape({
  url: yup.string().required(),
  id: yup.string().max(8).min(6),
});

const initForm: URLPayload = { url: "", id: "" };

const domain = "http://short.ly";

const CreateForm: React.FunctionComponent = () => {
  const [validated, setValidated] = React.useState(false);

  const [form, setForm] = React.useState<URLPayload>(initForm);

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
      initialValues={initForm}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="URL"
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
            placeholder="Name (Optional, 6-8 characters)"
            aria-label="Id"
            aria-describedby="basic-addon1"
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </InputGroup>
        {data ? (
          <CreateResult data={data} />
        ) : loading ? (
          <Spinner animation="grow" className={classNames("loading")} />
        ) : (
          <Button className="submit" type="submit">
            Let's do it!!
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default CreateForm;
