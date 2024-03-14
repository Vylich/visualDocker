import React from "react";
import styles from "./SearchingCard.module.scss";
import { Link } from "react-router-dom";

const Card = ({ onClickSearch, title, images }) => {
	return (
		<>
			{images && images[0] &&
				
					<Link
					to={`/posts/${title}`}
						key={images[0].id}
						onClick={() => onClickSearch(title)}
						className={styles.root}
					>
						<img src={`http://127.0.0.1:8000${images[0].image}`} width={50} />
						<div className={styles.wrapper}>
							<p>{title}</p>
						</div>
					</Link>
				}
		</>
	);
};

export default Card;
