import * as React from "react";
import * as Yup from "yup";

import { useForm } from "react-yup";

import { searchDb } from "~/nexus";
import { useRouter } from "next/router";

const schema = Yup.object({
  query: Yup.string(),
}).defined();

export const SearchForm = (props) => {
  const { push } = useRouter();

  const { field, createSubmitHandler, values } = useForm({
    validationSchema: schema,
  });

  const [items, setItems] = React.useState([]);

  const handleSubmit = React.useMemo(() => {
    return createSubmitHandler((values) => {
      //   console.log(values);

      push(`/search?q=${values.query}`);
    });
  }, []);

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="form-group mr-2">
        <label className="sr-only" htmlFor="query">Search</label>
        <input
          id="query"
          name="query"
          className="form-control"
          type="text"
          value={values.query || ""}
          {...field}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
