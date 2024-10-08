import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import PostDetails from "../../components/PostDetails";
import styles from "./FullPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const FullPost = () => {
  const [dataPost, setDataPost] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(null);
  const navigate = useNavigate()

	const isUserDataLoaded = state => state.auth.data !== null
	const userdata = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)
  const dispatch = useDispatch();
  const { id } = useParams();

  const getComments = (obj) => {
    const array = Array.isArray(obj) ? obj : [obj];
    return array.reduce(function(acc, value) {
      acc.push(value);
      if (value.children) {
        acc = acc.concat(getComments(value.children));
      }
      if (value.parent == null) {
        value.root = true;
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    setComments([]);
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setDataPost(res.data);
        setComments(getComments(res.data.comments));
        console.log();
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      });
  }, []);

  useEffect(() => {
    if (userdata) {
      axios
      .get(`/posts/${id}/likes/`)
      .then((res) => {
        setLikes(res.data.length);

        if (
          res.data.some((item) => Number(item.id) === Number(userdata.id))
        ) {
          return setIsLiked(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [userdata]);

  const onSubmit = async (text, setText) => {
    try {
      const fields = {
        text: text,
        post: id,
        parent: '',
      };
      await axios.post(`comments/`, fields);
      const { data } = await axios.get(`posts/${id}`);
      setComments(getComments(data.comments));
      setText("");
    } catch (err) {
      console.warn(err);
      alert("Bad create comment");
    }
  };

  const onDeleteComment = async (idComment) => {
    await axios.delete(`comments/${idComment}/`);
    const { data } = await axios.get(`posts/${id}`);
    setComments(getComments(data.comments));
  };

  const onSubmitChild = async (
    textChild,
    setTextChild,
    idComment,
    setIsAnswer,
    user,
  ) => {
    try {
      const textValue = `@${user} ${textChild}`;
      const fields = {
        text: textValue,
        post: id,
        parent: idComment,
      };
      console.log(fields);
      setIsAnswer(false);
      await axios.post(`comments/`, fields);
      const { data } = await axios.get(`posts/${id}`);
      setComments(getComments(data.comments));
      setTextChild("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate(-1)
  }

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Post
          id={dataPost._id}
          title={dataPost.title}
          images={dataPost.image}
          videos={dataPost.video}
          user={dataPost.author}
          isFullPost
        />
        <PostDetails
          username={dataPost.author}
          userId={dataPost.author_id}
          comments={comments}
          onSubmit={onSubmit}
          onSubmitChild={onSubmitChild}
          onDeleteComment={onDeleteComment}
          slug={id}
          post={dataPost}
          likes={likes}
          setLikes={setLikes}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      </div>
      <button onClick={handleClick} className={styles.backBtn}><FontAwesomeIcon icon={faChevronLeft} /></button>
    </div>
  );
};

export default FullPost;
