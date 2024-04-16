import { useState } from 'react'

import styles from './AddComment.module.scss'

const AddComment = ({
	user,
	onSubmit,
	onSubmitChild,
	idComment,
	setIsAnswer,
}) => {
	const [text, setText] = useState('')
	const [textComment, setTextComment] = useState('')

	return (
		<>
			<div className={styles.add}>
				<div className={styles.form}>
					{onSubmitChild && (
						<>
							<input
								type='text'
								placeholder='Напишите комментарий'
								value={textComment}
								onChange={e => setTextComment(e.target.value)}
							/>
							<button
								disabled={!textComment}
								onClick={() => {
									onSubmitChild(
										textComment,
										setTextComment,
										idComment,
										setIsAnswer,
										user
									)
									setTextComment('')
								}}
							>
								Отправить
							</button>
						</>
					)}
					{onSubmit && (
						<>
							<input
								type='text'
								placeholder='Напишите комментарий'
								value={text}
								onChange={e => setText(e.target.value)}
							/>
							<button
								disabled={!text}
								onClick={() => {
									onSubmit(text, setText)
									setText('')
								}}
							>
								Отправить
							</button>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export { AddComment }
