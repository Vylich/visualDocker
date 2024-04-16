import React, { useState } from 'react'

import {CommentsBlock} from '@components'

import styles from './CommentsList.module.scss'

const CommentsList = ({ comments, onSubmitChild, onDeleteComment }) => {
	const [arr, setArr] = useState(null)
	const [showMoreCount, setShowMoreCount] = useState(5)
	const [showBtnMore, setShowBtnMore] = useState(false)

	const getChildrensRoot = (comments, rootEl) => {
		const arrChildComments = []
		const firstLvl = comments.filter(
			el => Number(el.parent) === Number(rootEl.id)
		)
		const result = arrChildComments.push(firstLvl)
		return result
	}

	const getChildren = (obj, childrenArr) => {
		if (obj.children && obj.children.length > 0) {
			for (let i = 0; i < obj.children.length; i++) {
				childrenArr.push(obj.children[i])
				getChildren(obj.children[i], childrenArr)
			}
		}
	}

	const extractChildren = obj => {
		const childrenArr = []
		getChildren(obj, childrenArr)

		return childrenArr
			.slice(0, showMoreCount)
			.map((item) => (
				<CommentsBlock
					key={item.id}
					idComment={item.id}
					avatarUrl={item.author_avatar}
					username={item.author}
					text={item.text}
					onDeleteComment={onDeleteComment}
					onSubmitChild={onSubmitChild}
					isChild={item.level === 1}
					isChildParent={item.level > 1}
					user={item.author}
					paddingFromBtn={item.children.length > 0}
				/>
			))
	}

	const handleToggleReplies = clickedComment => {
		if (arr && arr.id === clickedComment.id) {
			setArr(null)
			setShowMoreCount(5)
			setShowBtnMore(false)
			// Reset showMoreCount when hiding child comments
		} else {
			setArr(clickedComment)
			setShowMoreCount(5)
			setShowBtnMore(true) // Reset showMoreCount when showing child comments
		}
	}

	const handleShowMore = arr => {
		if (arr < Number(showMoreCount) + 5) {
			setShowMoreCount(0)
			setShowBtnMore(false)
			setArr(null)
		} else {
			setShowMoreCount(prevCount => prevCount + 5)
		}
	}

	return (
		<>
			{comments.map(com => (
				<div
					className={styles.wrapper}
					style={com.children.length > 0 ? { paddingBottom: '22px' } : {}}
					key={com.id}
				>
					{com && com.level === 0 && (
						<CommentsBlock
							idComment={com.id}
							avatarUrl={com.author_avatar}
							username={com.author}
							text={com.text ? com.text : null}
							onSubmitChild={onSubmitChild}
							onDeleteComment={onDeleteComment}
							isChild={com.level === 1}
							isChildParent={com.level > 1}
							user={com.author}
						/>
					)}

					{com.level === 0 && com.children.length > 0 && (
						<>
							{arr && arr.id === com.id && extractChildren(com)}
							<div className={styles.btnsViewMore}>
								<button
									className={styles.btnViewMore}
									onClick={() => handleToggleReplies(com)}
								>
									{arr && arr.id === com.id ? 'Скрыть ответы' : 'Ответы'}
								</button>
								{showBtnMore &&
									com.children.length > 5 &&
									arr &&
									arr.id === com.id && (
										<button
											className={styles.btnViewMore}
											onClick={() =>
												handleShowMore(extractChildren(com).length + 5)
											}
										>
											{Number(showMoreCount) > extractChildren(com).length
												? 'Скрыть'
												: 'Показать еще'}
										</button>
									)}
							</div>
						</>
					)}
				</div>
			))}
		</>
	)
}

export {CommentsList}
