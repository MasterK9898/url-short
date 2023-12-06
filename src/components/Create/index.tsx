import React from "react";

import { Formik } from "formik";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

import * as yup from "yup";

import type { URLPayload, URLUnit } from "../../interface";
import { bulkCreateShortURL, createShortURL } from "../../utils/api";

import "./index.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Tier } from "../../interface/user";
import { readFile, uploadFile } from "../../utils";
import { handleError } from "../../utils/error";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  url: yup.string().required(),
  id: yup.string().max(8).min(6),
});

const initForm: URLPayload = { url: "", id: "" };

interface CreateProps {
  onCreated: (url: Array<URLUnit>) => void;
  className?: string;
}

const tempStoreKey = "tempURL";

const Create: React.FunctionComponent<CreateProps> = ({
  onCreated,
  className,
}) => {
  const [input, setInput] = React.useState<string>("");

  const [loading, setLoading] = React.useState(false);

  const { value } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const isGold = value?.tier == Tier.Gold;

  React.useEffect(() => {
    const temp = sessionStorage.getItem(tempStoreKey);
    if (temp) {
      setInput(temp);
      sessionStorage.removeItem(tempStoreKey);
    }
  }, []);

  const placeholder = isGold
    ? "Enter multiple URLs here (separated by comma)"
    : "Enter your URL here";

  const createURL = React.useCallback((payload: Array<string>) => {
    setLoading(true);

    bulkCreateShortURL(payload)
      .then((res) => {
        onCreated(res);
      })
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      // setValidated(true);

      e.preventDefault();
      e.stopPropagation();

      // const target = e.currentTarget;

      if (!input) {
        alert("Please enter a URL");
        return;
      }
      // if (target.checkValidity() === false) {
      //   return;
      // }

      const payload = isGold
        ? input.split(",").map((url) => url.trim())
        : [input];

      createURL(payload);
      setInput("");
    },
    [input, isGold, createURL]
  );

  const handleCSV = React.useCallback(
    () =>
      uploadFile(".csv").then((file) =>
        readFile(file).then((res) => {
          const urls = res
            .split("\n")
            .map((url) => url.trim())
            .filter((url) => url);
          if (urls.length == 0) {
            alert("No URLs found in the CSV file");
            return;
          }
          createURL(urls);
        })
      ),
    []
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={initForm}
    >
      <Form
        noValidate
        className={classNames("create-form", className)}
        // validated={validated}
        onSubmit={handleSubmit}
      >
        <InputGroup
          className={classNames("mb-3", isGold ? "textarea" : "input")}
        >
          <Form.Control
            // required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            aria-label="URL"
            aria-describedby="basic-addon2"
            as={isGold ? "textarea" : "input"}
          />
        </InputGroup>
        {/* <InputGroup className="mb-3">
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
        </InputGroup> */}
        {loading ? (
          <Spinner animation="grow" className={classNames("loading")} />
        ) : (
          <>
            {value ? (
              <Button className="create" type="submit">
                Create
              </Button>
            ) : (
              <Button
                className="create"
                onClick={() => {
                  if (input) {
                    sessionStorage.setItem(tempStoreKey, input);
                  }
                  navigate("/membership-login");
                }}
              >
                Login to Create
              </Button>
            )}
            {isGold && (
              <Button onClick={handleCSV} className="create">
                Create by CSV
              </Button>
            )}
          </>
        )}
      </Form>
    </Formik>
  );
};

// use a modal to display the result, because we may need multiple results

export default Create;
