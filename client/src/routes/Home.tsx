import { useLocation, useNavigate } from "react-router-dom";
import {
  SearchItem,
  searchValidationSchema,
  SearchValidationType,
} from "../validation/search";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchValidationType>({
    resolver: zodResolver(searchValidationSchema),
    defaultValues: { query: query },
  });
  // update url
  const onSubmit: SubmitHandler<SearchValidationType> = async (data) => {
    navigate(`?query=${data.query}`);
  };
  // get search result
  const [data, setData] = useState<SearchItem | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (query !== "") {
        const result: SearchItem = await fetch(
          `http://localhost:3000/api/?query=${query}`
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));
        setData(result);
      }
    };
    fetchData();
  }, [query]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="query">Search: </label>
        <input
          id="query"
          type="text"
          {...register("query")}
          placeholder="Search"
        />
        <br />
        <p>{errors.query && errors.query.message}</p>
        <ErrorMessage errors={errors} name="query" message={errors.query?.message} />
        <input type="submit" value="検索" />
      </form>
      <div>Result: {data?.query}</div>
    </div>
  );
};

export default Home;
