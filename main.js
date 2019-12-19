const SPECDT = [
	{
		group: 'General',
		items: [
			{ name: 'Model', value: 'DC11' },
			{ name: 'Delivery time', value: '2-3 weeks' }
		]
	},
	{
		group: 'Engine',
		items: [{ name: 'bhp', value: '404' }]
	},
	{
		group: 'specials',
		text: 'convertible, leather seats'
	}
]

const contentContainer = document.querySelector('.content')
const mobileContainer = document.querySelector('.mobileContent')
const tab = document.querySelectorAll('h2')
const form = document.querySelector('form')
const quantity = form.querySelector('[name="quantity"]')
const priceBox = document.querySelector('.price')
const discountPriceBox = document.querySelector('.discountPrice')

let activeTab = 0

tab.forEach(addTabClick)

form.addEventListener('change', getPrice)
form.addEventListener('propertychange', getPrice)
form.addEventListener('input', getPrice)

renderContent()

function addTabClick(tab) {
	tab.addEventListener('click', () => {
		changeTab()
	})
}

function changeTab() {
	event.preventDefault()
	activeTab = event.target.getAttribute('tabindex')
	localStorage.setItem('activeTabIndex', activeTab)
	const activeClass = document.querySelector('.active')
	activeClass.classList.remove('active')
	renderContent()
}

function renderContent() {
	contentContainer.innerHTML = ''
	mobileContainer.innerHTML = ''
	checkLocalStorage()
	const visibleContent = SPECDT[activeTab]
	const addActiveClass = document.querySelector(
		'[tabindex="' + activeTab + '"]'
	)
	addActiveClass.classList.add('active')
	mobileContainer.style.order = (parseInt(activeTab) + 1) * 2

	activeTab == 2
		? renderText(visibleContent.text)
		: visibleContent.items.forEach(renderSingleItem)
}

function renderSingleItem(items) {
	const el = document.createElement('dl')
	const { name, value } = items

	el.innerHTML = `
              <dt>${name}</dt>
              <dd>${value}</dd>
            `
	contentContainer.insertAdjacentElement('beforeend', el)
	mobileContainer.insertAdjacentElement('beforeend', el.cloneNode(true))
}

function renderText(text) {
	const el = document.createElement('span')

	el.textContent = text

	contentContainer.insertAdjacentElement('beforeend', el)
	mobileContainer.insertAdjacentElement('beforeend', el.cloneNode(true))
}

function checkLocalStorage() {
	const storageTab = localStorage.getItem('activeTabIndex')
	storageTab !== null && (activeTab = storageTab)
}

function getPrice() {
	const price = 19.95
	const quantityValue = quantity.value

	const num = price * quantityValue
	const totalPrice = num.toFixed(2)

	let discountFactor = 0

	if (quantityValue >= 3 && quantityValue < 5) {
		discountFactor = 20
	} else if (quantityValue >= 5) {
		discountFactor = 30
	}

	const singleDiscountPrice = totalPrice - (totalPrice / 100) * 10
	const discoutCalculation =
		singleDiscountPrice - (singleDiscountPrice / 100) * discountFactor
	const discountedTotalPrice = discoutCalculation.toFixed(2)

	priceBox.textContent = totalPrice + ' €'
	discountPriceBox.textContent = discountedTotalPrice + ' €'
}
