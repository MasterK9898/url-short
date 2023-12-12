import classNames from "classnames";
import * as React from "react";
import Header from "../../components/Header";
import Create from "../../components/Create";
import "./index.scss";
import { Filter, URLUnit } from "../../interface";
import { bulkDeleteShortURL, getShortURLs } from "../../utils/api";
import { debounce } from "lodash";
import { format, set } from "date-fns";
import {
  OverlayTrigger,
  Popover,
  Table,
  Pagination,
  InputGroup,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import copy from "../../media/copy.svg";
import tick from "../../media/tick.svg";
import qrcode from "../../media/qrcode.svg";
import stat from "../../media/stat.svg";
import { QRCodeSVG } from "qrcode.react";
import { handleError } from "../../utils/error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Mine: React.FunctionComponent = () => {
  const [urls, setUrls] = React.useState<Array<URLUnit>>([]);

  const [total, setTotal] = React.useState(0);

  const [loading, setLoading] = React.useState(true);

  const { value } = useSelector((state: RootState) => state.user);

  const [filter, setFilter] = React.useState<Filter>({
    keyword: "",
    sort: 1,
    pageSize: 10,
    pageNum: 1,
  });

  // React.useLayoutEffect(() => {
  //   setLoading(true);
  // }, []);

  const abortController = React.useRef(new AbortController());

  const [selected, setSelected] = React.useState<Array<string>>([]);

  const getURLs = React.useCallback((filter: Filter) => {
    // cancel the previous one
    abortController.current.abort();
    // create a new one
    abortController.current = new AbortController();
    setSelected([]);
    setLoading(true);
    getShortURLs(filter, abortController.current.signal)
      .then(({ data, total }) => {
        setUrls(data);
        setTotal(total);
        // if failed, it will oad forever
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  const debounceGetURLs = React.useMemo(() => debounce(getURLs, 300), []);

  React.useEffect(() => {
    debounceGetURLs(filter);
  }, [filter]);

  // const debounceSetFilter = React.useMemo(() => debounce(setFilter, 300), []);

  // if someone enter this page with out logging in then it's their own prblem
  React.useEffect(() => {
    getURLs(filter);
  }, []);

  const paginations = React.useMemo(() => {
    const res = [];

    /**
     * <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
     */
    const createPagination = (num: number) => (
      <Pagination.Item
        onClick={() => {
          setFilter((filter) => ({ ...filter, pageNum: num }));
        }}
        active={num === filter.pageNum}
        key={num}
      >
        {num}
      </Pagination.Item>
    );

    res.push(createPagination(1));

    const max = Math.ceil(total / filter.pageSize);

    if (filter.pageNum > 3) {
      res.push(<Pagination.Ellipsis />);
    }

    if (filter.pageNum > 2) {
      res.push(createPagination(filter.pageNum - 1));
    }

    if (filter.pageNum > 1 && filter.pageNum < max) {
      res.push(createPagination(filter.pageNum));
    }

    if (filter.pageNum < max - 1) {
      res.push(createPagination(filter.pageNum + 1));
    }

    if (filter.pageNum < max - 2) {
      res.push(<Pagination.Ellipsis />);
    }

    if (max > 1) {
      res.push(createPagination(max));
    }

    return res;
  }, [total, filter]);

  return (
    <div className={classNames("mine")}>
      <Header />

      <Create
        onCreated={() => getURLs(filter)}
        className={classNames("create-horizontal")}
      />
      <InputGroup
        className={classNames("mb-3", "filter-bar")}
        style={{ marginLeft: 24, marginRight: 24, width: "calc(100% - 48px)" }}
      >
        <Form.Control
          placeholder="Search by name"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={filter.keyword}
          onChange={(e) =>
            setFilter((filter) => ({
              ...filter,
              pageNum: 1,
              keyword: e.target.value,
            }))
          }
        />
        <Form.Select
          aria-label="Sorted by"
          value={filter.sort}
          onChange={(e) =>
            setFilter((filter) => ({
              ...filter,
              pageNum: 1,
              sort: parseInt(e.target.value),
            }))
          }
        >
          <option value="1">Sorted by: Time Created</option>
          <option value="2">Sorted by: Time Created {"(reversed)"}</option>
          <option value="3">Sorted by: Expiration Date</option>
          <option value="4">Sorted by: Expiration Date {"(reversed)"}</option>
          {/* <option value="3">Three</option> */}
        </Form.Select>
        <Form.Select
          aria-label="Page size"
          value={filter.pageSize}
          onChange={(e) =>
            setFilter((filter) => ({
              ...filter,
              pageNum: 1,
              pageSize: parseInt(e.target.value),
            }))
          }
        >
          <option value="10">Page size: 10</option>
          <option value="20">Page size: 20</option>
          <option value="40">Page size: 40</option>
        </Form.Select>
        <Button
          className={classNames("filter-button")}
          onClick={() => setSelected(urls.map((item) => item.id))}
        >
          Select All
        </Button>
        <InputGroup.Text style={{ width: 110 }}>
          {selected.length} Selected
        </InputGroup.Text>
        <Button
          onClick={() => {
            bulkDeleteShortURL(selected)
              .then(() =>
                // back to page 1
                setFilter((filter) => ({ ...filter, pageNum: 1 }))
              )
              .catch((err) => {
                handleError(err);
              });
          }}
          className={classNames("filter-button")}
        >
          Delete
        </Button>
      </InputGroup>

      {loading ? (
        <Spinner animation="grow" className={classNames("loading-table")} />
      ) : (
        <>
          <Table striped bordered hover className={classNames("table-display")}>
            <thead>
              <tr>
                <th>#</th>
                <th>Origin URL</th>
                <th>Short URL</th>
                <th>Expiration Time</th>
                <th>Create Time</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(url.id)}
                        onClick={() => {
                          if (selected.includes(url.id)) {
                            setSelected((selected) =>
                              selected.filter((item) => item !== url.id)
                            );
                          } else {
                            setSelected((selected) => [...selected, url.id]);
                          }
                        }}
                        className="checkbox"
                      />
                    </td>
                    <td className={classNames("url")}>{url.longURL}</td>
                    <td className={classNames("url")}>{url.shortURL}</td>
                    <td>{format(url.expire, "MM-dd-yyyy")}</td>
                    <td>{format(url.create, "MM-dd-yyyy")}</td>
                    <td>
                      {/* <img className={classNames("operation")} src={bin} /> */}
                      <OverlayTrigger
                        trigger="hover"
                        placement="top"
                        overlay={
                          <Popover>
                            <div className={classNames("qrcode-holder")}>
                              <QRCodeSVG
                                className={classNames("qrcode")}
                                value={url.shortURL}
                              />
                            </div>
                          </Popover>
                        }
                      >
                        <img src={qrcode} className={classNames("operation")} />
                      </OverlayTrigger>
                      {/* <img className={classNames("operation")} src={stat} /> */}
                      <img
                        className={classNames("operation")}
                        src={copy}
                        onClick={(event) =>
                          navigator.clipboard
                            .writeText(url.shortURL)
                            .then(() => {
                              alert("URL copied to clipboard!");
                            })
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className={classNames("pagination")} style={{ display: "flex" }}>
            {/* <Pagination>
            <Pagination.Item active>{10}</Pagination.Item>
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Item>{40}</Pagination.Item>
            <Pagination.Item>{100}</Pagination.Item>
          </Pagination> */}
            <Pagination>{paginations.map((page) => page)}</Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default Mine;
