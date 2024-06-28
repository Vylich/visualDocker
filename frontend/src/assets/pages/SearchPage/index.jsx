import React, { memo, useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Columns } from "../Home/index";
import { Loading } from "@components";
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { addSearch } from "../../../redux/slices/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchPage = memo(() => {
  const posts = useSelector((state) => state.search.searchedItems);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    if (!posts.length) {
      axios.get(`/search/?search=${id}`).then((res) => {
        dispatch(addSearch(res.data.post_tag));
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      {posts && <Columns posts={posts} loading={false} />}
    </div>
  );
});

export { SearchPage };
