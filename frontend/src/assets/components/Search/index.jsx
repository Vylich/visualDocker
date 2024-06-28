import { memo, useCallback, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserInfo } from "@components";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSearch, delSearch } from "../../../redux/slices/search";
import axios from "../../../axios";
import { Columns } from "../../pages/Home";

const Search = memo(
  ({
    items,
    onDelete,
    onClickSearch,
    isNavVisible,
    foundItems,
    navigateToSearchedItems,
    setSearchedTextDesktop,
  }) => {
    const [foundItemsMobile, setFoundItemsMobile] = useState(null);
    const [searchedText, setSearchedText] = useState("");
    const [viewSearchedPosts, setViewSearchedPosts] = useState(false);
    const posts = useSelector((state) => state.search.searchedItems);
    const dispatch = useDispatch();

    const removeDuplicatesByName = useCallback((data) => {
      const uniqueNames = {};
      const filteredPostTag = data.post_tag.filter((obj) => {
        if (!uniqueNames[obj.name]) {
          uniqueNames[obj.name] = true;
          return true;
        }
        return false;
      });
      return { post_tag: filteredPostTag, user: data.user };
    }, []);

    const onSubmit = useCallback((e) => {
      e.preventDefault();

      setViewSearchedPosts(true);
      setFoundItemsMobile(null);
    }, []);

    const navigateToSearchedItemsMobile = useCallback(() => {
      setViewSearchedPosts(true);
      setFoundItemsMobile(null);
      foundItemsMobile(null);
    }, []);

    useEffect(() => {
      if (!searchedText) {
        dispatch(delSearch());
        setViewSearchedPosts(false);
        setFoundItemsMobile(null);
      } else {
        axios.get(`/search/?search=${searchedText}`).then((res) => {
          setFoundItemsMobile(removeDuplicatesByName(res.data));
          dispatch(addSearch(res.data.post_tag));
        });
      }
    }, [searchedText]);

    return (
      <div className={styles.root}>
        {!isNavVisible && (
          <div className={styles.input}>
            <FontAwesomeIcon
              className={styles.iconSearch}
              icon={faMagnifyingGlass}
            />
            <form onSubmit={useCallback((e) => onSubmit(e), [])}>
              <input
                type="text"
                name="search"
                autoComplete="off"
                placeholder="Найти"
                value={searchedText}
                onChange={useCallback(
                  (e) => setSearchedText(e.target.value),
                  [],
                )}
              />
            </form>
            {searchedText && (
              <button
                className={styles.clearBtn}
                onClick={useCallback(() => {
                  setSearchedText("");
                  dispatch(delSearch());
                  setViewSearchedPosts(false);
                  setFoundItemsMobile(null);
                }, [])}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        )}
        {foundItems || foundItemsMobile ? (
          <div className={styles.searchWrap}>
            {foundItems &&
              foundItems.post_tag &&
              foundItems.post_tag.map((item, i) => (
                <div
                  className={styles.searchedItem}
                  onClick={useCallback(() => {
                    setSearchedTextDesktop(item.name);
                    navigateToSearchedItems(item.name);
                  }, [])}
                  key={i}
                >
                  <FontAwesomeIcon
                    className={styles.iconSearched}
                    icon={faMagnifyingGlass}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            {foundItems &&
              foundItems.user &&
              foundItems.user.map((item, i) => (
                <Link
                  key={i}
                  className={styles.linkSearch}
                  to={`/profile/${item.id}`}
                >
                  <UserInfo
                    isSmall
                    username={item.username}
                    avatar={item.avatar}
                  />
                </Link>
              ))}
            {foundItemsMobile &&
              foundItemsMobile.post_tag &&
              foundItemsMobile.post_tag.map((item, i) => (
                <div
                  className={styles.searchedItem}
                  onClick={useCallback(
                    () => navigateToSearchedItemsMobile(),
                    [],
                  )}
                  key={i}
                >
                  <FontAwesomeIcon
                    className={styles.iconSearched}
                    icon={faMagnifyingGlass}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            {foundItemsMobile &&
              foundItemsMobile.user &&
              foundItemsMobile.user.map((item, i) => (
                <Link
                  key={i}
                  className={styles.linkSearch}
                  to={`/profile/${item.id}`}
                >
                  <UserInfo
                    isSmall
                    username={item.username}
                    avatar={item.avatar}
                  />
                </Link>
              ))}
          </div>
        ) : (
          <>
            <div className={styles.wrapper}>
              <div className={styles.recent}>
                <h3>Недавние поисковые запросы</h3>
                <div className={styles.searches}>
                  {items &&
                    items.map((obj, i) => (
                      <div key={i} className={styles.searchesItem}>
                        <span
                          onClick={useCallback(() => {
                            setSearchedTextDesktop(obj);
                            onClickSearch(obj);
                          }, [])}
                        >
                          {obj}
                        </span>
                        <button
                          onClick={useCallback(() => onDelete({ obj }), [])}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* <div className={styles.wrapper}>
						<h3>Идеи для вас</h3>
						<div className={styles.cards}>
							{searchedItems && searchedItems()}
						</div>
					</div>
					<div className={styles.wrapper}>
						<h3>Популярное</h3>
						<div className={styles.cards}>
							{searchedItems && searchedItems()}
						</div>
					</div> */}
          </>
        )}
        <div className={styles.wrapSearchedCard}>
          {viewSearchedPosts && posts && (
            <Columns posts={posts} loading={false} />
          )}
        </div>
      </div>
    );
  },
);

export { Search };
