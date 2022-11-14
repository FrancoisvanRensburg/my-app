import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

const Search = () => {
  const [term, setTerm] = useState<string>("");

  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  }
  return (
    <>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            value={term}
            onChange={(e: any) => setTerm(e.target.value)}
            placeholder={"Search"}
          />
        </form>
      </div>
    </>
  );
};

export default Search;
