import React, { useEffect, useState } from 'react'
import styles from './SearchPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Columns } from '../Home/index'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom';
import axios from '../../../axios'
import { addSearch } from '../../../redux/slices/search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchPage = () => {
	const posts = useSelector(state => state.search.searchedItems)
	const {id} = useParams()
	const dispatch = useDispatch()
	const [isNavVisible, setIsNavVisible] = useState(true)



	useEffect(() => {
		if(!posts.length) {
			axios.get(`/search/?search=${id}`).then(res => {
				dispatch(addSearch(res.data.post_tag))
			})
		}
	}, [])

	const loading = false
	return (
		<div className={styles.root}>
			{posts && <Columns posts={posts} loading={false} />}
		</div>
	)
}

export default SearchPage
