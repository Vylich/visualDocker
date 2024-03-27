import React from 'react'
import styles from './Subs.module.scss'
import axios from '../../../axios'


const Subs = () => {


	const handleClickPay = async (type, price) => {
		const config = {
			price: price,
			type: type,
		}
		const {data} = await axios.post('/payment', config);

    window.location.href = data.url;
  };

	// const handleClickPremium = async () => {
  //   const payment = await kassa.createPayment({
  //     amount: {
  //       value: '300.00',
  //       currency: 'RUB'
  //     },
  //     description: 'Оплата заказа №123',
  //     capture: true
  //   }, {
	// 		endpoint: 'https://your-server.com/payment_notification/'
	// 	});

  //   window.location.href = payment.confirmation.confirmationUrl;
  // };


	return (
		<div className={styles.root}>
			<h2>Выберите подписку</h2>
			<div className={styles.wrapper}>
				<div className={styles.block}>
					<h3 className={styles.title}>Стандарт</h3>
					<div className={styles.subWrapper}>
					<p className={styles.descr}>При оформлении данной подписки вам больше не будет показываться реклама.</p>
					<button onClick={() => handleClickPay('standart', '300')} className={styles.btn}>300 ₽</button>
					</div>
				</div>
				<div className={styles.block}>
					<h3 className={styles.title}>Премиум</h3>
					<div className={styles.subWrapper}>
					<p className={styles.descr}>При оформлении данной подписки вам больше не будет показываться реклама, а так же ваши посты будут активнее продвигаться в рекомендациях других пользователей Visual.</p>
					<button onClick={() => handleClickPay('premium', '800')} className={styles.btn}>800 ₽</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Subs