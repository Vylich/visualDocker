import React, { useState } from 'react'
import styles from './Search.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Card from '../SearchigCard'

const Search = ({ items, onDelete, onClickSearch, isNavVisible, searchedItems }) => {


	return (
		<div className={styles.root}>
			{!isNavVisible && <div className={styles.input}>
				<FontAwesomeIcon
					className={styles.iconSearch}
					icon={faMagnifyingGlass}
				/>
				<form>
					<input
						type='text'
						name='search'
						autoComplete='off'
						placeholder='Найти'
					/>
				</form>
			</div>}
			<div className={styles.wrapper}>
				<div className={styles.recent}>
					<h3>Недавние поисковые запросы</h3>
					<div className={styles.searches}>
						{items &&
							items.map((obj, i) => (
								<div key={i} className={styles.searchesItem}>
									<span onClick={() => onClickSearch(obj)}>{obj}</span>
									<button onClick={() => onDelete({ obj })}>
										<FontAwesomeIcon icon={faXmark} />
									</button>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className={styles.wrapper}>
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
			</div>
		</div>
	)
}

export default Search
