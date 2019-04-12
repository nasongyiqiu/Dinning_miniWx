const OrderState = {
	create: 0,
	cancel: 1,
	paid: 2,
	washing: 3,
	done: 4,
	unfinished: 5,
	delay: 6
}

const CardType = {
	Price: 1,
	Rate:2
}


module.exports = {
	OrderState: OrderState,
	CardType: CardType
}